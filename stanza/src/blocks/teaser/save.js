
import { useInnerBlocksProps, useBlockProps } from '@wordpress/block-editor';

export default function save({ attributes }) {
	const { backgroundColor, columns, layout, parentId, useBlockWrapper, useInnerBlockWrapper } = attributes;

	const blockProps = useBlockProps.save({
		className: [
			'wp-block',
			backgroundColor && ! parentId ? `has-${backgroundColor}-background-color has-background-color` : '',
			columns ? `has-${columns}-columns` : ''
		].filter(Boolean).join(' ')
	});

	const innerBlocksProps = useInnerBlocksProps.save(blockProps);

	return (
		<>
			{ useBlockWrapper ?

			((! parentId && (useInnerBlockWrapper ?? true)) || (parentId && (useInnerBlockWrapper ?? false))) ? (
			<div { ...innerBlocksProps }><div>{innerBlocksProps.children}</div></div>
			) : (
			<div { ...blockProps }>{innerBlocksProps.children}</div>
			) :

			<>{ innerBlocksProps.children }</>

			}
		</>
    );
}