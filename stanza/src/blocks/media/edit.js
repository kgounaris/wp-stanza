
import { useBlockProps } from '@wordpress/block-editor';
import { BlockControls, InspectorControls } from '@wordpress/block-editor';

import { StanzaPanelColorSettings } from '../components';
import StanzaMediaEdit from './components/edit';
import MediaBlockControls from './components/blockControls';
import MediaInspectorControlsSettings from './components/inspectorControls';

export default function Edit({ attributes, setAttributes, context, clientId, isSelected }) {
	const { mediaBackgroundColor } = attributes;
	// blockProps.ClassName will be updated inside StanzaMediaEdit
	let blockProps = useBlockProps();	

	return (
		<>
			<BlockControls group="other">
				<MediaBlockControls
					{...{ attributes, setAttributes, isSelected }}
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
		            palette={window?.Stanza?.blocks['stanza/media']?.attributes?.mediaBackgroundColor?.options}
		            title="Media Background color"
		        />
			</InspectorControls>

			<StanzaMediaEdit
				blockProps={ blockProps }
				{...{ attributes, setAttributes, clientId, context }}
			/>
		</>
	);
}