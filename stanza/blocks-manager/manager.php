<?php
/**
 * Stanza Manager - Plugin Settings & Logic
 * 
 * This file handles the WordPress backend integration for the Blocks Manager dashboard.
 * It scans the theme for block.json files and manages the configuration sync.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Main Blocks Manager Class
 */
class Stanza_Manager {

	/**
	 * Instance of this class.
	 * @var Stanza_Manager
	 */
	private static $instance = null;

	/**
	 * Get instance of this class.
	 * @return Stanza_Manager
	 */
	public static function get_instance() {
		if ( null === self::$instance ) {
			self::$instance = new self();
		}
		return self::$instance;
	}

	/**
	 * 
	 * @return
	 */
	public static function get_intermediate_image_sizes() {
		$intermediate_image_sizes = get_intermediate_image_sizes();
		return array_map(function($size) {
		    return $size === 'thumbnail' ? 'full' : $size;
		}, $intermediate_image_sizes);

	}

	/**
	 * 
	 * @return
	 */
	public static function get_all_media() {
		$attachments = get_posts([
		    'post_type'      => 'attachment',
		    'post_mime_type' => 'image',
		    'posts_per_page' => -1,
		    'post_status'    => 'inherit',
		]);

		$media = [['mediaId' => null, 'mediaUrl' => null]];

		foreach ($attachments as $attachment) {
		    $media[] = [
		        'mediaId'  => $attachment->ID,
		        'mediaUrl' => wp_get_attachment_url($attachment->ID),
		    ];
		}

		return $media;
	}

	private $theme_json;  
	private $attributes_renfer;  

	/**
	 * Constructor
	 */
	private function __construct() {
		add_action( 'admin_menu', array( $this, 'add_admin_menu' ) );
		add_action( 'admin_init', array( $this, 'handle_form_submission' ) );

		$this->theme_json = json_decode( file_get_contents( get_template_directory() . '/theme.json' ), true );
		$this->attributes_render = array(
			'align' => [
				'',
				'full',
				'wide'
			],
			"level" => [
				1,2,3,4
			],
			'backgroundColor' => [
				[
					"name" => "Don't overwrite",
					"slug" => null
				],
				...$this->theme_json['settings']['color']['palette']
			],
			"content" => false,
			"subtitlePosition" => [
				'top', 'bottom', null
			],
			"tag" => [
				'div', 'header', null
			],
			'maxParagraphs' => [
				1,2,3,4,5
			],
			'mediaAlign' => [ "center", "right", "left"],
			'mediaAlt' => false,
			'mediaAspectRatio' => [
				[ 'label' => '', 'value' => null ],
				[ 'label' => '16:9', 'value' => '16/9' ],
	            [ 'label' => '1:1', 'value' => '1/1' ],
	            [ 'label' => '2:3', 'value' => '2/3' ],
	            [ 'label' => '3:4', 'value' => '3/4' ]
			],
			'mediaImageSizes' => false,
			'mediaUrl' => false,
			'mediaOriginalAspectRatio' => false,
			'mediaSvgHTML' => false,
			'mediaOrientation' => false,
			'mediaOriginalAspectRatioFactor' => false,
			'mediaType' => [ null, 'image', 'video' ],
			'mediaThumbnail' => false,
			'mediaBackgroundColor' => [
				[
					"name" => "",
					"slug" => null
				],
				...$this->theme_json['settings']['color']['palette']
			],
			'mediaImageSize' => $this->get_intermediate_image_sizes(),
			'mediaId' => $this->get_all_media(),
			'mediaPosition' => [
				'top', 'right', 'bottom', 'left'
			],
			'parentId' => false,
			'blockPropsOverwrite' => false,
			'mediaTextOptions' => false,
			'mediaOptions' => false
		);

		//var_dump($this->attributes_render);
		//die();
	}

