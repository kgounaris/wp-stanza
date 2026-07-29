<?php
defined( 'ABSPATH' ) || exit;

/**
 * stanza/archive-filters — taxonomy filter lists + search box for
 * archive views. Server-rendered.
 */
register_block_type(
	STANZA_PATH . 'build/blocks/archive-filters',
	array(
		'render_callback' => 'stanza_render_archive_filters_block',
	)
);

function stanza_render_archive_filters_block( $attributes, $content, $block ) {

	$placeholder = sprintf(
		/* translators: %s: archive title */
		esc_html__( 'Search %s', 'stanza' ),
		esc_html( get_the_archive_title() )
	);

	if ( ! ( $attributes['title'] ?? false ) ) {
		$title = is_search()
			? esc_html__( 'Results for', 'stanza' ) . ' <em>' . esc_html( get_search_query() ) . '</em>'
			: esc_html( get_the_archive_title() );
	} else {
		$title = esc_html( $attributes['title'] );
	}

	$html  = '<div class="wp-block-stanza-archive-filters">';
	$html .= '<div class="wp-block-stanza-archive-filters__inner">';
	$html .= '<div class="wp-block-stanza-group wp-block wp-block-stanza-group__description">';
	$html .= '<p class="wp-block-stanza-archive-filters__header"><span>' . $title . '</span></p>';
	$html .= '</div>';

	foreach ( ( $attributes['taxonomies'] ?? array() ) as $tax ) {
		if ( empty( $tax['taxonomy'] ) || ! taxonomy_exists( $tax['taxonomy'] ) ) {
			continue;
		}

		// Serialize attributes properly instead of string-concatenating JSON.
		$categories_block = '<!-- wp:categories ' . wp_json_encode( array(
			'taxonomy'       => $tax['taxonomy'],
			'showPostCounts' => (bool) ( $tax['showPostCounts'] ?? false ),
		) ) . ' /-->';

		$html .= '<div class="wp-block-stanza-group wp-block wp-block-stanza-group__' . esc_attr( $tax['taxonomy'] ) . '">';
		$html .= '<p class="wp-block-stanza-archive-filters__header">' . esc_html( $tax['title'] ?? __( 'Categories', 'stanza' ) ) . '</p>';
		$html .= do_blocks( $categories_block );
		$html .= '</div>';
	}

	$search_block = '<!-- wp:search ' . wp_json_encode( array(
		'label'       => __( 'Search', 'stanza' ),
		'showLabel'   => false,
		'buttonText'  => __( 'Search', 'stanza' ),
		'placeholder' => $placeholder,
	) ) . ' /-->';

	$html .= '<div class="wp-block-stanza-group wp-block wp-block-stanza-group__search">';
	$html .= do_blocks( $search_block );
	$html .= '</div>';
	$html .= '</div>';
	$html .= '</div>';

	return $html;
}

/**
 * Keep the active search term when clicking a tag link.
 */
add_filter( 'tag_link', function ( $tag_url, $term_id ) {
	if ( is_admin() ) {
		return $tag_url;
	}

	$search_term = get_query_var( 's' );

	if ( ! empty( $search_term ) ) {
		$tag_url = add_query_arg( 's', rawurlencode( $search_term ), $tag_url );
	}

	return $tag_url;
}, 10, 2 );

/**
 * Scope the core search block to the current tag/category archive.
 */
add_filter( 'render_block_core/search', function ( $block_content, $block ) {
	if ( is_admin() ) {
		return $block_content;
	}

	$hidden_input = '';

	if ( is_tag() || is_category() ) {
		$current_term = get_queried_object();
		$field        = is_tag() ? 'tag' : 'category_name';

		if ( $current_term && ! is_wp_error( $current_term ) && ! empty( $current_term->slug )
			&& ! str_contains( $block_content, 'name="' . $field . '"' ) ) {
			$hidden_input = sprintf(
				'<input type="hidden" name="%s" value="%s">',
				esc_attr( $field ),
				esc_attr( $current_term->slug )
			);
		}
	}

	if ( empty( $hidden_input ) ) {
		return $block_content;
	}

	return str_replace( '</form>', $hidden_input . '</form>', $block_content );
}, 10, 2 );
