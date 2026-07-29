
import { useSelect } from '@wordpress/data';
import { useMemo } from '@wordpress/element';

/**
 * Fetch posts for preview (no ServerSideRender)
 */
export const fetchPosts = (postType, metaKey, metaValue, orderMode, filters, numberOfPosts, predefinedPosts, selectedPostIds) => {
	return useSelect(
		( select ) => {
			if ( ! postType ) return null;

			const query = {};

			if (predefinedPosts?.length) {
				query.include = predefinedPosts;
				query.per_page = predefinedPosts?.length;
			} else if (selectedPostIds?.length) {
				query.include = selectedPostIds;
				query.per_page = selectedPostIds?.length;
			}
			// Per page: in editor we cap -1 to something sane (e.g. 100)
			else if ( Number( numberOfPosts ) === -1 || ! numberOfPosts ) {
				query.per_page = 100;
			} else {
				query.per_page = Number( numberOfPosts );
			}

			// Ordering
			switch ( orderMode ) {
				case 'newest':
					query.order = 'desc';
					query.orderby = 'date';
					break;
				case 'oldest':
					query.order = 'asc';
					query.orderby = 'date';
					break;
				case 'az':
					query.order = 'asc';
					query.orderby = 'title';
					break;
				case 'za':
					query.order = 'desc';
					query.orderby = 'title';
					break;
				default:
					// leave default REST order
					break;
			}

			// Tax filters (e.g. { categories: [1,2], your_tax: [3] })
			if ( filters && Object.keys( filters ).length ) {
				Object.entries( filters ).forEach( ( [ taxSlug, termIds ] ) => {
					if ( termIds && termIds.length && taxSlug !== 'author' ) { // TODO: that is not a taxonomy
						if ('category' == taxSlug) {
							taxSlug = 'categories';
						} else if ( 'post_tag' == taxSlug ) {
							taxSlug = 'tags';							
						}
						query[ taxSlug ] = termIds;
					}
				} );
			}

			// Author filter
			if ( filters && Object.keys( filters ).length && filters?.author ) {
				query.author = filters?.author;
			}

			// Meta query args
			if ( metaKey !== undefined && metaKey !== '' && metaValue !== undefined && metaValue !== '' ) {
				query.meta_key = metaKey;
				query.meta_value = metaValue;
			}

			return select( 'core' ).getEntityRecords(
				'postType',
				postType,
				query
			);
		},
		[ postType, orderMode, filters, numberOfPosts, selectedPostIds, metaKey, metaValue ]
	);	
}

/**
 * Fetch safe posts
 */
export const fetchSafePosts = (postType) => {
	return useSelect(
		( select ) => {
			if ( ! postType ) return [];

			return select( 'core' ).getEntityRecords(
				'postType',
				postType
			);
		},
		[ postType ]
	) ?? []; // Because getEntityRecords() returns null while it’s loading
}

/**
 * Get post types
 */
export const getPostTypes = () => {
	return useSelect( ( select ) => {
		const types = select( 'core' ).getPostTypes( { per_page: -1 } );
		if ( ! types ) return null;

		return types.filter(
			( type ) =>
				type.viewable &&
				type.slug !== 'attachment' &&
				type.slug !== 'wp_block'
		);
	}, [] );
}

/**
 * Get current post type
 */
export const getCurrentPostType = (postTypes, postType) => {
	return useMemo( () => {
		if ( ! postTypes ) return null;
		return postTypes.find( ( type ) => type.slug === postType ) || null;
	}, [ postTypes, postType ] );
}

/**
 * Get Taxonomies for current post type
 */
export const getTaxonomies = (postType) => {
	return useSelect(
		( select ) => {
			if ( ! postType ) return null;
			return select( 'core' ).getTaxonomies( {
				type: postType,
				context: 'view',
			} );
		},
		[ postType ]
	);
}

/**
 * Get Terms for each taxonomy
 */
export const getTermsByTax = (taxonomies) => {
	return useSelect(
		( select ) => {
			if ( ! taxonomies ) return {};
			const result = {};
			taxonomies.forEach( ( tax ) => {
				const terms = select( 'core' ).getEntityRecords(
					'taxonomy',
					tax.slug,
					{ per_page: -1 }
				);
				result[ tax.slug ] = terms;
			} );
			return result;
		},
		[ taxonomies ]
	);
}

/**
 * On change post type
 */
export const onChangePostType = ( value, setAttributes ) => {
	setAttributes( {
		postType: value,
		filters: {}, // reset filters on post type change
	} );
};

/**
 * On change order mode
 */
export const onChangeOrderMode = ( value, setAttributes ) => {
	setAttributes( { orderMode: value } );
};
