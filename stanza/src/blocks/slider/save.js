import { useBlockProps, useInnerBlocksProps, InnerBlocks } from '@wordpress/block-editor';

export default function save({ attributes, clientId }) {
	const { backgroundColor, iconSet, parentId, sliderSettings } = attributes;

	const blockProps = useBlockProps.save({
		className: [
			'wp-block',
			! parentId && backgroundColor ? `has-${backgroundColor}-background-color has-background-color` : ''
		].filter(Boolean).join(' '),
	});

	const innerBlocksProps = useInnerBlocksProps.save(blockProps);	

	// filtermetoclass workaround to achive both desired markup and layout classes
	return (
		<div { ...innerBlocksProps }>
			<div filtermetoclass="swiper swiper-container">
				<div filtermetoclass="swiper-wrapper" id={sliderSettings.id} data-slider={ JSON.stringify(sliderSettings) }>
					{ innerBlocksProps.children }
				</div>

				{ sliderSettings?.navigation !== false &&
				<>
				<div className="swiper-navigation">
					{ attributes?.iconSet?.prev && attributes?.iconSet?.next ? (
					<>
					<button
						className="swiper-button-prev"
						dangerouslySetInnerHTML={{ __html: attributes.iconSet.prev }}
					/>
					<button
						className="swiper-button-next"
						dangerouslySetInnerHTML={{ __html: attributes.iconSet.next }}
					/>
					</>
					) : (
					<>
					<button className="swiper-button-prev"></button>
        			<button className="swiper-button-next"></button>
        			</>
					)}
				</div>

				<div className="swiper-pagination"></div>
				</>						
				}
			</div>
		</div>
	);
}