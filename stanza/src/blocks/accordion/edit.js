
import { __ } from '@wordpress/i18n';
import { useBlockProps, useInnerBlocksProps, InnerBlocks, BlockControls, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, SelectControl } from '@wordpress/components';
import { useEffect, useRef, useMemo } from '@wordpress/element';

import { StanzaPanelColorSettings, StanzaAttrsPanelBody } from '../components';
import { setAlignLayoutBackground } from '../helpers';

export default function Edit({ attributes, setAttributes, clientId }) {
	const { align, backgroundColor, layout, template, parentId } = attributes;
	const containerRef = useRef();

	// Set align layout and default background
	setAlignLayoutBackground('stanza/accordion', clientId, setAttributes, backgroundColor, align, layout, parentId);

	// Default template
	const TEMPLATE = [
		["stanza/hero-text"] // TODO: proper template
	];

	// Set default template
	useEffect(() => {
		if ( ! template?.length ) {
			setAttributes({template: TEMPLATE})
		}
	}, [template]);

	const allowedBlocks = template?.map((key) => key[0]);

	const blockProps = useBlockProps({
		className: [
			'wp-block',
			backgroundColor ? `has-${backgroundColor}-background-color has-background-color` : ''
		].filter(Boolean).join(' '),
	});

	const innerBlocksProps = useInnerBlocksProps(blockProps,
		{
			allowedBlocks: allowedBlocks,
			template: template
		}
	);

	return (
		<>
			<InspectorControls>
				<StanzaAttrsPanelBody
					attributes={ attributes }
				/>
			</InspectorControls>

			<InspectorControls group="styles">
				<StanzaPanelColorSettings
					setAttributes={ setAttributes }
					colorAttribute={ backgroundColor }
					palette={ window?.Stanza?.blocks['stanza/accordion']?.attributes?.backgroundColor?.options }
				/>
			</InspectorControls>

			<div { ...innerBlocksProps }>
				{ innerBlocksProps.children }
			</div>
		</>
	);
}
