<?php
defined( 'ABSPATH' ) || exit;

/**
 * stanza/composer — the section-block factory. Each theme declares its
 * page sections in stanza.json under blocks."stanza/composer"
 * .registerBlocks; every entry becomes a stanza/composer-<name> block
 * whose InnerBlocks template composes the generic primitives.
 *
 * The editor side reads the same declarations from window.Stanza
 * (see src/blocks/helpers.js) — stanza.json is the single source.
 */
register_block_type( STANZA_PATH . 'build/blocks/composer' );

$composer_blocks = stanza_config()->blocks->{'stanza/composer'}->registerBlocks ?? array();
$metadata        = json_decode( (string) file_get_contents( __DIR__ . '/block.json' ), true );

foreach ( $composer_blocks as $composer_block ) {
	register_block_type(
		'stanza/composer-' . $composer_block->name,
		array(
			'api_version'     => 3,
			'attributes'      => $metadata['attributes'] ?? array(),
			'supports'        => $metadata['supports'] ?? array(),
			// Static rendering: the saved content is the output.
			'render_callback' => function ( $attributes, $content ) {
				return $content;
			},
		)
	);
}
