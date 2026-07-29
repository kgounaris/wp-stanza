
import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';

export default function save({ attributes }) {
	const { backgroundColor, parentId } = attributes;

	const blockProps = useBlockProps.save({
		className: [
			'wp-block',
			backgroundColor && ! parentId ? `has-${backgroundColor}-background-color has-background-color` : ''
		].filter(Boolean).join(' '),
	});

	const innerBlocksProps = useInnerBlocksProps.save(blockProps);

	return (
		<div { ...innerBlocksProps }>
			{ innerBlocksProps.children }
		</div>
    );
}
