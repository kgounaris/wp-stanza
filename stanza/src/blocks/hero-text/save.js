
import { useInnerBlocksProps, useBlockProps } from '@wordpress/block-editor';

export default function save({ attributes }) {
	const { backgroundColor, layout, parentId, useInnerBlocksWrapper } = attributes;

	const blockProps = useBlockProps.save({
		className: [
			'wp-block',
			backgroundColor && ! parentId ? `has-${backgroundColor}-background-color has-background-color` : ''
		].filter(Boolean).join(' ')
	});
	const innerBlocksProps = useInnerBlocksProps.save(
		{ className: 'wp-block-stanza-hero-text__inner' },
		{ layout: layout }
	);

	return (
		<>
			{ ((! parentId && (useInnerBlocksWrapper ?? true)) || (parentId && (useInnerBlocksWrapper ?? false))) ? (
			<div { ...blockProps }><div {...innerBlocksProps} /></div>
			) : (
			<div { ...blockProps }>{innerBlocksProps.children}</div>
			)}
		</>
    );
}