
import { useInnerBlocksProps, useBlockProps } from '@wordpress/block-editor';

export default function save({ attributes }) {
	const { backgroundColor, googleMapOptions, layout, markers, parentId } = attributes;

	const blockProps = useBlockProps.save({
		className: [
			backgroundColor ? `has-${backgroundColor}-background-color has-background-color` : ''
		].filter(Boolean).join(' ')
	});

	const innerBlocksProps = useInnerBlocksProps.save(
		layout ? { className: 'wp-block-stanza-free-text__inner' } : blockProps,
		{ layout: layout }
	);

	// Data for frontend JS to initialize the map
	const mapData = {
		googleMapOptions: googleMapOptions,
		markers: markers
	};

	const mapProps = {
		className: 'wp-block-stanza-google-map__wrap',
		id: `map-${googleMapOptions.mapId}`,
		'data-google-map': JSON.stringify(mapData),
	};

	return (
		<>
			{ ! parentId ? (
    			<div { ...blockProps }>
    				<div {...innerBlocksProps}>
    					<div { ...mapProps } />
    				</div>
    			</div>
			) : (
				<div { ...blockProps }>
					<div { ...mapProps } />
				</div>
			)} 
		</>
    );
}