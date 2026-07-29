
import { useBlockProps } from '@wordpress/block-editor';

import StanzaMediaSave from './components/save';

export default function save( { attributes } ) {
	// blockProps.ClassName will be updated inside StanzaMediaEdit
	let blockProps = useBlockProps.save();

	return (
		<StanzaMediaSave
			blockProps={ blockProps }
			{...{ attributes }}
		/>
	);
}