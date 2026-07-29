<?php
defined( 'ABSPATH' ) || exit;

/**
 * stanza/navigation — renders a classic menu (by term id) chosen in the
 * editor.
 */
register_block_type(
	STANZA_PATH . 'build/blocks/navigation',
	array(
		'render_callback' => function ( $attributes, $content, $block ) {
			$menu_id = isset( $attributes['menuId'] ) ? (int) $attributes['menuId'] : 0;
			if ( ! $menu_id ) {
				return '';
			}

			return wp_nav_menu( array(
				'menu'            => $menu_id,
				'container'       => $attributes['args']['container'] ?? '',
				'container_class' => $attributes['args']['containerClass'] ?? '',
				'menu_class'      => 'wp-block-stanza-navigation ' . ( $attributes['args']['menuClass'] ?? '' ),
				'echo'            => false,
				'fallback_cb'     => false,
			) );
		},
	)
);
