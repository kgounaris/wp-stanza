import { useInnerBlocksProps, useBlockProps } from '@wordpress/block-editor';

import StanzaMediaSave from '../media/components/save';

export default function save({ attributes }) {
	const { backgroundColor, mediaAlign, mediaPosition } = attributes;

	const blockProps = useBlockProps.save({
		className: [
			'wp-block',
			//backgroundColor ? `has-${backgroundColor}-background-color has-background-color` : ''
		].filter(Boolean).join(' ')
	});

	const innerBlocksProps = useInnerBlocksProps.save(blockProps);	

	return (
	    <div {...innerBlocksProps}>
	    	<>			    
	       		<StanzaMediaSave
					blockProps={{ className: 'wp-block-stanza-media' }}
					{...{ attributes }}
				/>
				
			    <div filtermetoclass="is-layout-flow">{innerBlocksProps.children}</div>
	      </>
	    </div>
	);
}