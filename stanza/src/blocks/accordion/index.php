<?php
defined( 'ABSPATH' ) || exit;

/**
 * stanza/accordion — panels start collapsed; view.js animates max-height.
 */
register_block_type( STANZA_PATH . 'build/blocks/accordion' );

add_filter( 'render_block', function ( $rendered_block, $block ) {
	if ( 'stanza/accordion' === ( $block['blockName'] ?? '' ) ) {
		$rendered_block = str_replace( 'class="entry-content"', 'class="entry-content" style="max-height:0;"', $rendered_block );
		$rendered_block = str_replace( 'class="wp-block-stanza-summary-text"', 'class="wp-block-stanza-summary-text" style="max-height:0;"', $rendered_block );
	}

	return $rendered_block;
}, 2, 2 );