	/**
	 * Add Admin Menu Page
	 */
	public function add_admin_menu() {
		add_menu_page(
			__( 'Stanza Blocks', 'stanza' ),
			__( 'Stanza Blocks', 'stanza' ),
			'manage_options',
			'stanza-manager',
			array( $this, 'render_admin_page' ),
			'dashicons-layout',
			100
		);
	}

	/**
	 * Handle Form Submission
	 */
	public function handle_form_submission() {
		if ( ! isset( $_POST['stanza_save_settings'] ) || ! wp_verify_nonce( $_POST['stanza_nonce'], 'stanza_save_action' ) ) {
			return;
		}

		if ( ! current_user_can( 'manage_options' ) ) {
			wp_die( __( 'Unauthorized access.', 'stanza' ) );
		}

		$enabled_blocks = isset( $_POST['enabled_blocks'] ) ? (array) $_POST['enabled_blocks'] : array();

		// Build the config object
		$settings_blocks = array();
		foreach ( $enabled_blocks as $block_name ) {
			$settings_blocks[ sanitize_text_field( $block_name ) ] = true;
		}

		$config = array(
			'settings' => array(
				'blocks' => array(
					$settings_blocks
				)
			),
			'blocks' => array()
		);

		$blocks = $this->scan_blocks();

		// Ensure blocks entry exists for each enabled block
		foreach ( $enabled_blocks as $block_name ) {
			$config['blocks'][ sanitize_text_field( $block_name ) ] = new stdClass();

			// Attributes
			$POST_attributes = $_POST[$block_name]['attributes'];
			$parsed_attributes = [];

			if ( $POST_attributes ) {
				// Parse submitted attributes 
				$parsed_attributes = $this->parse_submitted_attributes( $POST_attributes, $block_name, $blocks );				
				
				if ( count( $parsed_attributes ) ) {
					$config['blocks'][ sanitize_text_field( $block_name ) ]->attributes = $parsed_attributes;
				}
			}

			// Variations
			$parsed_attributes = [];
			$POST_variations = array_values( $_POST[$block_name]['variations'] ?? [] );
			
			if ( $POST_variations ) {
				if ( count( $POST_variations ) ) {
					foreach ( $POST_variations as $key => $POST_variation ) {
						// Parse submitted attributes 
						if ( isset( $POST_variations[$key]['attributes'] ) ) {
							$POST_variations[$key]['attributes'] = $this->parse_submitted_attributes( $POST_variation['attributes'], $block_name, $blocks, $key );
						}
					}
				}
				
				$config['blocks'][ sanitize_text_field( $block_name ) ]->variations = $POST_variations;
			}

		}

		$theme_dir = get_stylesheet_directory() . '/theme-blocks';
		if ( ! is_dir( $theme_dir ) ) {
			wp_mkdir_p( $theme_dir );
		}

		$file_path = $theme_dir . '/stanza.json';
		$result = file_put_contents( $file_path, json_encode( wp_unslash( $config ), JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE ) );

		if ( false !== $result ) {
			add_settings_error( 'stanza_messages', 'stanza_message', __( 'Settings saved and synced to theme.', 'stanza' ), 'updated' );
		} else {
			add_settings_error( 'stanza_messages', 'stanza_message', __( 'Failed to save settings. Check folder permissions.', 'stanza' ), 'error' );
		}
	}

