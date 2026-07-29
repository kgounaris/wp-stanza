
import { useInnerBlocksProps, useBlockProps } from '@wordpress/block-editor';

export default function save({ attributes }) {
	const { backgroundColor, parentId } = attributes;

	const blockProps = useBlockProps.save({
		className: [
			'wp-block',
			backgroundColor && ! parentId ? `has-${backgroundColor}-background-color has-background-color` : '',
			'is-layout-flow'
		].filter(Boolean).join(' ')
	});

	const innerBlocksProps = useInnerBlocksProps.save();

	return (
    	<div { ...blockProps }>{innerBlocksProps.children}</div>
    );
}