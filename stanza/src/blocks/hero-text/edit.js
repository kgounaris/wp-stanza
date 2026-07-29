
import { __ } from '@wordpress/i18n';
import { useInnerBlocksProps, useBlockProps, InspectorControls, store as blockEditorStore } from '@wordpress/block-editor';
import { PanelBody, ToggleControl } from '@wordpress/components';

import { StanzaPanelColorSettings, StanzaAttrsPanelBody } from '../components';
import { setAlignLayoutBackground } from '../helpers';

export default function Edit({ attributes, setAttributes, clientId }) {
	const { align, backgroundColor, blocks, layout, parentId, template, useInnerBlocksWrapper } = attributes;
	// Template has to be always this !
	// Todo add attribute for header tag and tagProps
	const TEMPLATE = [
		['stanza/header', { ...(blocks?.['header']?.attributes ?? {}) }],
		['stanza/paragraph'],
		['stanza/summary-text', { ...(blocks?.['summary-text']?.attributes ?? {}) }]
	];

	// Set align layout and default background
	setAlignLayoutBackground('stanza/hero-text', clientId, setAttributes, backgroundColor, align, layout, parentId);

	const blockProps = useBlockProps({
		className: [
			'wp-block',
			backgroundColor ? `has-${backgroundColor}-background-color has-background-color` : ''
		].filter(Boolean).join(' ')
	});

	const innerBlocksProps = useInnerBlocksProps(
		{ className: 'wp-block-stanza-hero-text__inner is-layout-flow' },
		{
			layout: layout,
	        template: template || TEMPLATE,
	        templateLock: 'all',
	        allowedBlocks: ['core/paragraph']        
    	}
    );
    
    return (
    	<>
    		<InspectorControls>
				<StanzaAttrsPanelBody
					attributes={ attributes }
					setAttributes={ setAttributes }
				/>
			</InspectorControls>
			
			{
    		// Add wp-block-stanza-hero-text__inner wrapper only if it does NOT have a parent block
			((! parentId && (useInnerBlocksWrapper ?? true)) || (parentId && (useInnerBlocksWrapper ?? false))) ? (
			<>
	    		<InspectorControls group="styles">
					<StanzaPanelColorSettings
	                    setAttributes={ setAttributes }
	                    colorAttribute={ backgroundColor }
	                    palette={window?.Stanza?.blocks['stanza/hero-text']?.attributes?.backgroundColor?.options}
	                />
				</InspectorControls>

    			<div { ...blockProps }><div {...innerBlocksProps} /></div>
			</>
			) : (
				<div { ...blockProps }>{innerBlocksProps.children}</div>
			)}
    	</>
    );
}