	/**
	 * Parse submitted attributes 
	 */
	public function parse_submitted_attributes( $POST_attributes, $block_name, $blocks, $variation_index = false ) {
		// Parse attributes for defaults overwrites
		$parsed_attributes = [];
		if ( $POST_attributes ) {			
			foreach ( $POST_attributes as $POST_attr_name => $POST_attribute ) {
				// Get current block (block.json)
				$block = current( array_filter( $blocks, fn($item) => $item['name'] === $block_name ) );
				// Isset default post attribute (always true for variations)
				$POST_attr_default_isset = $variation_index === false ? isset( $POST_attribute['default'] ) : true;
				// Post default attribute
				$POST_attr_default =
					$variation_index === false ?
						( isset( $POST_attribute['default'] ) ? $POST_attribute['default'] : null ) :
						$POST_attribute;
		
				// Convert number type attributes to int
				$POST_attr_default = isset( $block['attributes'][$POST_attr_name]['type'] ) && 'number' == $block['attributes'][$POST_attr_name]['type'] && $POST_attr_default !== '' ? (int) $POST_attr_default : $POST_attr_default;
				// Convert bool type attributes
				$POST_attr_default = isset( $block['attributes'][$POST_attr_name]['type'] ) && 'boolean' == $block['attributes'][$POST_attr_name]['type'] ? ( 'on' == $POST_attr_default ? true : null ) : $POST_attr_default;

				if (
					$POST_attr_default_isset && // Default POST value is set AND
					( 
						isset( $block['attributes'][$POST_attr_name]['default'] ) || // Default block.json value is set (block.json attribute) OR
						( ! isset( $block['attributes'][$POST_attr_name]['default'] ) && $POST_attr_default ) // Default block.json value is not set AND default POST value is not null
					) &&
					(
						( $POST_attr_default && ( $block['attributes'][$POST_attr_name]['default'] ?? false ) !== $POST_attr_default ) ||
						( ! $POST_attr_default && ( $block['attributes'][$POST_attr_name]['default'] ?? false ) !== $POST_attr_default )
					)
				) {
					if ( 'mediaPosSizeRatioAlign' === $POST_attr_name || 'template' === $POST_attr_name ) {
						if ( $POST_attr_default ) {
							if ( $variation_index === false ) {
								$parsed_attributes[$POST_attr_name]['default'] = json_decode( stripslashes(trim( $POST_attr_default, '"')), true);
							} else {
								$parsed_attributes[$POST_attr_name] = json_decode( stripslashes(trim( $POST_attr_default, '"')), true);							
							}							
						}
					} else if ( is_array( $POST_attribute ) ) {
						foreach ( $POST_attribute as $child_attribute_name => $child_attribute ) {
							if ( is_array( $child_attribute ) ) {
								$parsed_options = [];

								foreach ( $child_attribute as $option_name => $option ) {
									$json_value = json_decode( str_replace("\\", "", $option));

									if ( is_object( $json_value) ) {
										$parsed_options[] = (object) $json_value;
									} else {
										$parsed_options[] = $option;											
									}
								}
								$parsed_attributes[$POST_attr_name][$child_attribute_name] = $parsed_options;
							} else {
								$parsed_attributes[$POST_attr_name][$child_attribute_name] = $child_attribute;
							}
						}
					} else {
						$parsed_attributes[$POST_attr_name] = $POST_attr_default;
					}
				}
			}
		}

		return $parsed_attributes;
	}

