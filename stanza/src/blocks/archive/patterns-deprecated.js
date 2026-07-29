import { decodeEntities } from '@wordpress/html-entities';
import { useSelect } from '@wordpress/data';
import { store as coreStore } from '@wordpress/core-data'
import { useRef, RawHTML } from '@wordpress/element';

import { wpData } from '../wp-data';

function postTypeTaxonomies(postType) {
	let { taxonomies, hasResolved } = useSelect(
		( select ) => {
			const core = select( coreStore );
			const query = { type: postType }; // same idea as get_object_taxonomies( $post_type )

			return {
				taxonomies: core.getTaxonomies( query ),
				hasResolved: core.hasFinishedResolution( 'getTaxonomies', [ query ] ),
			};
		},
		[ postType ]
	);

	return taxonomies;
}

function PostTerms({ post, postTypeTaxonomies, lastTermId = 0, tag = 'ul', debug = false }) {
	let allTerms = [];
	let nextTermId = -1;

	// Modified to get only the first term of first taxonomy TODO: as it should be
	if (postTypeTaxonomies) {
		allTerms = [postTypeTaxonomies[0]].map( ( tax ) => {
			const slug = 'category' == tax.slug ? 'categories' : tax.slug; // There is an inconsistansy in category taxonomy

			if (post?.[slug]) {
				nextTermId = post[slug][0];
				return {termId: post[slug][0], taxonomy: tax.slug};
			}
		})
	}

	const term = useSelect(
	    ( select ) => {
	        return select( coreStore ).getEntityRecord( 'taxonomy', allTerms?.[0]?.taxonomy, allTerms?.[0]?.termId );
	    },
	    [ postTypeTaxonomies ]
	);	
	
	if ('ul' == tag) {
		return(
			<ul className="entry-terms"><li className={`${ lastTermId == nextTermId ? 'screen-reader-text' : ''}`}>{ term?.name }</li></ul>
		)
	} else {
		return(
			<div className="entry-terms"><p><span className={`${ lastTermId == nextTermId ? 'screen-reader-text' : ''}`}>{ term?.name }</span></p></div>
		)
	}
}

export const PatternTitle = ({blocks, posts, postType}) => {
	return (		
		posts.map( ( post ) => (
			<article
				key={ post.id }
				className="post stanza-archive-list__item"
			>
				<header className="entry-header">
					<h3 className="wp-block-heading entry-title">
						{ decodeEntities(
							post.title?.rendered
						) }
					</h3>
				</header>
			</article>
		) )
	)
}

export const PatternTitleContent = ({blocks, posts, postType}) => {
	return (
		posts.map( ( post ) => (
			<article
				key={ post.id }
				className="post stanza-archive-list__item"
			>
				<header className="entry-header">
					<h3 className="wp-block-heading entry-title">
						{ decodeEntities(
							post.title?.rendered
						) }
					</h3>
				</header>

				{ post.content?.rendered && (
					<RawHTML className="entry-content is-layout-flow">{ post.content.rendered }</RawHTML>
				) }
			</article>
		) )
	)
}

export const PatternTermsTitle = ({blocks, posts, postType}) => {
	return (
		posts.map( ( post, index ) => {
			const postTypeTax = postTypeTaxonomies(postType);
			const previousPost = index > 0 ? posts[index - 1] : null;

			return (
				<article className="post stanza-archive-list__item" key={ post.id }>
					<div className="entry-info"><PostTerms key={ post.id } post={ post } postTypeTaxonomies={ postTypeTax } lastTermId={ previousPost?.[postTypeTax?.[0].slug]?.[0] } tag={ 'p' } /></div>
					<header className="entry-header">
						<h3 className="wp-block-heading entry-title">
							{ decodeEntities(
								post.title?.rendered
							) }
						</h3>
					</header>
				</article>
			)
		} )
	)
}

export const PatternTermsDateAuthorTitle = ({blocks, posts, postType}) => {
	return (		
		posts.map( ( post ) => {
			const postTypeTax = postTypeTaxonomies(postType);
			const author = useSelect(
				( select ) => select( coreStore ).getEntityRecord( 'root', 'user', post.author ),
				[ post.author ]
			);

			return (
				<article
					key={ post.id }
					className="post stanza-archive-list__item"
				>
					<div className="entry-info">
						<PostTerms key={ post.id } post={ post } postTypeTaxonomies={ postTypeTax } />
						<time dateTime={ post.date }>{ post.date }</time>{' '}
						<span className="entry-author">{ author?.nickname }</span>
					</div>

					<header className="entry-header">
						<h3 className="wp-block-heading entry-title">
							{ decodeEntities(
								post.title?.rendered
							) }
						</h3>
					</header>
				</article>
			)
		} )
	)
}

