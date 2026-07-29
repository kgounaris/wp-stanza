import { useInnerBlocksProps, useBlockProps, BlockControls, InspectorControls } from '@wordpress/block-editor';

import { StanzaPanelColorSettings } from '../components';
import { setAlignLayoutBackground } from '../helpers';
import StanzaMediaEdit from '../media/components/edit';
import MediaBlockControls from '../media/components/blockControls';
import MediaInspectorControlsSettings from '../media/components/inspectorControls';

const TEMPLATE = [['stanza/hero-text']];

export default function Edit({ attributes, setAttributes, clientId }) {
	const { align, backgroundColor, layout, mediaBackgroundColor, parentId, template } = attributes;

	// Set align layout and default background
	setAlignLayoutBackground('stanza/hero-media', clientId, setAttributes, backgroundColor, align, layout, parentId);

	const blockProps = useBlockProps({
		className: [
			'wp-block',
			//backgroundColor ? `has-${backgroundColor}-background-color has-background-color` : ''
		].filter(Boolean).join(' ')
	});
	
	const innerBlocksProps = useInnerBlocksProps(blockProps, {
		template: template || TEMPLATE,
		templateLock: 'all'      
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
			/>
		</InspectorControls>

		<InspectorControls group="styles">
			<StanzaPanelColorSettings
		        setAttributes={ setAttributes }
		        attributeKey="mediaBackgroundColor"
		        colorAttribute={ mediaBackgroundColor }
		        palette={window?.Stanza?.blocks['stanza/media-text']?.attributes?.mediaBackgroundColor?.options}
		        title="Media Background color"
		    />
		</InspectorControls>

		<div {...innerBlocksProps}>
			<>		    		
		        <StanzaMediaEdit
					blockProps={{ className: 'wp-block-stanza-media' }}
					{...{ attributes, setAttributes, clientId }}
				/>
				
				<div className="is-layout-flow">{innerBlocksProps.children}</div>
			</>
		</div>	
	</>
	);
}