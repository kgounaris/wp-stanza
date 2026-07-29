
import { useSelect } from '@wordpress/data';
import { useMemo } from '@wordpress/element';

/**
 * Fetch safe posts
 */
export const fetchSafePosts = (postType) => {
	return useSelect(
		( select ) => {
			if ( ! postType ) return [];

			return select( 'core' ).getEntityRecords(
				'postType',
				postType,
				{ per_page: -1 } // or a large number like 100
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
export const onChangePostType = ( value, predefinedPosts, selectedPostIds, setAttributes ) => {
	setAttributes( {
		postType: value,
		predefinedPosts: [],
		selectedPostIds: [],
		filters: {}, // reset filters on post type change
	} );
};

/**
 * On change order mode
 */
export const onChangeOrderMode = ( value, setAttributes ) => {
	setAttributes( { orderMode: value } );
};
