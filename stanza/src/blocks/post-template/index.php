<?php
defined( 'ABSPATH' ) || exit;

/**
 * stanza/post-template — renders its inner-block template once per post
 * of the parent archive's query, re-binding postId/postType context for each
 * iteration.
 */
register_block_type(
	STANZA_PATH . 'build/blocks/post-template',
	array(
		'render_callback' => 'stanza_render_post_template_block',
	)
);

/** Wrapper tags a template item may use — anything else falls back to article. */
function stanza_post_template_tag( string $tag ): string {
	return in_array( $tag, array( 'article', 'div', 'li', 'section' ), true ) ? $tag : 'article';
}

function stanza_render_post_template_block( $attributes, $content, $block ) {
	$post_type         = $block->context['stanza/archivePostType'] ?? ( $attributes['postType'] ?? 'post' );
	$meta_key          = $block->context['stanza/archiveMetaKey'] ?? ( $attributes['metaKey'] ?? '' );
	$meta_value        = $block->context['stanza/archiveMetaValue'] ?? ( $attributes['metaValue'] ?? '' );
	$filters           = $block->context['stanza/archiveFilters'] ?? array();
	$order_mode        = $block->context['stanza/archiveOrderMode'] ?? 'desc';
	$display_all_posts = $block->context['stanza/archiveDisplayAllPosts'] ?? false;
	$number_of_posts   = $display_all_posts ? -1 : ( $block->context['stanza/archiveNumberOfPosts'] ?? get_option( 'posts_per_page' ) );
	$predefined_posts  = ( $attributes['useThePost'] ?? false )
		? array( get_the_ID() )
		: ( $block->context['stanza/archivePredefinedPosts'] ?? ( $attributes['predefinedPosts'] ?? array() ) );
	$selected_post_ids = $block->context['stanza/archiveSelectedPostIds'] ?? array();
	$pagination        = $block->context['stanza/archivePagination'] ?? false;

	if ( ! empty( $predefined_posts ) ) {
		$query_args = array(
			'post_type' => $post_type,
			'post__in'  => array_map( 'intval', $predefined_posts ),
		);
	} elseif ( ! empty( $selected_post_ids ) ) {
		$query_args = array(
			'post_type' => $post_type,
			'post__in'  => array_map( 'intval', $selected_post_ids ),
		);
	} elseif ( isset( $_GET['s'] ) ) {
		// A search context suppresses the default listing.
		$query_args = array(
			'post_type' => $post_type,
			'post__in'  => array( 0 ),
		);
	} else {
		$query_args = array(
			'post_type'      => $post_type,
			'posts_per_page' => $number_of_posts,
		);

		// Taxonomy filters -> tax_query ('author' is handled separately below).
		if ( ! empty( $filters ) && is_array( $filters ) ) {
			$tax_query = array( 'relation' => 'AND' );

			foreach ( $filters as $tax_slug => $term_ids ) {
				if ( 'author' === $tax_slug || empty( $term_ids ) || ! is_array( $term_ids ) ) {
					continue;
				}

				$tax_query[] = array(
					'taxonomy' => $tax_slug,
					'field'    => 'term_id',
					'terms'    => array_map( 'intval', $term_ids ),
				);
			}

			if ( count( $tax_query ) > 1 ) {
				$query_args['tax_query'] = $tax_query;
			}

			if ( isset( $filters['author'] ) ) {
				$query_args['author__in'] = array_map( 'intval', (array) $filters['author'] );
			}
		}
	}

	switch ( $order_mode ) {
		case 'newest':
			$query_args['orderby'] = 'date';
			$query_args['order']   = 'DESC';
			break;
		case 'oldest':
			$query_args['orderby'] = 'date';
			$query_args['order']   = 'ASC';
			break;
		case 'az':
			$query_args['orderby'] = 'title';
			$query_args['order']   = 'ASC';
			break;
		case 'za':
			$query_args['orderby'] = 'title';
			$query_args['order']   = 'DESC';
			break;
		default:
			break;
	}

	if ( $meta_key && $meta_value ) {
		$query_args['meta_query'] = array(
			array(
				'key'   => $meta_key,
				'value' => $meta_value,
			),
		);
	}

	$paged               = max( 1, (int) get_query_var( 'paged' ) );
	$query_args['paged'] = $paged;

	$query = new WP_Query( $query_args );
	$tag   = stanza_post_template_tag( $attributes['tag'] ?? 'article' );

	$post_ids = array();

	ob_start();

	if ( $query->have_posts() ) {
		while ( $query->have_posts() ) {
			$query->the_post();

			$post_id    = get_the_ID();
			$post_type  = get_post_type( $post_id );
			$post_ids[] = $post_id;

			// Clone the block instance and re-bind context for this iteration.
			$instance                        = $block->parsed_block;
			$instance['context']             = $instance['context'] ?? array();
			$instance['context']['postId']   = $post_id;
			$instance['context']['postType'] = $post_type;

			$filter_block_context = static function ( $context ) use ( $post_id, $post_type ) {
				$context['postType'] = $post_type;
				$context['postId']   = $post_id;
				return $context;
			};

			$classes    = array();
			$categories = get_the_category();
			if ( ! empty( $categories ) && ! is_wp_error( $categories ) ) {
				foreach ( $categories as $cat ) {
					$classes[] = 'category-' . (int) $cat->term_id;
				}
			}

			if ( $attributes['htmlAttrs']['className']['acf'] ?? false ) {
				$acf_class = function_exists( 'get_field' )
					? get_field( $attributes['htmlAttrs']['className']['acf'], $post_id )
					: get_post_meta( $post_id, $attributes['htmlAttrs']['className']['acf'], true );
				if ( $acf_class ) {
					$classes[] = (string) $acf_class;
				}
			}

			$html_id = '';
			switch ( $attributes['htmlAttrs']['id'] ?? null ) {
				case 'slug':
					$html_id = ' id="' . esc_attr( urldecode( get_post_field( 'post_name', $post_id ) ) ) . '"';
					break;
				case 'id':
					$html_id = ' id="' . esc_attr( $post_type . '-' . $post_id ) . '"';
					break;
			}

			echo '<' . $tag . $html_id . ' class="wp-block-stanza-post is-layout-flow ' . esc_attr( implode( ' ', $classes ) ) . '">';

			// Early priority so other render_block_context filters see the values.
			add_filter( 'render_block_context', $filter_block_context, 1 );
			echo ( new WP_Block( $instance ) )->render( array( 'dynamic' => false ) );
			remove_filter( 'render_block_context', $filter_block_context, 1 );

			echo '</' . $tag . '>';
		}

		if ( $pagination ) {
			$paginate_links = paginate_links( array(
				'total'     => $query->max_num_pages,
				'current'   => $paged,
				'prev_text' => __( 'Previous', 'stanza' ),
				'next_text' => __( 'Next', 'stanza' ),
			) );

			if ( $paginate_links ) {
				echo '<div class="wp-block-stanza-archive-pagination"><nav aria-label="' . esc_attr__( 'Pagination', 'stanza' ) . '">';
				echo $paginate_links;
				echo '</nav></div>';
			}
		}
	} else {
		echo '<' . $tag . ' class="wp-block-stanza-post is-layout-flow">';
		echo '<p>' . esc_html__( 'No results found', 'stanza' ) . '</p>';
		echo '</' . $tag . '>';
	}

	wp_reset_postdata();

	$output = ob_get_clean();

	return apply_filters(
		'stanza_post_template_block_render',
		$output,
		$attributes,
		$content,
		$block,
		$post_ids,
		$post_type
	);
}

