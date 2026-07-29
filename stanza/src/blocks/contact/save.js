
import { useInnerBlocksProps, useBlockProps } from '@wordpress/block-editor';

export default function save({ attributes }) {
	const { backgroundColor, layout } = attributes;

	const blockProps = useBlockProps.save({
		className: [
			'wp-block',
			'has-google-map-on-the-right',
			backgroundColor ? `has-${backgroundColor}-background-color has-background-color` : ''
		].filter(Boolean).join(' ')
	});
	
	const innerBlocksProps = useInnerBlocksProps.save(
		layout ? {} : blockProps,
		{ layout: layout }
	);

	return (
		<div { ...blockProps }>
			<div>{innerBlocksProps.children}</div>
		</div>
    );
}