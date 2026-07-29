<?php
defined( 'ABSPATH' ) || exit;

add_action( 'after_setup_theme', function () {
	add_theme_support( 'post-thumbnails' );
	add_theme_support( 'custom-logo' );
	add_theme_support( 'title-tag' );

	register_nav_menu( 'primary', __( 'Primary menu', 'stanza-starter' ) );
	register_nav_menu( 'footer', __( 'Footer menu', 'stanza-starter' ) );
} );

add_action( 'init', function () {
	add_post_type_support( 'page', 'excerpt' );
} );
