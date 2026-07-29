import { __ } from '@wordpress/i18n';
import { useEffect, useMemo } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
import {
	InspectorControls,
	useBlockProps,
	useInnerBlocksProps,
	RichText,
	store as blockEditorStore
} from '@wordpress/block-editor';
import {
	PanelBody,
	SelectControl,
	CheckboxControl,
	Button,
	Spinner,
	ToggleControl,
	BaseControl,
	TextControl,
	__experimentalNumberControl as NumberControl
} from '@wordpress/components';

import {
	//fetchPosts,
	fetchSafePosts,
	getPostTypes,
	//getCurrentPostType,
	getTaxonomies,
	getTermsByTax,
	onChangePostType,
	onChangeOrderMode
} from './helpers';

import PostTemplate from './components/postTemplate';
import TaxFiltersPanelBody from './components/taxFilters';
import SelectControlPost from './components/selectControlPost';

import { StanzaAttrsPanelBody, StanzaPanelColorSettings } from '../components';
import { setAlignLayoutBackground } from '../helpers';
import { IconSet } from '../icons';
import { wpData } from '../wp-data';

const ORDER_OPTIONS = [
	{ label: 'Default order', value: 'default' },
	{ label: 'Newest first', value: 'newest' },
	{ label: 'Oldest first', value: 'oldest' },
	{ label: 'A → Z (title)', value: 'az' },
	{ label: 'Z → A (title)', value: 'za' }
];

const ITEM_TEMPLATE = [
	//["stanza/paragraph", { "subtitlePosition": "", "tag": ""}],
	['stanza/post-template', {
		template: [
			//[ 'core/post-featured-image' ],
			[ 'core/post-title' ],
			[ 'core/post-excerpt' ]
		]
	}]
];

