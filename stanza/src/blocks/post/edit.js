
import { __ } from '@wordpress/i18n';
import { useInnerBlocksProps, useBlockProps, BlockControls, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, ToggleControl } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { useEffect, useRef } from '@wordpress/element';

import { StanzaPanelColorSettings, StanzaAttrsPanelBody } from '../components';
import { monitorBlockFocus } from '../utilities';
import { setAlignLayoutBackground } from '../helpers';
import StanzaMediaEdit from '../media/components/edit';
import MediaBlockControls from '../media/components/blockControls';
import { onSelect } from '../media/helpers';
import MediaInspectorControlsSettings from '../media/components/inspectorControls';

export default function Edit({ attributes, setAttributes, clientId }) {
	const { align, backgroundColor, layout, mediaAlt, mediaId, mediaImageSize, mediaIdPredefined, template } = attributes;
	const TEMPLATE = [
		['core/post-title'],
		['core/post-terms', { term: "project_type" }],
		['stanza/free-text', {
			template: [
				['core/paragraph', {            
		        	placeholder: __('Type', 'stanza')
		        }]
			]
		}]
	];

	// Set align layout and default background
	setAlignLayoutBackground('stanza/post', clientId, setAttributes, backgroundColor, align, layout/*, parentId*/);

	// Keep track of previous featuredImageId
    const prevFeaturedImageId = useRef(mediaId);

	const featuredImageId = useSelect(
		( select ) => {
			const post = select('core/editor').getCurrentPost();
			return post?.featured_media || 0;
		},
		[prevFeaturedImageId]
	);	

	const featuredImage = useSelect(
	    ( select ) => featuredImageId ? select('core').getMedia(featuredImageId) : null,
	    [featuredImageId]
	);

	useEffect(() => {
		if (mediaIdPredefined) {
			const media = {
				id: featuredImage?.id,
				height: featuredImage?.media_details?.height,
				width: featuredImage?.media_details?.width,
				sizes: featuredImage?.media_details?.sizes,
				alt: featuredImage?.alt_text,
				type: featuredImage?.media_type,
				mime: featuredImage?.mime_type
			}

			onSelect(media, setAttributes, mediaImageSize, true);
			prevFeaturedImageId.current = featuredImageId;			
		}
	}, [featuredImage]);

	const blockProps = useBlockProps({
		className: [			
			'wp-block',
			backgroundColor ? `has-${backgroundColor}-background-color has-background-color` : ''
			
		].filter(Boolean).join(' ')
	});
	
	const innerBlocksProps = useInnerBlocksProps(blockProps, {
		template: template || TEMPLATE,
		templateLock: 'all',    
	    allowedBlocks: []
	});

    return (
    	<>
			<BlockControls group="other">

				<MediaBlockControls
					{...{ attributes, setAttributes }}
				/>
			</BlockControls>

    		<InspectorControls>
				<MediaInspectorControlsSettings
					{...{ attributes, setAttributes }}
					provide={ {
						blockName: 'stanza/post'
					} }
				>
					<ToggleControl
			            label={ __('Load featured image', 'stanza') }
			            checked={ mediaIdPredefined }
			            disabled={ mediaIdPredefined }
			            help={ __( mediaIdPredefined ? 'You can replace the media from the top toolbar if you don’t want to display the featured image.' : '', 'stanza' ) }
			            onChange={ ( newMediaIdPredefined ) => {
			            	setAttributes({ mediaIdPredefined : newMediaIdPredefined })
			            	const media = {
								id: featuredImage?.id,
								height: featuredImage?.media_details?.height,
								width: featuredImage?.media_details?.width,
								sizes: featuredImage?.media_details?.sizes,
								alt: featuredImage?.alt_text,
								type: featuredImage?.media_type,
								mime: featuredImage?.mime_type
							}

							onSelect(media, setAttributes, mediaImageSize, true);
							prevFeaturedImageId.current = featuredImageId;
			        	} }
			            __nextHasNoMarginBottom
			        />
				</MediaInspectorControlsSettings>
			</InspectorControls>

    		<InspectorControls group="styles">
				<StanzaPanelColorSettings
                    setAttributes={ setAttributes }
                    colorAttribute={ backgroundColor }
                    palette={window?.Stanza?.blocks['stanza/post']?.attributes?.backgroundColor?.options}
                />
			</InspectorControls>
    		
		    <div {...innerBlocksProps}>
		    	<div>
			        <StanzaMediaEdit
						blockProps={{ className: 'wp-block-stanza-media' }}
						{...{ attributes, setAttributes, clientId }}
					/>

		    		<div>{innerBlocksProps.children}</div>		    		
				</div>
		    </div>

    	</>
    );
}