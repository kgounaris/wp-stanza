<?php
defined( 'ABSPATH' ) || exit;

/**
 * Stanza configuration for this theme. The framework plugin reads
 * theme-blocks/stanza.json (block toggles, attribute defaults, composer
 * section definitions); this file only holds the theme-side editor hooks.
 * stanza_config() is provided by the plugin.
 */

/**
 * Theme block category.
 */
add_filter( 'block_categories_all', function ( $categories ) {
	return array_merge(
		$categories,
		array(
			array(
				'slug'  => 'theme',
				'title' => __( 'Theme Blocks', 'stanza-starter' ),
			),
		)
	);
} );

/**
 * Whitelist editor blocks: the stanza enabled in stanza.json plus a
 * curated set of core blocks. Per-template whitelists can be layered on top —
 * keep the conditions readable and free of raw superglobals.
 */
add_filter( 'allowed_block_types_all', function ( $allowed_block_types, $editor_context ) {
	if ( ! function_exists( 'stanza_config' ) ) {
		return $allowed_block_types;
	}

	$enabled = array();
	foreach ( (array) ( stanza_config()->settings->blocks ?? array() ) as $block => $allow ) {
		if ( $allow ) {
			$enabled[] = $block;
		}
	}

	$core = array(
		'core/heading',
		'core/paragraph',
		'core/list',
		'core/list-item',
		'core/table',
		'core/quote',
		'core/image',
		'core/html',
	);

	return array_merge( $core, $enabled );
}, 10, 2 );

/**
 * Default block template for new pages.
 */
add_filter( 'block_editor_settings_all', function ( $editor_settings, $post ) {
	if ( ( $post->post->post_type ?? null ) === 'page' ) {
		$editor_settings['template'] = array(
			array( 'stanza/free-text', array(
				'template' => array( array( 'core/paragraph' ) ),
			) ),
		);
	}

	return $editor_settings;
}, 10, 2 );
