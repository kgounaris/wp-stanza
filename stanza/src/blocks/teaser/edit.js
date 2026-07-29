
import { __ } from '@wordpress/i18n';
import { useInnerBlocksProps, useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { createBlock } from '@wordpress/blocks';
import { PanelBody, RangeControl } from '@wordpress/components';
import { useEffect, useState } from '@wordpress/element';

import { setAlignLayoutBackground } from '../helpers';
import { StanzaPanelColorSettings, StanzaAttrsPanelBody } from '../components';

export default function Edit({ attributes, setAttributes, clientId }) {
	const { align, backgroundColor, columns, layout, mediaPosition, mediaAspectRatio, mediaImageSize, parentId, teaserOptions, template, useBlockWrapper, useInnerBlockWrapper } = attributes;
	const [localColumns, setLocalColumns] = useState(columns);
	const { replaceInnerBlocks, updateBlockAttributes } = wp.data.dispatch('core/block-editor');
	const { getBlocksByClientId } = wp.data.select('core/block-editor');
	const innerBlocks = getBlocksByClientId(clientId)[0].innerBlocks;

	// Default template
	const MEDIA_TEXT_TEMPLATE = [
		['stanza/hero-text', {
			template: [
				['core/heading'],
				['stanza/summary-text', { maxParagraphs: 2}]
			]
		}]
	];

	// Set align layout and default background
	setAlignLayoutBackground('stanza/teaser', clientId, setAttributes, backgroundColor, align, layout, parentId);

	const blockProps = useBlockProps({
		className: [			
			'wp-block',
			backgroundColor ? `has-${backgroundColor}-background-color has-background-color` : '',
			columns ? `has-${columns}-columns` : ''
		].filter(Boolean).join(' ')
	});
	
	const innerBlocksProps = useInnerBlocksProps(blockProps,
		{
	        templateLock: false,
	        allowedBlocks: ['core/media-text']
		}
	);

	// Ensure the correct number of columns is rendered
    useEffect(() => {
        if (innerBlocks.length === 0 && localColumns > 0) {
            const defaultColumns = Array.from({ length: localColumns }, (value, index) => {
                return createBlock('stanza/media-text', {
                	useInnerBlockWrapper: false,
                	blockPropsOverwrite: { className: 'wp-block-stanza-teaser__column' },
                	mediaPosition: mediaPosition,
                	mediaAspectRatio: mediaAspectRatio,
                	mediaImageSize: mediaImageSize,
                    template: template || MEDIA_TEXT_TEMPLATE
                    });
            });;
            replaceInnerBlocks(clientId, defaultColumns, false);
        } else if (innerBlocks.length !== localColumns) {
            updateColumns(localColumns);
        }
    }, [localColumns]);

    const updateColumns = (newColumnCount) => {
        const currentColumnCount = innerBlocks.length;
        let newInnerBlocks = [...innerBlocks];

        for (let i = 0; i < newInnerBlocks.length; i++) {
            newInnerBlocks[i].attributes.lastColumn = false;
        }

        if (newColumnCount > currentColumnCount) {
            
            for (let i = currentColumnCount; i < newColumnCount; i++) {
                newInnerBlocks.push(createBlock('stanza/media-text', {
                	useInnerBlockWrapper: false,
                	blockPropsOverwrite: { className: 'wp-block-stanza-teaser__column' },
                	mediaPosition: mediaPosition,
                	mediaAspectRatio: mediaAspectRatio,
                	mediaImageSize: mediaImageSize,
                    template: template || MEDIA_TEXT_TEMPLATE
                    }));
            }
        } else if (newColumnCount < currentColumnCount) {
            newInnerBlocks = newInnerBlocks.slice(0, newColumnCount);
            newInnerBlocks[newColumnCount-1].attributes.lastColumn = true;
            newInnerBlocks[0].attributes.firstColumn = true;
        }

        replaceInnerBlocks(clientId, newInnerBlocks, false);
        setAttributes({ columns: newColumnCount });
    };

    const handleSliderChange = (newColumns) => {
        setLocalColumns(newColumns);
    };    

    return (
    	<>
    		<InspectorControls>
				<StanzaAttrsPanelBody
					attributes={ attributes }
					setAttributes={ setAttributes }
				/>

				<PanelBody title={__('Settings', 'stanza')}>
					<RangeControl
	                    label={__('Columns', 'stanza')}
	                    value={localColumns}
	                    onChange={handleSliderChange}
	                    min={1}
	                    max={20}
	                />
	            </PanelBody>
			</InspectorControls>

			{ ! parentId && (
	    		<InspectorControls group="styles">
					<StanzaPanelColorSettings
	                    setAttributes={ setAttributes }
	                    colorAttribute={ backgroundColor }
	                    palette={window?.Stanza?.blocks['stanza/teaser']?.attributes?.backgroundColor?.options}
	                />
				</InspectorControls>
			)}

			{ useBlockWrapper ?

			// Add wp-block-stanza-teaser__inner wrapper only if it does NOT have a parent block
			((! parentId && (useInnerBlockWrapper ?? true)) || (parentId && (useInnerBlockWrapper ?? false))) ? (
				<div { ...innerBlocksProps }>
					<div>{innerBlocksProps.children}</div>
				</div>
			) : (
				<div { ...blockProps }>{innerBlocksProps.children}</div>
			) :

			<>{ innerBlocksProps.children }</>

			}    		
    	</>
    );
}