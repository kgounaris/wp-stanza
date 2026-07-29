<?php
defined( 'ABSPATH' ) || exit;

/**
 * Read the active theme's stanza.json — the single configuration source
 * for the block system. Cached per request: every consumer calls this instead
 * of re-reading and re-decoding the file.
 *
 * @return object Decoded configuration (empty object when missing/invalid).
 */
function stanza_config(): object {
	static $config = null;

	if ( null === $config ) {
		$path   = get_template_directory() . '/theme-blocks/stanza.json';
		$config = new stdClass();

		if ( file_exists( $path ) ) {
			$decoded = json_decode( (string) file_get_contents( $path ) );

			if ( json_last_error() === JSON_ERROR_NONE && is_object( $decoded ) ) {
				$config = $decoded;
			} else {
				// Malformed config should be loud in dev, silent-safe in prod.
				if ( defined( 'WP_DEBUG' ) && WP_DEBUG ) {
					trigger_error( 'stanza.json is not valid JSON: ' . json_last_error_msg(), E_USER_WARNING );
				}
			}
		}
	}

	return $config;
}

/**
 * Convenience accessor for a settings key with a default,
 * e.g. stanza_setting( 'google-maps-api-key', '' ).
 */
function stanza_setting( string $key, $default = null ) {
	return stanza_config()->settings->{$key} ?? $default;
}
