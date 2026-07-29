
import { __ } from '@wordpress/i18n';
import { useInnerBlocksProps, useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { useEffect } from '@wordpress/element';

import { setAlignLayoutBackground } from '../helpers';
import { StanzaPanelColorSettings, StanzaAttrsPanelBody } from '../components';
import { monitorBlockFocus } from '../utilities';

monitorBlockFocus('stanza/free-text'); // TODO: run here?

export default function Edit({ attributes, setAttributes, clientId }) {
	const { align, allowedBlocks, backgroundColor, freeTextOptions, layout, parentId, template } = attributes;

	// Default template
	const TEMPLATE = [
		['stanza/header', { lock: { move: true, remove: true } }],
		['stanza/paragraph', { lock: { move: true, remove: true } }],
		['core/paragraph', {            
        	placeholder: __('Type', 'stanza')
        }]
	];

	// Set align layout and default background
	setAlignLayoutBackground('stanza/free-text', clientId, setAttributes, backgroundColor, align, layout, parentId);

	const blockProps = useBlockProps({
		className: [			
			'wp-block',
			'is-layout-flow',
			backgroundColor ? `has-${backgroundColor}-background-color has-background-color` : ''
		].filter(Boolean).join(' ')
	});
	
	const innerBlocksProps = useInnerBlocksProps(blockProps,
		{
			layout: layout,
	        template: template || TEMPLATE,  
	        templateLock: false,
	        allowedBlocks: allowedBlocks || [
	        	'core/heading',
	        	'core/paragraph',
	        	'core/list',
	        	'core/list-item',
	        	'core/quote',
	        	'core/table',
	        	'stanza/media',
	        	'stanza/button',
	        	'stanza/slider'
	        ]
		}
	);

    return (
    	<>
    		<InspectorControls>
				<StanzaAttrsPanelBody attributes={ attributes } />
			</InspectorControls>

			{
			// Add wp-block-stanza-free-text__inner wrapper only if it does NOT have a parent block
			! parentId ? (
			<>
	    		<InspectorControls group="styles">
					<StanzaPanelColorSettings
	                    setAttributes={ setAttributes }
	                    colorAttribute={ backgroundColor }
	                    palette={window?.Stanza?.blocks['stanza/free-text']?.attributes?.backgroundColor?.options}
	                />
				</InspectorControls>

    			<div { ...innerBlocksProps }>
    				<div className="is-layout-flow">{innerBlocksProps.children}</div>
    			</div>
			</>
			) : (
				<div { ...blockProps }>{innerBlocksProps.children}</div>
			)}    		
    	</>
    );
}