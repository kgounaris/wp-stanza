
import { useInnerBlocksProps, useBlockProps } from '@wordpress/block-editor';

export default function save({ attributes }) {
	const { backgroundColor, layout, parentId, tagName, useInnerBlockWrapper } = attributes;

	const blockProps = useBlockProps.save({
		className: [
			'wp-block',
			backgroundColor && ! parentId ? `has-${backgroundColor}-background-color has-background-color` : ''
		].filter(Boolean).join(' ')
	});

	const innerBlocksProps = useInnerBlocksProps.save({ className: 'wp-block-stanza-group__inner' });

	const TagName = tagName || 'div';

	return (
		<>
			{ ((! parentId && (useInnerBlockWrapper ?? true)) || (parentId && (useInnerBlockWrapper ?? false))) ? (
			<TagName { ...blockProps }><div {...innerBlocksProps} /></TagName>
			) : (
			<TagName { ...blockProps }>{innerBlocksProps.children}</TagName>
			)}
		</>
    );
}