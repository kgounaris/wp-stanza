import { useEffect, useMemo } from '@wordpress/element';
import { useSelect, useDispatch } from '@wordpress/data';

import {
	InspectorControls,
	BlockContextProvider,
	InnerBlocks,
	useBlockProps,
	__experimentalUseBlockPreview as useBlockPreview,
} from '@wordpress/block-editor';

import { createBlocksFromInnerBlocksTemplate } from '@wordpress/blocks';

import { fetchPosts } from './helpers';
import { StanzaAttrsPanelBody } from '../components';
import { wpData } from '../wp-data';

const ITEM_TEMPLATE = [
	[ 'core/post-featured-image' ],
	[ 'core/post-title' ],
	[ 'core/post-excerpt' ],
];

export default function Edit({ attributes, setAttributes, clientId, context }) {
	const { template, useThePost, tag, htmlAttrs={} } = attributes;
	const blockProps = useBlockProps();
	const { entityRecord } = wpData();

	const postType = context?.[ 'stanza/archivePostType' ] ?? ( attributes?.postType ?? 'post' );
	const metaKey = context?.[ 'stanza/archiveMetaKey' ] ?? ( attributes?.metaKey ?? '' );
	const metaValue = context?.[ 'stanza/archiveMetaValue' ] ?? ( attributes?.metaValue ?? '' );
	const readMoreContent = context?.[ 'stanza/archiveReadMoreContent' ] ?? ( attributes?.readMoreContent ?? '' );
	const filters = context?.[ 'stanza/archiveFilters' ] ?? {};
	const orderMode = context?.[ 'stanza/archiveOrderMode' ] ?? 'desc';
	const displayAllPosts = context?.[ 'stanza/archiveDisplayAllPosts' ] ?? false;
	const numberOfPosts = displayAllPosts ? -1 : ( context?.[ 'stanza/archiveNumberOfPosts' ] ?? entityRecord?.posts_per_page );
	const predefinedPosts =
		useThePost && context?.postId
			? [ context.postId ]
			: ( context?.[ 'stanza/archivePredefinedPosts' ] ?? ( attributes?.predefinedPosts ?? [] ) );
	const selectedPostIds = context?.[ 'stanza/archiveSelectedPostIds' ] ?? [];

	const TagName = tag || 'article';

	// Keep attribute template for compatibility / inspector UI
	useEffect(() => {
		if ( ! template?.length ) {
			setAttributes( { template: ITEM_TEMPLATE } );
		}
	}, [ template ] );

	const effectiveTemplate = template?.length ? template : ITEM_TEMPLATE;

	// ✅ Read actual stored inner blocks (these are what InnerBlocks.Content will output)
	const innerBlocks = useSelect(
		( select ) => select( 'core/block-editor' ).getBlocks( clientId ),
		[ clientId ]
	);

	const { replaceInnerBlocks, updateBlockAttributes } = useDispatch( 'core/block-editor' );

	// ✅ Seed InnerBlocks ONCE if empty, using your template array
	useEffect(() => {
		if ( innerBlocks?.length ) return;

		const seeded = createBlocksFromInnerBlocksTemplate( effectiveTemplate );
		// 3rd arg: shouldSelectFirstBlock — keep false so it doesn't jump focus
		replaceInnerBlocks( clientId, seeded, false );
	}, [ clientId, innerBlocks?.length, effectiveTemplate, replaceInnerBlocks ] );

	// Update read more content attribute
	useEffect( () => {
		const updateReadMoreBlocks = ( blocks ) => {
			blocks.forEach( ( block ) => {
				if (
					block.name === 'core/read-more' &&
					block.attributes.content !== 'Read more'
				) {
					updateBlockAttributes( block.clientId, {
						content: readMoreContent,
					} );
				}

				if ( block.innerBlocks?.length ) {
					updateReadMoreBlocks( block.innerBlocks );
				}
			} );
		};

		updateReadMoreBlocks( innerBlocks );
	}, [ readMoreContent ] );

	// Fetch posts for preview (no ServerSideRender)
	const posts = fetchPosts(
		postType,
		metaKey,
		metaValue,
		orderMode,
		filters,
		numberOfPosts,
		predefinedPosts,
		selectedPostIds
	);

	// Preview blocks: prefer the REAL stored innerBlocks, fallback to template
	const previewBlocks = useMemo(
		() => ( innerBlocks?.length ? innerBlocks : createBlocksFromInnerBlocksTemplate( effectiveTemplate ) ),
		[ innerBlocks, effectiveTemplate ]
	);

	const previewProps = useBlockPreview( { blocks: previewBlocks } );

	if ( posts === null ) return <div { ...blockProps }><div className="loader">Loading response</div></div>;
	if ( ! posts?.length ) return <div { ...blockProps }><div className="noposts">No posts found.</div></div>;

	const previewPropsClassname = previewProps.className;


	return (
		<>
			<InspectorControls>
				<StanzaAttrsPanelBody attributes={ attributes } />
			</InspectorControls>

			{/* ✅ This is what actually gets saved and makes $content exist.
			    Keep it mounted always, but visually tucked away. */}
			<div className="stanza-archive__template-store" style={ { display: 'none' } }>
				<InnerBlocks templateLock="all" renderAppender={ false } />
			</div>

			{posts.map( ( post ) => {
				const categoryClasses = ( post?.categories ?? [] )
					.map( ( id ) => `category-${ id }` )
					.join( ' ' );					
				
				if (htmlAttrs?.id == 'slug') {
					previewProps.id = post?.slug;
				} else if (htmlAttrs?.id == 'id') {
					previewProps.id = postType + '-' + post?.id;					
				}


				previewProps.className = `${ previewPropsClassname } wp-block-stanza-post is-layout-flow ${ categoryClasses }`;

				if (htmlAttrs?.className?.acf) {
					previewProps.className += ` ${post?.acf?.[htmlAttrs.className.acf]}`;
				}

				return (
					<BlockContextProvider
						key={ post.id }
						value={ { postId: post.id, postType } }
					>
						<TagName { ...previewProps } />
					</BlockContextProvider>
				);
			} )}
		</>
	);
}