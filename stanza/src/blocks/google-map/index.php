<?php
defined( 'ABSPATH' ) || exit;

/**
 * stanza/google-map — the Maps JS API key is per-site configuration,
 * never hardcoded. Set it in the theme's stanza.json:
 *
 *   "settings": { "google-maps-api-key": "…" }
 *
 * Restrict the key to the site's domains in the Google Cloud console.
 */
register_block_type( STANZA_PATH . 'build/blocks/google-map' );

function stanza_google_maps_src( bool $async ): string {
	$key = (string) stanza_setting( 'google-maps-api-key', '' );

	if ( '' === $key ) {
		return '';
	}

	return add_query_arg(
		array_filter( array(
			'key'     => $key,
			'loading' => $async ? 'async' : null,
		) ),
		'https://maps.googleapis.com/maps/api/js'
	);
}

add_action( 'enqueue_block_editor_assets', function () {
	$src = stanza_google_maps_src( true );
	if ( $src ) {
		wp_register_script( 'google-maps-api', $src, array(), null, array( 'in_footer' => true ) );
	}
}, 100 );

add_action( 'enqueue_block_assets', function () {
	$src = stanza_google_maps_src( false );
	if ( $src ) {
		wp_register_script( 'google-maps-api', $src, array(), null, array( 'in_footer' => true ) );
	}
} );