	/**
	 * Render the Admin Page
	 */
	public function render_admin_page() {
		$blocks = $this->scan_blocks();
		$theme_dir = get_stylesheet_directory() . '/theme-blocks';
		$file_path = $theme_dir . '/stanza.json';
		
		$current_config = array();
		if ( file_exists( $file_path ) ) {
			$current_config = json_decode( file_get_contents( $file_path ), true );
		}

		$enabled_list = array();
		if ( isset( $current_config['settings']['blocks'] ) ) {
			$enabled_list = array_keys( $current_config['settings']['blocks'][0] );
		}
		?>

		<div class="wrap">
			<h1><?php _e( 'Stanza Manager', 'stanza' ); ?></h1>
			<p class="description"><?php _e( 'Manage and sync custom Gutenberg blocks from your theme to the summary-text parent block.', 'stanza' ); ?></p>

			<?php settings_errors( 'stanza_messages' ); ?>

			<div class="metabox-holder">
				<div class="postbox">
					<div class="inside" style="padding:0;margin:0;">
						<form method="post" action="">
							<?php wp_nonce_field( 'stanza_save_action', 'stanza_nonce' ); ?>
							<div class="postbox-header" style="padding-left:25px;padding-right:25px;">
								<input id="cb-select-all-1" type="checkbox"> <h2 class="hndle ui-sortable-handle"><?php _e( 'Blocks Library', 'stanza' ); ?></h2>
							</div>

							<div class="stanza-manager">
								<div class="bm-table">
									<div class="bm-table-body">
										<?php
										if ( empty( $blocks ) ) :
											?>
											<div class="bm-block">
												<div class="bm-block-body">
													<?php _e( 'No blocks found in src/blocks.', 'stanza' ); ?>
												</div>											
											</div>
											<?php
										else :
											foreach ( $blocks as $block ) :
												if ( true ) {
													?>
											<div class="bm-block <?php echo in_array( $block['name'], $enabled_list ) ? 'is-enabled' : 'is-disabled'; ?>">
												<div class="bm-block-head block-accordion-head">
													<div class="bm-col">
														<div style="display:flex;align-items:center;margin-top:-7px;">
															<input type="checkbox" name="enabled_blocks[]" value="<?php echo esc_attr( $block['name'] ); ?>" <?php checked( in_array( $block['name'], $enabled_list ) ); ?>>
															<div class="dashicons-before dashicons-<?php echo $block['icon']; ?>"></div>
															<h2 style="padding-top:0;"><?php echo esc_html( $block['title'] ); ?></h2>															
														</div>
														<p class="description"><?php echo esc_html( $block['description'] ); ?></p>
													</div>
													<div class="bm-col"><code><?php echo esc_html( $block['name'] ); ?></code></div>
													<div class="bm-col"><?php echo $current_config['blocks'][$block['name']]['variations'] ?? false ? count( $current_config['blocks'][$block['name']]['variations'] ) . ' variation(s)' : ''; ?></div>
													<div class="bm-col">v<?php echo esc_html( $block['version'] ); ?></div>
												</div>

												<div class="bm-block-body block-accordion-content" style="max-height:0;overflow: hidden;">
													<?php $this->render_attributes( $block['name'], $block['attributes'] ?? [], $current_config ); ?>												
													<?php $this->render_variations( $block['name'], $block['attributes'] ?? [], $current_config ); ?>	

													<div class="submit">
														<input type="submit" name="stanza_save_settings" id="submit" class="button button-primary" value="<?php _e( 'Save & Sync to Theme', 'stanza' ); ?>">										
														
													</div>		
												</div>										
											</div>
													<?php
												}											
											endforeach;
										endif;
										?>
									</div>

									<div class="bm-table-foot">
										<div class="bm-col"></div>
										
										<div class="bm-col"></div>
									</div>									
								</div>
							</div>
						</form>
					</div>
				</div>

				<?php if ( false ) : ?>
				<div class="postbox">
					<div class="postbox-header">
						<h2 class="hndle"><?php _e( 'Current Configuration (stanza.json)', 'stanza' ); ?></h2>
					</div>
					<div class="inside">
						<p><strong><?php _e( 'File Path:', 'stanza' ); ?></strong> <code><?php echo esc_html( str_replace( ABSPATH, '', $file_path ) ); ?></code></p>
						<pre><?php 
							if ( file_exists( $file_path ) ) {
								echo esc_html( file_get_contents( $file_path ) );
							} else {
								_e( 'File not generated yet.', 'stanza' );
							}
						?></pre>
					</div>
				</div>
				<?php endif; ?>
			</div>
		</div>
		<script src="<?php echo STANZA_URL . '/src/blocks/accordion/view.js'; ?>"></script>
		<script>
			jQuery(document).ready(function($) {
				$('#cb-select-all-1').on('change', function() {
					$('input[name="enabled_blocks[]"]').prop('checked', $(this).prop('checked'));
				});
			});

			document
			  .querySelectorAll('.block-accordion-head input[type="checkbox"], .block-accordion-head code, .block-accordion-head .description')
			  .forEach(function (checkbox) {
			    checkbox.addEventListener('click', function (e) {
			      console.log(1);
			      e.stopPropagation();
			    });
			  });

			document.addEventListener('DOMContentLoaded', () => {
				createAccordion('.block-accordion-head', '.block-accordion-content');
				//createAccordion('.variation-accordion-head', '.variation-accordion-content');
			});
		</script>		
		<?php
	}

