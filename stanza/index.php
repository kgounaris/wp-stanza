<?php
/**
 * Plugin Name:       Stanza
 * Description:       A Gutenberg block framework — generic block primitives configured per theme via theme-blocks/stanza.json.
 * Requires at least: 6.3
 * Requires PHP:      8.0
 * Version:           1.0.0
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       stanza
 */

defined( 'ABSPATH' ) || exit;

// The plugin is driven entirely by the active theme's configuration.
if ( ! file_exists( get_template_directory() . '/theme-blocks/stanza.json' ) ) {
	return;
}

define( 'STANZA_URL', plugin_dir_url( __FILE__ ) );
define( 'STANZA_PATH', plugin_dir_path( __FILE__ ) );

require_once STANZA_PATH . 'includes/config.php';         // stanza_config() — cached theme config
require_once STANZA_PATH . 'includes/render-filters.php'; // shared front-end render filters
require_once STANZA_PATH . 'includes/cli.php';            // wp stanza sync-scss

// Blocks manager (admin UI over the theme's stanza.json).
if ( is_admin() ) {
	require_once STANZA_PATH . 'blocks-manager/plugin-settings.php';
}

// Optional sub-plugins, gated by theme config.
if ( stanza_config()->settings->plugins->{'featured-video'} ?? false ) {
	require_once STANZA_PATH . 'plugins/featured-video/index.php';
}
if ( stanza_config()->settings->plugins->{'wp-forms'} ?? true ) {
	require_once STANZA_PATH . 'plugins/wp-forms/index.php';
}

/**
 * Register block types.
 *
 * Static blocks register straight from their build/ block.json. Blocks that
 * need server-side logic include a src/blocks/<name>/index.php which
 * registers itself (attributes and supports always come from block.json —
 * never re-declared in PHP).
 */
add_action( 'init', function () {
	// Static blocks — block.json is the whole story.
	$static_blocks = array(
		'free-text',
		'teaser',
		'hero-text',
		'media-text',
		'summary-text',
		'contact',
		'slider',
		'post',
		'paragraph',
		'header',
		'button',
		'hero-media',
		'gallery',
		'group',
	);
	foreach ( $static_blocks as $name ) {
		register_block_type( STANZA_PATH . 'build/blocks/' . $name );
	}

	// Blocks with server-side rendering or extra hooks.
	$dynamic_blocks = array(
		'media',
		'google-map',
		'archive',
		'archive-filters',
		'post-template',
		'accordion',
		'composer',
		'navigation',
		'post-share',
		'post-navigation',
	);
	foreach ( $dynamic_blocks as $name ) {
		include_once STANZA_PATH . 'src/blocks/' . $name . '/index.php';
	}
} );

/**
 * Expose the theme configuration to the block editor as window.Stanza,
 * registered before core enqueues block assets (priority 5 matters: block
 * editor scripts list 'stanza-config' as a dependency).
 */
add_action( 'enqueue_block_editor_assets', function () {
	$opts           = clone stanza_config();
	$opts->bloginfo = array(
		'template_url'   => get_bloginfo( 'template_url' ),
		'STANZA_URL' => STANZA_URL,
	);

	wp_register_script( 'stanza-config', '', array(), null, false );
	wp_add_inline_script(
		'stanza-config',
		'window.Stanza = ' . wp_json_encode( $opts ) . ';',
		'before'
	);
}, 5 );

/**
 * Global editor script (cross-block filters and editor UX tweaks).
 */
add_action( 'enqueue_block_editor_assets', function () {
	$manifest = STANZA_PATH . 'editor/build/index.asset.php';

	if ( file_exists( $manifest ) ) {
		$asset = include $manifest;
		wp_enqueue_script(
			'stanza-editor',
			STANZA_URL . 'editor/build/index.js',
			$asset['dependencies'],
			$asset['version'],
			true
		);
	}
} );

/**
 * Admin styles (editor chrome + blocks manager).
 */
add_action( 'admin_enqueue_scripts', function () {
	$version = get_file_data( __FILE__, array( 'Version' => 'Version' ) )['Version'] ?? '1.0.0';

	wp_enqueue_style( 'stanza-editor-admin', STANZA_URL . 'assets/css/editor.css', array(), $version );
	wp_enqueue_style( 'stanza-manager', STANZA_URL . 'assets/css/manager.css', array(), $version );
} );

/**
 * Constrain the editor to the design system: no custom sizes, colors,
 * gradients or typography controls — editors pick from theme.json presets.
 */
add_filter( 'wp_theme_json_data_theme', 'stanza_filter_theme_json' );
function stanza_filter_theme_json( $theme_json ) {
	$data = $theme_json->get_data();

	$data['settings']['typography']['defaultFontSizes'] = false;
	$data['settings']['typography']['customFontSize']   = false;
	$data['settings']['typography']['fontWeight']       = false;
	$data['settings']['typography']['fontStyle']        = false;
	$data['settings']['typography']['textTransform']    = false;
	$data['settings']['typography']['letterSpacing']    = false;
	$data['settings']['typography']['textDecoration']   = false;
	$data['settings']['typography']['lineHeight']       = false;
	$data['settings']['typography']['customLineHeight'] = false;
	$data['settings']['typography']['dropCap']          = false;

	$data['settings']['color']['custom']           = false;
	$data['settings']['color']['customDuotone']    = false;
	$data['settings']['color']['customGradient']   = false;
	$data['settings']['color']['defaultDuotone']   = false;
	$data['settings']['color']['defaultGradients'] = false;
	$data['settings']['color']['defaultPalette']   = false;

	$data['settings']['blocks']['core/post-terms'] = array(
		'color'      => array( 'palette' => array() ),
		'typography' => array( 'fontSizes' => array() ),
	);

	return $theme_json->update_with( $data );
}

/**
 * Core block tweaks: limit heading levels to H2–H4.
 */
add_filter( 'register_block_type_args', function ( $args, $block_type ) {
	if ( 'core/heading' === $block_type ) {
		$args['attributes']['levelOptions']['default'] = array( 2, 3, 4 );
	}
	return $args;
}, 10, 2 );
