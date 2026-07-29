<?php
defined( 'ABSPATH' ) || exit;

/**
 * Archive titles without the "Category:" prefix.
 */
add_filter( 'get_the_archive_title', function ( $title ) {
	if ( is_category() ) {
		$title = single_cat_title( '', false );
	}
	return $title;
} );