	/**
	 * Scan theme for block.json files
	 * 
	 * @return array List of blocks found
	 */
	private function render_variations( $blockname, $attributes, $current_config ) {
		$variations = $current_config['blocks'][$blockname]['variations'] ?? [];
		?>
			<div class="bm-table">
				<div class="bm-table-head">
					<div class="bm-col" style="display:flex;">
						<h3
						style="
							font-size: 14px;
						    padding: 8px 12px;
						    margin: 0;
						    line-height: 1.4;"
						>Variations</h3>
						<input
							type="text"
							pattern="^[a-z0-9]+(?:-[a-z0-9]+)*$"
							data-base-name="<?php echo $blockname; ?>[variations]"
							placeholder="slug"
							oninput="
							    const base = this.dataset.baseName;
							    const slug = this.value;
							    this.name = base + '[<?php echo count( $variations ) ?>][name]';
							  "
							style="vertical-align: baseline; padding: 0 8px;"
							/>
						<input
							type="submit"
							name="stanza_save_settings"
							id="submit"
							class="button button-primary"
							value="<?php _e( 'Add', 'stanza' );?>"
						/>
					</div>
				</div>
			<?php	
			if ( $variations ) {
				?>
				<div class="bm-table-body">
				<?php
				foreach	( $variations as $key => $variation ) {
					?>
					<div class="bm-variation">
						<div class="bm-col"></div>
						<div class="bm-col">
							<div class="bm-block-head variation-accordion-head">
								<div class="bm-col" style="transform: translateX(-8px);">
									<!-- <p class="description">Title</p> -->
									<p style="margin:0;">
										<input
											type="text"
											name="<?php echo $blockname; ?>[variations][<?php echo $key; ?>][title]"
											value="<?php echo $variation['title'] ?? ucfirst( $variation['name'] ); ?>"
											oninput="
												if (this.value.length) {
												  this.value = this.value[0].toUpperCase() + this.value.slice(1);
												}"
											class="bm-variation-title-input"
										/><span class="dashicons-before dashicons-edit"></span>										
									</p>
									<p class="description">
										<textarea
											rows="1"
											name="<?php echo $blockname; ?>[variations][<?php echo $key; ?>][description]"
											class="bm-variation-description-input"
											placeholder="Description"
										><?php echo $variation['description'] ?? ''; ?></textarea><span class="dashicons-before dashicons-edit"></span>	
									</p>
								</div>
									
								<div class="bm-col" style="display:flex;align-items:flex-start;">
									<div class="bm-variation-code"><?php echo $blockname; ?>-</div>
									<input
										type="text"
										pattern="^[a-z0-9]+(?:-[a-z0-9]+)*$"
										name="<?php echo $blockname; ?>[variations][<?php echo $key; ?>][name]"
										class="bm-variation-code-input"										
										value="<?php echo $variation['name']; ?>"
									/><span class="dashicons-before dashicons-edit"></span>	
								</div>

								<div class="bm-col">						
									<select
										name="<?php echo $blockname; ?>[variations][<?php echo $key; ?>][scope][]"
										style="width:100%;"
										>
										<option>inserter</option>
									</select>
								</div>

								<div class="bm-col">							
									<select
										name="<?php echo $blockname; ?>[variations][<?php echo $key; ?>][isActive][]"
										style="width:100%;"
										>
										<option>className</option>
									</select>
								</div>
							</div>
							<div class="bm-block-body variation-accordion-content"><?php $this->render_attributes( $blockname, $attributes ?? [], $current_config, $key ); ?>	</div>
						</div>						
					</div>
					<?php
				}
				?>
				</div>
				<?php
				}
				?>
			</div>
			<?php	
	}

