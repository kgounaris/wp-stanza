
import { useInnerBlocksProps, useBlockProps } from '@wordpress/block-editor';

export default function save({ attributes }) {
	const { backgroundColor, columns, galleryMediaAspectRatio, layout, parentId, useInnerBlocksWrapper, useBlockWrapper } = attributes;

	const blockProps = useBlockProps.save({
		className: [
			'wp-block',
			backgroundColor && ! parentId ? `has-${backgroundColor}-background-color has-background-color` : '',
			galleryMediaAspectRatio ? `has-${galleryMediaAspectRatio}-media-aspect-ratio` : 'has-unset-media-aspect-ratio',
			columns ? `has-${columns}-columns` : ''
		].filter(Boolean).join(' ')
	});
	const innerBlocksProps = useInnerBlocksProps.save(
		{ className: 'wp-block-stanza-gallery__inner' }
	);

	return (
		<>
			{
			((! parentId && (useInnerBlocksWrapper ?? true)) || (parentId && (useInnerBlocksWrapper ?? false))) ? (
			<div { ...blockProps }><div {...innerBlocksProps} /></div>
			) : (
				useBlockWrapper ? (
					<div { ...blockProps }>{innerBlocksProps.children}</div>
				) : (<>{innerBlocksProps.children}</>)
			)}
		</>
    );
}