export default function Edit({ attributes, setAttributes, clientId }) {
	const {
		align,
		archiveOptions,
		blocks= [],
		backgroundColor,
		predefinedPosts,
		postType = 'post',
		orderMode = 'default',
		layout,
		metaKey,
		metaValue,
		parentId,
		readMoreContent,
		filters = {},
		numberOfPosts,
		displayAllPosts,
		pagination,
		selectedPostIds,
		template,
		useBlockWrapper,
		useInnerBlocksWrapper
	} = attributes;

	const { entityRecord } = wpData();

	// Set align layout and default background
	setAlignLayoutBackground('stanza/archive', clientId, setAttributes, backgroundColor, align, layout, parentId);

	const blockProps = useBlockProps({
		className: [
			'wp-block',
			backgroundColor ? `has-${backgroundColor}-background-color has-background-color` : ''
		].filter(Boolean).join(' '),
	});

	// Selected Post Ids related attributes
	useEffect(() => {
	  	if ( selectedPostIds.length ) {
	    	setAttributes( {
	    		displayAllPosts: false
	    	} );
	  	}
	}, [selectedPostIds] )

	// Set default number of posts
	useEffect(() => {
		if (selectedPostIds?.length) {
	    	setAttributes( { numberOfPosts: selectedPostIds.length } );
		} else if (predefinedPosts?.length) {
	    	setAttributes( { numberOfPosts: predefinedPosts.length } );
		} else if ( ! numberOfPosts ) {
	    	setAttributes( { numberOfPosts: entityRecord?.posts_per_page } );
	  	}
	}, [entityRecord, numberOfPosts, selectedPostIds, predefinedPosts] );

	// Set default template
	useEffect(() => {
	  	if ( ! template?.length ) {
	    	setAttributes( { template: ITEM_TEMPLATE } );
	  	}
	}, [ template/*, setAttributes*/ ] );

	const innerBlocksProps = useInnerBlocksProps(blockProps,
		{
			template: template
		}
	);

	// Get all viewable post types
	const postTypes = getPostTypes();

	// Current post type object (to get rest_base, taxonomies, etc.)
	//const currentPostType = getCurrentPostType(postTypes, postType);

	// Taxonomies for current post type
	const taxonomies = getTaxonomies(postType);

	// Terms for each taxonomy
	const termsByTax = getTermsByTax(taxonomies);

	// Post type options
	const postTypeOptions = useMemo( () => {
		if ( ! postTypes ) return [];
		return postTypes.map( ( type ) => ( {
			label: type.labels?.singular_name || type.name,
			value: type.slug,
		} ) );
	}, [ postTypes ] );

	// Fetch posts for preview (no ServerSideRender)	
	//const posts = fetchPosts(postType, orderMode, filters, numberOfPosts, predefinedPosts, selectedPostIds);

	// Fetch safe posts
	const safePosts = fetchSafePosts(postType);

	return (
		<>
			<InspectorControls>
				<StanzaAttrsPanelBody
					attributes={ attributes }
					setAttributes={ setAttributes }
				/>

				{ true && (
				<>
				<PanelBody
					title="Archive settings"
					initialOpen={ true }
				>
					{ ! postTypes && <Spinner /> }

					{ postTypes && (
						<SelectControl
							label="Post type"
							value={ postType }
							options={ postTypeOptions }
							onChange={ ( newPostType ) => ( onChangePostType(newPostType, predefinedPosts, selectedPostIds, setAttributes) ) }
							__next40pxDefaultSize
							_nextHasNoMarginBottom
						/>
					) }

					<SelectControlPost
						safePosts={safePosts}
						selectedPostIds={selectedPostIds}
						setAttributes={setAttributes}
					/>

					{ true && (
					<>
						<SelectControl
							label="Order by"
							value={ orderMode }
							options={ ORDER_OPTIONS }
							onChange={ ( newOrderMode ) => ( onChangeOrderMode(newOrderMode, setAttributes) ) }
							__next40pxDefaultSize
							_nextHasNoMarginBottom
						/>
						
						<NumberControl
							label="Number of posts"
							value={ predefinedPosts?.length ? predefinedPosts.length : numberOfPosts }
							onChange={ ( value ) => {
								setAttributes( { numberOfPosts: parseInt( value, 10 ) } );
							} }
							min={ 1 }
							max={ 50 }
							step={ 1 }
							help={ `If empty, it loads the Dashboard\'s "Blog pages show at most" reading setting. (${entityRecord?.posts_per_page})` }
							disabled={ displayAllPosts || selectedPostIds?.length || predefinedPosts?.length }
						/>
					</>
					) }

					<ToggleControl
			            label={ __('Display all posts', 'stanza') }
			            checked={ displayAllPosts }
						disabled={ selectedPostIds.length }
			            onChange={ ( newDisplayAllPosts ) => setAttributes({ displayAllPosts : newDisplayAllPosts }) }
			            __nextHasNoMarginBottom
			        />

					<TextControl
	                    label="Read more"
	                    value={ readMoreContent }
	                    help={ 'Shortcodes: [post-title]' }
	                    onChange={ (value) => setAttributes({ readMoreContent: value }) }
	                />

			        <BaseControl label="Pagination">
						<ToggleControl
				            label={ __('Enable', 'stanza') }
				            checked={ pagination }
				            onChange={ ( newPagination ) => setAttributes({ pagination : newPagination }) }
				            __nextHasNoMarginBottom
				        />
				    </BaseControl>
				</PanelBody>

				<PanelBody title="Meta query" initialOpen={ false }>
					<TextControl
	                    label="Meta key"
	                    value={ metaKey }
	                    onChange={ (value) => setAttributes({ metaKey: value }) }
	                />

					<TextControl
	                    label="Meta value"
	                    value={ metaValue }
	                    onChange={ (value) => setAttributes({ metaValue: value }) }
	                />
				</PanelBody>

				{ ! selectedPostIds.length && (
				<PanelBody title="Filters" initialOpen={ false }>
					<TaxFiltersPanelBody
						taxonomies={taxonomies}
						termsByTax={termsByTax}
						filters={filters}
						setAttributes={setAttributes}
					/>
				</PanelBody>
				) }
				</>
				)}
			</InspectorControls>

			{ ! parentId ? (
			<InspectorControls group="styles">
				<StanzaPanelColorSettings
					setAttributes={ setAttributes }
					colorAttribute={ backgroundColor }
					palette={ window?.Stanza?.blocks['stanza/archive']?.attributes?.backgroundColor?.options }
				/>
			</InspectorControls>
			) : (<></>)}

			{ useBlockWrapper ?
								
				<div {...innerBlocksProps} >
				{ // Add wp-block-stanza-free-archive__inner wrapper only if it does NOT have a parent block
				((! parentId && (useInnerBlocksWrapper ?? true)) || (parentId && (useInnerBlocksWrapper ?? false))) ? (
				    <div className="wp-block-stanza-archive__inner">
				    	{ innerBlocksProps.children }
				    </div>
				) : (
				    <>{ innerBlocksProps.children }</>
				)}			
				</div> :

				<>{ innerBlocksProps.children }</> 
			}	

		</>
	);
}
