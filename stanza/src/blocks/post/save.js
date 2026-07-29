
import { useInnerBlocksProps, useBlockProps } from '@wordpress/block-editor';

import StanzaMediaSave from '../media/components/save';

export default function save({ attributes }) {
	const { backgroundColor, layout } = attributes;

	const blockProps = useBlockProps.save({
		className: [
			'wp-block',
			backgroundColor ? `has-${backgroundColor}-background-color has-background-color` : ''
		].filter(Boolean).join(' ')
	});
	
	const innerBlocksProps = useInnerBlocksProps.save(
		layout ? {} : blockProps,
		{ layout: layout }
	);

	return (
	    <div {...innerBlocksProps}>
	    	<div>
	       		<StanzaMediaSave
					blockProps={{ className: 'wp-block-stanza-media' }}
					{...{ attributes }}
				/>

			    <div>{innerBlocksProps.children}</div>			    
	      </div>
	    </div>
    );
}