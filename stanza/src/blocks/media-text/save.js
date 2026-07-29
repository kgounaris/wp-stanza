
import { useInnerBlocksProps, InnerBlocks, useBlockProps } from '@wordpress/block-editor';

import StanzaMediaSave from '../media/components/save';

export default function save({ attributes }) {
	const { backgroundColor, blockPropsOverwrite, mediaAlign, mediaPosition, parentId, useInnerBlockWrapper } = attributes;

	const blockProps = useBlockProps.save({
		className: [
			'wp-block',
			backgroundColor ? `has-${backgroundColor}-background-color has-background-color` : '',
			mediaPosition ? `has-media-on-the-${mediaPosition}` : '',
			mediaAlign ? `has-media-align-on-the-${mediaAlign}` : ''
		].filter(Boolean).join(' ')
	});
	const innerBlocksProps = useInnerBlocksProps.save(blockProps);	

	return (
		<>
		{
		// Add wp-block-stanza-media-text__inner wrapper only if it does NOT have a parent block
		((! parentId && (useInnerBlockWrapper ?? true)) || (parentId && (useInnerBlockWrapper ?? false))) ? (
		<div {...innerBlocksProps}>
	    	<div>		    		
		       <StanzaMediaSave
					blockProps={{ className: 'wp-block-stanza-media' }}
					{...{ attributes }}
				/>
				
	    		{/*<div className="is-layout-flow">{innerBlocksProps.children}</div>*/}
	    		{innerBlocksProps.children}
			</div>
	    </div>
		) : (
	    <div { ...(Object.entries(blockPropsOverwrite).length ? blockPropsOverwrite : blockProps) }>
	        <StanzaMediaSave
				blockProps={{ className: 'wp-block-stanza-media' }}
				{...{ attributes }}
			/>
			
    		{/*<div className="is-layout-flow">{innerBlocksProps.children}</div>*/}
    		{innerBlocksProps.children}
	    </div>
		)}
		</>
	);
}