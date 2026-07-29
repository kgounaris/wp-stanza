<?php
/**
 * Plugin Name: Featured Video Metabox (Media Library)
 * Description: Adds a Featured Video media picker metabox to selected custom post types.
 * Version: 1.0.1
 */

defined('ABSPATH') || exit;

final class Featured_Video_Metabox_Media {
	const META_KEY = '_stanza_featured_video_id';

	private static function allowed_post_types(): array {
		return [
			'page'			
		];
	}

	public static function init(): void {
		add_action('init', [__CLASS__, 'register_meta']);
		
		add_action('add_meta_boxes', [__CLASS__, 'register_metabox']);
		add_action('admin_enqueue_scripts', [__CLASS__, 'enqueue_admin_assets']);
		add_action('save_post', [__CLASS__, 'save_metabox']);
	}

	public static function register_metabox(): void {
		foreach (self::allowed_post_types() as $pt) {
			add_meta_box(
				'featured-video-metabox',
				__('Featured Video', 'stanza'),
				[__CLASS__, 'render_metabox'],
				$pt,
				'side',
				'high'
			);
		}
	}

	public static function enqueue_admin_assets(string $hook): void {
		if (!in_array($hook, ['post.php', 'post-new.php'], true)) return;

		$screen = function_exists('get_current_screen') ? get_current_screen() : null;
		if (!$screen || empty($screen->post_type)) return;

		if (!in_array($screen->post_type, self::allowed_post_types(), true)) return;

		// Ensure wp.media exists
		wp_enqueue_media();

		// Our JS (put file in same plugin folder: assets/featured-video-metabox.js)
		$plugin_url = plugin_dir_url(__FILE__);
		wp_enqueue_script(
			'featured-video-metabox',
			$plugin_url . '/index.js',
			['jquery'],
			'1.0.1',
			true
		);

		wp_localize_script('featured-video-metabox', 'FeaturedVideoMetabox', [
			'metaKey'     => self::META_KEY,
			'selectTitle' => __('Select Featured Video', 'stanza'),
			'selectBtn'   => __('Use this video', 'stanza'),
			'emptyText'   => __('No video selected.', 'stanza'),
			'noPreview'   => __('No preview available.', 'stanza'),
		]);
	}

	public static function render_metabox(\WP_Post $post): void {
		wp_nonce_field('featured_video_metabox_save', 'featured_video_metabox_nonce');

		$attachment_id = (int) get_post_meta($post->ID, self::META_KEY, true);

		$preview_html = '<em style="color:#666;">' . esc_html__('No video selected.', 'stanza') . '</em>';

		if ($attachment_id) {
			$src = wp_get_attachment_url($attachment_id);
			if ($src) {
				$preview_html = wp_video_shortcode([
					'src'     => $src,
					'preload' => 'metadata',
				]);
			}
		}
		?>
		<div class="featured-video-metabox" data-featured-video-metabox="1">
			<p style="margin-top:0;">
				<?php echo esc_html__('Choose a video from the Media Library to use as the featured video for this post.', 'stanza'); ?>
			</p>

			<input
				type="hidden"
				name="_stanza_featured_video_id"
				value="<?php echo esc_attr($attachment_id ?: ''); ?>"
				data-featured-video-id
			/>

			<div style="margin:10px 0;" data-featured-video-preview>
				<?php echo $preview_html; ?>
			</div>

			<p style="display:flex; gap:8px; margin-bottom:0;">
				<button type="button" class="button button-primary" data-featured-video-choose>
					<?php echo esc_html__('Choose video', 'stanza'); ?>
				</button>

				<button
					type="button"
					class="button"
					data-featured-video-remove
					<?php disabled(!$attachment_id); ?>
				>
					<?php echo esc_html__('Remove', 'stanza'); ?>
				</button>
			</p>
		</div>
		<?php
	}

	public static function save_metabox(int $post_id): void {
		$post_type = get_post_type($post_id);
		if (!$post_type || !in_array($post_type, self::allowed_post_types(), true)) return;

		if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) return;
		if (wp_is_post_revision($post_id)) return;

		if (
			empty($_POST['featured_video_metabox_nonce']) ||
			!wp_verify_nonce($_POST['featured_video_metabox_nonce'], 'featured_video_metabox_save')
		) return;

		if (!current_user_can('edit_post', $post_id)) return;

		$id = isset($_POST['_stanza_featured_video_id']) ? (int) $_POST['_stanza_featured_video_id'] : 0;

		if ($id <= 0) {
			delete_post_meta($post_id, self::META_KEY);
			return;
		}

		$mime = get_post_mime_type($id);
		if (!$mime || strpos($mime, 'video/') !== 0) return;

		update_post_meta($post_id, self::META_KEY, $id);
	}

	public static function register_meta(): void {
		foreach (self::allowed_post_types() as $pt) {
			register_post_meta($pt, self::META_KEY, [
				'type'              => 'integer',
				'single'            => true,
				'default'           => 0,
				'sanitize_callback' => 'absint',
				'auth_callback'     => function () {
					return current_user_can('edit_posts');
				},
				'show_in_rest'      => true,
			]);
		}
	}
}

Featured_Video_Metabox_Media::init();
