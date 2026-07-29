<?php
defined( 'ABSPATH' ) || exit;

/**
 * stanza/media — static save output by default; server-rendered when the
 * media comes from post data (featured image or a meta key) so it works
 * inside query loops.
 */
register_block_type(
	STANZA_PATH . 'build/blocks/media',
	array(
		'render_callback' => function ( $attributes, $content, $block ) {

			$is_dynamic = ( $attributes['mediaIsFeaturedImage'] ?? false )
				|| ( $attributes['mediaIdMetaKey'] ?? false );

			if ( ! $is_dynamic ) {
				return $content; // static save output is fine
			}

			$image_size   = $attributes['mediaImageSize'] ?? 'full';
			$aspect_ratio = $attributes['mediaAspectRatio'] ?? '';
			$media_type   = $attributes['mediaType'] ?? '';
			$href         = ( ( $attributes['mediaHrefIsPredefined'] ?? false ) === 'the_permalink' )
				? get_the_permalink()
				: null;

			if ( $attributes['mediaIdMetaKey'] ?? false ) {
				$media_id = function_exists( 'get_field' )
					? get_field( $attributes['mediaIdMetaKey'], get_the_ID() )
					: get_post_meta( get_the_ID(), $attributes['mediaIdMetaKey'], true );

				if ( 'video' === $media_type ) {
					$media_url = wp_get_attachment_url( $media_id );
				} else {
					$media_url = wp_get_attachment_image_url( $media_id, $image_size )
						?: get_template_directory_uri() . '/theme-blocks/media-placeholder.svg';
				}
			} else {
				$media_id  = get_post_thumbnail_id();
				$media_url = wp_get_attachment_image_url( $media_id, $image_size );

				if ( ! $media_url ) {
					$media_id = 0;
				}
			}

			if ( ! $media_url ) {
				return '';
			}

			// Orientation from the full-size dimensions.
			$dims        = wp_get_attachment_image_src( $media_id, 'full' );
			$orientation = ( ! empty( $dims[1] ) && ! empty( $dims[2] ) )
				? ( $dims[2] > $dims[1] ? 'portrait' : 'landscape' )
				: '';

			$classes = implode( ' ', array_filter( array(
				'wp-block-stanza-media',
				'size-' . sanitize_html_class( $image_size ),
				$aspect_ratio ? 'has-' . sanitize_html_class( str_replace( '/', '-', $aspect_ratio ) ) . '-aspect-ratio' : '',
				$orientation ? 'has-' . $orientation . '-orientation' : '',
			) ) );

			$a_open  = $href
				? '<a href="' . esc_url( $href ) . '" title="' . esc_attr( wp_strip_all_tags( get_the_title(), true ) ) . '">'
				: '';
			$a_close = $a_open ? '</a>' : '';

			if ( 'video' === $media_type ) {
				$inner = '<video autoplay loop muted playsinline preload="metadata"><source src="' . esc_url( $media_url ) . '"></video>';
			} elseif ( 'image' === $media_type ) {
				$inner = wp_get_attachment_image( $media_id, $image_size );
			} else {
				return '';
			}

			return '<figure class="' . esc_attr( $classes ) . '">' . $a_open . $inner . $a_close . '</figure>';
		},
	)
);