/**
 * REST: allow filtering the pages collection by a meta key/value — but only
 * for whitelisted keys. An open meta_query on an unauthenticated endpoint
 * would let anyone probe arbitrary (including private) post meta.
 */
function stanza_rest_allowed_meta_keys(): array {
	return apply_filters( 'stanza_rest_meta_keys', array( '_wp_page_template' ) );
}

add_filter( 'rest_page_collection_params', function ( $params ) {
	$params['meta_key'] = array(
		'description' => 'Meta key to filter by (whitelisted keys only)',
		'type'        => 'string',
		'required'    => false,
		'enum'        => stanza_rest_allowed_meta_keys(),
	);

	$params['meta_value'] = array(
		'description' => 'Meta value to filter by',
		'type'        => 'string',
		'required'    => false,
	);

	return $params;
} );

add_filter( 'rest_page_query', function ( $args, $request ) {
	$meta_key   = $request->get_param( 'meta_key' );
	$meta_value = $request->get_param( 'meta_value' );

	if ( $meta_key && null !== $meta_value
		&& in_array( $meta_key, stanza_rest_allowed_meta_keys(), true ) ) {
		$args['meta_query'] = array(
			array(
				'key'   => $meta_key,
				'value' => $meta_value,
			),
		);
	}

	return $args;
}, 10, 2 );
