import { useBlockProps, useInnerBlocksProps, InnerBlocks } from '@wordpress/block-editor';

export default function save({ attributes }) {
	const { parentId, useBlockWrapper, useInnerBlocksWrapper } = attributes;

	const blockProps = useBlockProps.save();
	const innerBlocksProps = useInnerBlocksProps.save(blockProps);

	return (
		useBlockWrapper ?

		<div {...innerBlocksProps} >
		{ // Add wp-block-stanza-free-archive__inner wrapper only if it does NOT have a parent block
		((! parentId && (useInnerBlocksWrapper ?? true)) || (parentId && (useInnerBlocksWrapper ?? false))) ? (
		    <div className="wp-block-stanza-archive__inner">
		    	{ innerBlocksProps.children }
		    </div>
		) : (
		    <>{ innerBlocksProps.children }</>
		)}			
		</div> :

		<>{ innerBlocksProps.children }</>		
	);
}