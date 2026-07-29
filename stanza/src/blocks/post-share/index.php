<?php
defined( 'ABSPATH' ) || exit;

/**
 * stanza/post-share — share links for the current post.
 */
register_block_type(
	STANZA_PATH . 'build/blocks/post-share',
	array(
		'render_callback' => function ( $attributes, $content, $block ) {
			$url   = get_permalink();
			$title = get_the_title();

			$links = array(
				'X'        => 'https://x.com/intent/tweet?' . http_build_query( array( 'url' => $url, 'text' => $title ) ),
				'Facebook' => 'https://www.facebook.com/sharer/sharer.php?' . http_build_query( array( 'u' => $url ) ),
				'Linkedin' => 'https://www.linkedin.com/sharing/share-offsite/?' . http_build_query( array( 'url' => $url ) ),
				'Mail'     => 'mailto:?' . http_build_query( array( 'subject' => $title, 'body' => $url ), '', '&', PHP_QUERY_RFC3986 ),
			);

			$html = '<div class="wp-block-stanza-post-share">';
			foreach ( $links as $label => $href ) {
				$html .= '<a href="' . esc_url( $href ) . '" rel="noopener" target="_blank">'
					. esc_html( $label ) . '</a>';
			}
			$html .= '</div>';

			return $html;
		},
	)
);