export const PatternTermsDateAuthorTitleImage = ({blocks, posts, postType}) => {
	//const { entityRecord } = wpData();
	const stanzaMediaAttrs = blocks['stanza/media']?.attributes || null;
	
	return (		
		posts.map( ( post ) => {
			const postTypeTax = postTypeTaxonomies(postType);
			const author = useSelect(
				( select ) => select( coreStore ).getEntityRecord( 'root', 'user', post.author ),
				[ post.author ]
			);
			const image = useSelect(
				( select ) => {
					return post.featured_media
						? select( coreStore ).getMedia( post.featured_media )
						: null;
				},
				[ post.featured_media ]
			);
			const imageUrl =
					( image?.media_details?.sizes?.stanzaMediaAttrs?.mediaImageSize?.source_url || image?.media_details?.sizes?.full?.source_url ) ||
					Stanza?.bloginfo?.template_url + '/theme-blocks/media-placeholder.svg'; // TODO: fix url

			return (
				<article
					key={ post.id }
					className="post stanza-archive-list__item"
				>
					<div className="entry-info">
						<PostTerms key={ post.id } post={ post } postTypeTaxonomies={ postTypeTax } />
						<time dateTime={ post.date }>{ post.date }</time>{' '}
						<span className="entry-author">{ author?.nickname }</span>
					</div>

					<header className="entry-header">
						<h3 className="wp-block-heading entry-title">
							{ decodeEntities(
								post.title?.rendered
							) }
						</h3>
					</header>

					<figure className={`wp-block-stanza-media size-${stanzaMediaAttrs?.mediaImageSize || 'full'} ${stanzaMediaAttrs?.mediaAspectRatio ? `has-${stanzaMediaAttrs?.mediaAspectRatio.replace('/', '-')}-aspect-ratio` : ''}`}>
						<img
							src={ imageUrl }
				            className={ `wp-image-${image?.id}` } // Mandatory for core image attributes like srcet etc. to be applied
				            alt={ post.title }
						/>
					</figure>
				</article>
			)
		} )
	)
}

export const PatternImageTitleTerms = ({blocks, posts, postType}) => {
	//const { entityRecord } = wpData();
	const stanzaMediaAttrs = blocks['stanza/media']?.attributes || null;

	return (
		posts.map( ( post ) => {
			const postTypeTax = postTypeTaxonomies(postType);
			const image = useSelect(
				( select ) => {
					return post.featured_media
						? select( coreStore ).getMedia( post.featured_media )
						: null;
				},
				[ post.featured_media ]
			);
			const imageUrl =
					( image?.media_details?.sizes?.stanzaMediaAttrs?.mediaImageSize?.source_url || image?.media_details?.sizes?.full?.source_url ) ||
					Stanza?.bloginfo?.template_url + '/theme-blocks/media-placeholder.svg'; // TODO: fix url


			return (
			<article
				key={ post.id }
				className="post stanza-archive-list__item"
			>
				<figure className={`wp-block-stanza-media size-${stanzaMediaAttrs?.mediaImageSize || 'full'} ${stanzaMediaAttrs?.mediaAspectRatio ? `has-${stanzaMediaAttrs?.mediaAspectRatio.replace('/', '-')}-aspect-ratio` : ''}`}>
					<img
						src={ imageUrl }
			            className={ `wp-image-${image?.id}` } // Mandatory for core image attributes like srcet etc. to be applied
			            alt={ post.title }
					/>
				</figure>

				<header className="entry-header">
					<h3 className="wp-block-heading entry-title">
						{ decodeEntities(
							post.title?.rendered
						) }
					</h3>
				</header>
				
				<PostTerms key={ post.id } post={ post } postTypeTaxonomies={ postTypeTax } />
			</article>
			)
		} )
	)
}

export const PatternImageTitleExcerptButton = ({blocks, posts, postType}) => {
	//const { entityRecord } = wpData();
	const stanzaMediaAttrs = blocks['stanza/media']?.attributes || null;

	return (
		posts.map( ( post ) => {
			const postTypeTax = postTypeTaxonomies(postType);
			const image = useSelect(
				( select ) => {
					return post.featured_media
						? select( coreStore ).getMedia( post.featured_media )
						: null;
				},
				[ post.featured_media ]
			);
			const imageUrl =
					( image?.media_details?.sizes?.stanzaMediaAttrs?.mediaImageSize?.source_url || image?.media_details?.sizes?.full?.source_url ) ||
					Stanza?.bloginfo?.template_url + '/theme-blocks/media-placeholder.svg'; // TODO: fix url

			return (
			<article
				key={ post.id }
				className="post stanza-archive-list__item"
			>
				<figure className={`wp-block-stanza-media size-${stanzaMediaAttrs?.mediaImageSize || 'full'} ${stanzaMediaAttrs?.mediaAspectRatio ? `has-${stanzaMediaAttrs?.mediaAspectRatio.replace('/', '-')}-aspect-ratio` : ''}`}>
					<img
						src={ imageUrl }
			            className={ `wp-image-${image?.id}` } // Mandatory for core image attributes like srcet etc. to be applied
			            alt={ post.title }
					/>
				</figure>

				<header className="entry-header">
					<h3 className="wp-block-heading entry-title">
						{ decodeEntities(
							post.title?.rendered
						) }
					</h3>
				</header>

				{ post.excerpt?.rendered && (
					<RawHTML className="entry-excerpt is-layout-flow">{ post.excerpt.rendered }</RawHTML>
				) }
				
			    <div className="wp-block-stanza-buttons is-layout-flex wp-block-stanza-buttons-is-layout-flex">
					<div className="wp-block-stanza-button"><a className="wp-block-stanza-button__link">Button soon</a></div>
				</div>
			</article>
			)
		} )
	)
}

export const PatternTitleTerms = ({blocks, posts, postType}) => {
	return (
		posts.map( ( post ) => {
			const postTypeTax = postTypeTaxonomies(postType);

			return (
			<article
				key={ post.id }
				className="post stanza-archive-list__item"
			>
				<header className="entry-header">
					<h3 className="wp-block-heading entry-title">
						{ decodeEntities(
							post.title?.rendered
						) }
					</h3>
				</header>
				
				<PostTerms key={ post.id } post={ post } postTypeTaxonomies={ postTypeTax } />
			</article>
			)
		} )
	)
}