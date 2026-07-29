
import { __ } from '@wordpress/i18n';
import { useBlockProps, useInnerBlocksProps, InspectorControls } from '@wordpress/block-editor';

import { StanzaAttrsPanelBody } from '../components';

export default function Edit({ attributes, setAttributes, clientId }) {
	const { level, subtitlePosition, tag, tagProps, subtitleBlock } = attributes;

	// TODO: Preserve content when subtitle position changes
	let TEMPLATE = [
		['core/heading', {
		    level: level,
		    placeholder: __('Heading', 'stanza')
		}]		
	];

	const SUBTITLE_BLOCK = subtitleBlock || ['stanza/paragraph', { className: "is-style-subtitle", placeholder: "Subtitle" }];

	switch (subtitlePosition) {
		case 'top':
			TEMPLATE.unshift(SUBTITLE_BLOCK);		
		break;
		case 'bottom':
			TEMPLATE.push(SUBTITLE_BLOCK);
		break;
	}		

    const blockProps = useBlockProps({
		className: [
			tagProps?.className,
			'is-layout-flow'
		].filter(Boolean).join(' '),
	});

	const innerBlocksProps = useInnerBlocksProps({},
		{
	        template: TEMPLATE,
	        templateLock: 'all',
	        allowedBlocks: []        
    	}
    );

    return (
    	<>
    		<InspectorControls>
				<StanzaAttrsPanelBody
					attributes={ attributes }
				/>
			</InspectorControls>

			{ tag ? (
				(() => {
					const Tag = tag;
					return <Tag {...blockProps}>{ innerBlocksProps.children }</Tag>;
				})()
			) : (
				innerBlocksProps.children
			)}
    	</>
    );
}