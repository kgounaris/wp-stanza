
import { __, sprintf } from '@wordpress/i18n';
import { useInnerBlocksProps, useBlockProps, InnerBlocks, InspectorControls, store as blockEditorStore } from '@wordpress/block-editor';
import { PanelBody, SelectControl } from '@wordpress/components';
import { store as noticesStore } from '@wordpress/notices';
import { useSelect, useDispatch } from '@wordpress/data';
import { useEffect, useRef } from '@wordpress/element';

import { StanzaPanelColorSettings, StanzaAttrsPanelBody } from '../components';
import { setAlignLayoutBackground } from '../helpers';

export default function Edit({ attributes, setAttributes, clientId }) {
	const { align, allowedBlocks, backgroundColor, layout, parentId, tagName, template, groupOptions, useInnerBlockWrapper } = attributes;
	const tagNameOptions = window?.Stanza?.blocks['stanza/group']?.attributes?.tagName?.options

	// Set align layout and default background
	setAlignLayoutBackground('stanza/group', clientId, setAttributes, backgroundColor, align, layout, parentId);

	const blockProps = useBlockProps({
		className: [			
			'wp-block',
			backgroundColor ? `has-${backgroundColor}-background-color has-background-color` : ''
		].filter(Boolean).join(' ')
	});

	const innerBlocksProps = useInnerBlocksProps(
		{ className: 'wp-block-stanza-group__inner' },
		{
	        template: template || [],
	        allowedBlocks: allowedBlocks || []
    	}
    );

    const TagName = tagName || 'div';

    return (
    	<>
    		<InspectorControls>
				<StanzaAttrsPanelBody
					attributes={ attributes }
					setAttributes={ setAttributes }
				/>

				{ tagNameOptions?.length && (
				<PanelBody title={__('Settings')}>
					<SelectControl
			            label={ __('Tag', 'stanza' ) }
			            value={ tagName }
			            disabled={ false }
			            options={ tagNameOptions }
			            onChange={ ( newTagName ) => {
			            	setAttributes({ tagName: newTagName })
			            } }
			            __nextHasNoMarginBottom
			            __next40pxDefaultSize // Something about styles depreacted
			        />
				</PanelBody>
				)}
			</InspectorControls>
			
			{
    		// Add wp-block-stanza-group__inner wrapper only if it does NOT have a parent block
			((! parentId && (useInnerBlockWrapper ?? true)) || (parentId && (useInnerBlockWrapper ?? false))) ? (
			<>
	    		<InspectorControls group="styles">
					<StanzaPanelColorSettings
	                    setAttributes={ setAttributes }
	                    colorAttribute={ backgroundColor }
	                    palette={window?.Stanza?.blocks['stanza/group']?.attributes?.backgroundColor?.options}
	                />
				</InspectorControls>

    			<TagName { ...blockProps }><div {...innerBlocksProps} /></TagName>
			</>
			) : (
				<TagName { ...blockProps }>{innerBlocksProps.children}</TagName>
			)}
    	</>
    );
}