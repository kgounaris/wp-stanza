
import { useInnerBlocksProps, useBlockProps } from '@wordpress/block-editor';

export default function save({ attributes }) {
	const { backgroundColor, layout, parentId } = attributes;

	const blockProps = useBlockProps.save({
		className: [
			'wp-block',
			'is-layout-flow',
			backgroundColor && ! parentId ? `has-${backgroundColor}-background-color has-background-color` : ''
		].filter(Boolean).join(' ')
	});
	
	const innerBlocksProps = useInnerBlocksProps.save(blockProps);

	return (
		<>
			{ ! parentId ? (
			<div { ...innerBlocksProps }><div filtermetoclass="is-layout-flow">{innerBlocksProps.children}</div></div>
			) : (
			<div { ...blockProps }>{innerBlocksProps.children}</div>
			)}
		</>
    );
}