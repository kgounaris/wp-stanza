

import { useInnerBlocksProps, useBlockProps } from '@wordpress/block-editor';

export default function save({ attributes }) {
	const { backgroundColor, mediaPosition, useInnerBlockWrapper } = attributes;

	const blockProps = useBlockProps.save({
		className: [
			'wp-block',
			mediaPosition ? `has-media-on-the-${mediaPosition}` : '',
			backgroundColor ? `has-${backgroundColor}-background-color has-background-color` : ''
		].filter(Boolean).join(' ')
	});
	
	const innerBlocksProps = useInnerBlocksProps.save();

	return (
		<>
		{ useInnerBlockWrapper ?? true ? ( // undefined for preexisting blocks without useInnerBlockWrapper
		<div { ...blockProps }><div>{innerBlocksProps.children}</div></div>
		) : (
		<div { ...blockProps }>{innerBlocksProps.children}</div>
		)}
		</>
    );
}