	/**
	 * Scan theme for block.json files
	 * 
	 * @return array List of blocks found
	 */
	private function render_attributes( $blockname, $attributes, $current_config, $variation_index = false ) {		
		?>			
		<table class="wp-list-table widefat fixed striped table-view-list">
			<thead>			
				<tr>					
					<th><strong>Attribute</strong></th>
					<th>Default (block.json)</th>
					<th>Overwrite Default</th>
					<th>Available options for user</th>
					<th></th>
				</tr>
			</thead>

			<tbody>
			<?php
			//echo '>' . $variation_index . '<';
			foreach ( $attributes as $attr_name => $attribute ) {
				$attr_current_config_default = $variation_index === false ?
					$current_config['blocks'][$blockname]['attributes'][$attr_name]['default'] ?? ( $attribute['default'] ?? null ) :
					$current_config['blocks'][$blockname]['variations'][$variation_index]['attributes'][$attr_name] ?? null;

				$current_config_options = $current_config['blocks'][$blockname]['attributes'][$attr_name]['options'] ?? [];
				
				$name = $variation_index === false ?
					$blockname . '[attributes][' . $attr_name . '][default]' :
					$blockname . '[variations][' . $variation_index . '][attributes][' . $attr_name . ']';

				$key_pair = [];
				$color = false;
				switch ( $attr_name ) {
					case 'backgroundColor':
						$key_pair = ['name', 'slug'];
						break;

					case 'mediaBackgroundColor':
						$key_pair = ['name', 'slug'];
						break;

					case 'mediaId':
						$key_pair = ['mediaId', 'mediaId'];
						break;
					
					default:
						$key_pair = ['label', 'value'];
						break;
				}

				?>
				<tr class="<?php echo $this->attributes_render[$attr_name] ?? true !== false ? '' : 'is-restricted' ?>">							
					<td><strong><?php echo $attr_name ?></strong></td>

					<!-- Default column -->
					<td>
						<?php
						// Default value
						if ( isset( $attribute['default'] ) ) {
							if ( 'boolean' == $attribute['type'] ) {
								echo $attribute['default'] ? 'true' : 'false';
							} elseif ( 'string' == $attribute['type'] || 'number' == $attribute['type'] ) {
								echo '<p class="description">' . $attribute['default'] . '</p>';
							}							
						}
						?>																
					</td>
					<!-- .Default column -->

					<!-- Overwrite Default column -->
					<td style="position:relative">
					<?php
					// If has predefined options for default value &&
					// If is not restricted
					if ( in_array( $attr_name, array_keys( $this->attributes_render ) ) && $this->attributes_render[$attr_name] !== false ) {
						?>						
						<select name="<?php echo $name; ?>">
						<?php
						foreach ( $this->attributes_render[$attr_name] as $option ) {
							if ( is_array( $option ) ) {
								$color = isset( $option['color'] ) ? $option['color'] : false;
								$style = $color ? 'data-color="' . $option[$key_pair[1]] . '" style="background-color:' . $color . ';"' : '';
								?>
								<option value="<?php echo $option[$key_pair[1]]; ?>" <?php echo selected( $attr_current_config_default, $option[$key_pair[1]] ); ?> <?php echo $style; ?>><?php echo $option[$key_pair[0]] === '' ? "Don't overwrite" : $option[$key_pair[0]]; ?></option>
								<?php
							} else {
								?><option value="<?php echo $option; ?>" <?php echo selected( $attr_current_config_default, $option ); ?>><?php echo $option === '' ? '(Empty string)' : $option; ?><?php ?></option><?php
							}
						}
						?>
						</select>
						<?php
						if ( 'mediaId' == $attr_name && $attr_current_config_default ) {
							?><br><br><img src="<?php echo $option['mediaUrl']; ?>" style="width:100px;"><?php								
						}
						?>
						<br><br><code>render preset</code>
						<?php
					} else if ( $this->attributes_render[$attr_name] ?? true !== false ) { // If is not restricted
						// If attribute's default is set 
						//if ( $attribute['default'] ?? false ) {
							$name = $variation_index === false ?
							$blockname . '[attributes][' . $attr_name . '][default]' :
							$blockname . '[variations][' . $variation_index . '][attributes][' . $attr_name . ']';
							$value =
								$variation_index === false ||
								! isset( $current_config['blocks'][$blockname]['variations'][$variation_index]['attributes'][$attr_name] ) ?
									$current_config['blocks'][$blockname]['attributes'][$attr_name]['default'] ?? ( $attribute['default'] ?? null ) :
									$current_config['blocks'][$blockname]['variations'][$variation_index]['attributes'][$attr_name] ?? null;

							if ( 'boolean' == $attribute['type'] ) {
								?>
								<input type="checkbox" <?php checked( $attr_current_config_default, true ) ?> name="<?php echo $name; ?>">
								<?php
							} else if ( 'string' == $attribute['type'] || 'number' == $attribute['type'] ) {
								$type = 'number' == $attribute['type'] ? 'number' : 'text';
								//$attrs = 'number' == $attribute['type'] && $value ? 'min="0"' : '';
								$attrs = '';
								?>
								<input type="<?php echo $type; ?>" name="<?php echo $name; ?>" value="<?php echo $value; ?>" <?php echo $attrs; ?>>
								<?php
							} else if ( 'mediaPosSizeRatioAlign' == $attr_name || 'template' == $attr_name ) {

								if ( false ) {
									?><pre><?php var_dump( $current_config['blocks'][$blockname]['variations'][$variation_index]['attributes'][$attr_name] ); ?></pre><?php
									?><pre><?php var_dump( $value ); ?></pre><?php
								}
								?>
								<textarea class="bm-textarea-focusable" name="<?php echo $name; ?>"><?php echo $value ? json_encode($value, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES) : null; ?></textarea>
								<div></div>
								<?php
							}
						//}
					} else { // If is restricted
						?><code>restricted</code><?php
					}
					?>						
					</td>
					<!-- .Overwrite Default column -->

					<!-- Available options for user column (NOT FOR VARIATIONS) -->
					<?php
					if ( in_array( $attr_name, array_keys( $this->attributes_render ) ) && $variation_index === false && $this->attributes_render[$attr_name] !== false ) {
						?>
						<td>
							<select name="<?php echo $blockname . '[attributes][' . $attr_name . '][options][]'; ?>" style="width:100%;" multiple>
								<?php
								foreach ( $this->attributes_render[$attr_name] as $option ) {

									if ( is_array( $option ) ) {
										$color = isset( $option['color'] ) ? $option['color'] : false;
										$style = $color ? 'data-color="' . $option[$key_pair[1]] . '" style="background-color:' . $color . ';"' : '';
										$value = $option[$key_pair[1]];
										$selected = selected( in_array( $option[$key_pair[1]], $current_config_options ),  true );

										switch ( $attr_name ) {
											case 'mediaAspectRatio':
												$value = json_encode([
												    "label" => $option[$key_pair[0]],
												    "value" => $option[$key_pair[1]]
												], JSON_UNESCAPED_SLASHES );
												
												$selected = selected( in_array( [
												    "label" => $option[$key_pair[0]],
												    "value" => $option[$key_pair[1]]
												], $current_config['blocks'][$blockname]['attributes'][$attr_name]['options'] ), true );												
												break;
										}

										if ( $option[$key_pair[1]] ) {
											?><option value='<?php echo $value; ?>' <?php echo $selected; ?> <?php echo $style; ?>><?php echo $option[$key_pair[0]]; ?></option><?php
										}
									} else {
										?><option value="<?php echo $option; ?>" <?php echo selected( in_array( $option, $current_config_options ),  true ); ?>><?php echo $option; ?></option><?php
									}
								}
								?>					
							</select>
						</td>

						<?php
					} else {
						?>
						<td>&nbsp;</td>
						<?php
					}
					?>
					<!-- .Available options for user column -->

					<td>&nbsp;</td>				
				</tr>
				<?php
			} 	

			if ( $variation_index !== false ) {
				?>
				<tr>
					<td>className</td>
					<td><?php echo 'is-style-' . $current_config['blocks'][$blockname]['variations'][$variation_index]['name']; ?></td>
					<td><input type="hidden" name="<?php echo $blockname . '[variations][' . $variation_index . '][attributes][className]'; ?>" value="<?php echo 'is-style-' . $current_config['blocks'][$blockname]['variations'][$variation_index]['name']; ?>"></td>
					<td>&nbsp;</td>
					<td>&nbsp;</td>
				</tr>
				<?php
			}
			?>	
			</tbody>			
		</table>

		<script>
			document.addEventListener('DOMContentLoaded', () => {
			  const elements = document.querySelectorAll('.bm-textarea-focusable');

			  elements.forEach(el => {
			    el.addEventListener('click', () => {
			      // If already focused → do nothing
			      if (el.classList.contains('is-focused')) return;

			      // Remove from all
			      elements.forEach(item => item.classList.remove('is-focused'));

			      // Add to current
			      el.classList.add('is-focused');
			    });
			  });

			  // Click anywhere in document
			  document.addEventListener('click', (e) => {
			    // If click is NOT inside any target element → remove focus
			    if (!e.target.closest('.bm-textarea-focusable')) {
			      elements.forEach(el => el.classList.remove('is-focused'));
			    }
			  });
			});
		</script>
		<?php
	}

