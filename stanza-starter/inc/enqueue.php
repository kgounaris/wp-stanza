<?php
defined( 'ABSPATH' ) || exit;

add_action( 'wp_enqueue_scripts', function () {
	$version = wp_get_theme()->get( 'Version' );

	wp_enqueue_style( 'stanza-starter-main', get_stylesheet_directory_uri() . '/assets/css/main.css', array(), $version );
	wp_enqueue_script( 'stanza-starter-main', get_stylesheet_directory_uri() . '/assets/js/main.js', array(), $version, true );
} );
