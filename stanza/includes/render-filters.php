<?php
defined( 'ABSPATH' ) || exit;

/**
 * Front-end render filters shared by several blocks.
 *
 * One filter instead of the previous five identical ones (free-text,
 * hero-media, media-text, slider each registered their own copy of the
 * "filtermetoclass" replacement, and the empty-content cleanup ran
 * unconditionally on every block of every page).
 */

/**
 * Blocks whose save output smuggles a class list through the
 * `filtermetoclass` attribute (resolved to `class` at render time).
 */
const STANZA_FILTERCLASS_BLOCKS = array(
	'stanza/free-text',
	'stanza/hero-media',
	'stanza/media-text',
	'stanza/slider',
);

/**
 * Blocks whose empty output should be suppressed entirely.
 */
const STANZA_EMPTY_PRUNE_BLOCKS = array(
	'stanza/paragraph',
	'stanza/hero-text',
	'stanza/group',
	'stanza/free-text',
	'stanza/summary-text',
	'core/heading',
	'core/list',
	'core/quote',
	'core/paragraph',
);

add_filter( 'render_block', function ( $block_content, $block ) {
	$name = $block['blockName'] ?? '';

	if ( in_array( $name, STANZA_FILTERCLASS_BLOCKS, true ) ) {
		$block_content = str_replace( 'filtermetoclass', 'class', $block_content );
	}

	// [post-title] placeholder inside read-more labels.
	if ( 'core/read-more' === $name ) {
		return str_replace( '[post-title]', esc_html( get_the_title() ), $block_content );
	}

	// Prevent empty-content blocks from rendering on the front end.
	if ( in_array( $name, STANZA_EMPTY_PRUNE_BLOCKS, true )
		&& trim( wp_strip_all_tags( $block_content ) ) === '' ) {
		return '';
	}

	// Remove empty <figure> wrappers — only when the output can contain one.
	if ( str_contains( (string) $block_content, '<figure' ) ) {
		$block_content = preg_replace( '~<figure[^>]*></figure>~i', '', $block_content );
	}

	return $block_content;
}, 2, 2 );