	/**
	 * Scan theme for block.json files
	 * 
	 * @return array List of blocks found
	 */
	private function scan_blocks() {
		$blocks = array();
		$blocks_dir = STANZA_PATH . '/src/blocks';

		if ( ! is_dir( $blocks_dir ) ) {
			return $blocks;
		}

		try {
			$it = new RecursiveDirectoryIterator( $blocks_dir );
			foreach ( new RecursiveIteratorIterator( $it ) as $file ) {
				if ( $file->getFilename() === 'block.json' ) {
					$content = file_get_contents( $file->getPathname() );
					if ( $content ) {
						$data = json_decode( $content, true );
						if ( $data && isset( $data['name'] ) ) {
							$blocks[] = array(
								'name'        => $data['name'],
								'title'       => isset( $data['title'] ) ? $data['title'] : $data['name'],
								'description' => isset( $data['description'] ) ? $data['description'] : '',
								'category'    => isset( $data['category'] ) ? $data['category'] : 'common',
								'icon'        => isset( $data['icon'] ) ? $data['icon'] : 'layout',
								'version'     => isset( $data['version'] ) ? $data['version'] : '1.0.0',
								'attributes'  => isset( $data['attributes'] ) ? $data['attributes'] : []
							);
						}
					}
				}
			}
		} catch ( Exception $e ) {
			// Silently fail or log error
		}

		// Parse blocks
		$order = [
			"stanza/paragraph",
			"stanza/header",
			"stanza/summary-text",
			"stanza/hero-text",
			"stanza/media"
		];

		$orderIndex = array_flip($order);

		// Add molecule flag
		foreach ($blocks as &$item) {
		    if (isset($orderIndex[$item['name']])) {
		        $item['molecule'] = true;
		    }
		}
		unset($item);

		// Sort
		usort($blocks, function ($a, $b) use ($orderIndex) {
		    $posA = $orderIndex[$a['name']] ?? PHP_INT_MAX;
		    $posB = $orderIndex[$b['name']] ?? PHP_INT_MAX;
		    return $posA <=> $posB;
		});

		return $blocks;
	}
}

// Initialize the manager
Stanza_Manager::get_instance();
