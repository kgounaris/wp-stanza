{
  "apiVersion": 3,
  "name": "stanza/slider",
  "title": "Slider",
  "category": "media",
  "icon": "slides",
  "description": "Display multiple Media in a rich slider.",
  "attributes": {
    "align": {
      "type": "string"
    },    
    "backgroundColor": {
      "type": "string"
    },
    "iconSet": {
      "type": "object",
      "default": {
        "prev":"<svg xmlns='http://www.w3.org/2000/svg' version='1.1' viewBox='0 0 66 48'><path d='M14.1,27.8l20.3,20.2h-10.4L0,24,24,0h10.4S14.1,20.2,14.1,20.2h51.9v7.6H14.1Z'/></svg>",
        "next":"<svg xmlns='http://www.w3.org/2000/svg' version='1.1' viewBox='0 0 66 48'><path d='M51.9,20.2L31.6,0h10.4l24,24-24,24h-10.4s20.3-20.2,20.3-20.2H0v-7.6h51.9Z'/></svg>"
      }
    },
    "parentId": {
      "type": "string"
    },
    "sliderOptions": {
      "type": "object",
      "default": {}
    },
    "sliderSettings": {
      "type": "object",
      "default": {
        "slidesPerView": "auto",
        "centeredSlides": false,
        "initialSlide": 0,
        "spaceBetween": 0,
        "slideClass": "wp-block-stanza-media",
        "navigation": true
      }
    },
    "template": {
      "type": "array"
    }
  },
  "supports": {
    "align": true,
    "anchor": true,
    "layout": {
      "allowCustomContentAndWideSize": false,
      "default": { "type": "default", "justifyContent": "center" }
    }
  },  
  "editorScript": [ "file:./index.js" ],
  "viewScript": [ "file:./view.js" ],
  "editorStyle": [ "file:./index.css" ],
  "style": [ "file:./style-index.css" ]
}









import { registerBlockType } from '@wordpress/blocks';
import metadata from './block.json';
import Edit from './edit';
import save from './save';

import { supportsByOptions, defaultsByOptions, setBlockOptionsAttribute, registerBlockVariations, registerBlockStyles } from '../helpers';

// Swiper imports for EDITOR (live preview)
import Swiper, { Navigation, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import './style.scss';
import './editor.scss';

// Overwrite supports using stanza.json options
metadata = supportsByOptions('stanza/slider', metadata);

// Overwrite attributes defaults using stanza.json options
metadata = defaultsByOptions('stanza/slider', metadata);

// Set options using stanza.json options
metadata = setBlockOptionsAttribute('stanza/slider', metadata, 'sliderOptions');

registerBlockType(metadata.name, {
	...metadata,
	edit: ( props ) => <Edit { ...props } SwiperLib={ Swiper } />,
	save
});

// Register styles using stanza.json options
registerBlockStyles('stanza/slider');

// Register variations using stanza.json options
registerBlockVariations('stanza/slider');
















import { __ } from '@wordpress/i18n';
import { useBlockProps, useInnerBlocksProps, InnerBlocks, BlockControls, InspectorControls, store as blockEditorStore } from '@wordpress/block-editor';
import { PanelBody, SelectControl, button } from '@wordpress/components';
import { useEffect, useRef, useMemo } from '@wordpress/element';
import { useSelect, useDispatch } from '@wordpress/data';

import { StanzaPanelColorSettings, StanzaAttrsPanelBody } from '../components';
import { setAlignLayoutBackground } from '../helpers';

import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
// If you want Swiper styles also in editor, import them here or in index.js:
//import 'swiper/css';
//import 'swiper/css/navigation';
//import 'swiper/css/pagination';

export default function Edit({ attributes, setAttributes, clientId }) {
	const { align, backgroundColor, iconSet, layout, template, parentId, sliderSettings } = attributes;
	const containerRef = useRef();
	const prevRef = useRef(null);
	const nextRef = useRef(null);
	const allowedBlocks = template?.map((key) => key[0]);

	const TEMPLATE = [
		["stanza/media",
        {
          "mediaAspectRatio": "",
          "mediaImageSize": "full",
          "mediaOptions": {
            "mediaImageSize": [
              "full"
            ]
          }
        }
      ]
	]
  

	// Set default template
	useEffect(() => {
		if ( ! template?.length ) {
			setAttributes({template: TEMPLATE})
		}
	}, [template]);

	// Set align layout and default background
	setAlignLayoutBackground('stanza/slider', clientId, setAttributes, backgroundColor, align, layout, parentId);
	
	const blockProps = useBlockProps({
		className: [
			'wp-block',
			! parentId && backgroundColor ? `has-${backgroundColor}-background-color has-background-color` : ''
		].filter(Boolean).join(' '),
	});
	
	const innerBlocksProps = useInnerBlocksProps(
		blockProps,
		{
			allowedBlocks: allowedBlocks,
			template: template,
			//templateInsertUpdatesSelection: true,
			renderAppender: () => false // this completely removes the block-list-appender element
		}
	);

	// Keep attributes consistency ////////////////////////////////////////////////////
	// Every time new inner block is added (except the first one), does not keep template attributes.
	// So every time we have to fix them
	const { updateBlockAttributes } = useDispatch(blockEditorStore);
	// Always current inner blocks
  const innerBlocks = useSelect(
    (select) => select(blockEditorStore).getBlocks(clientId),
    [clientId]
  );

  // Just ids, stable comparison
  const innerIds = useMemo(
    () => (innerBlocks || []).map((b) => b.clientId),
    [innerBlocks]
  );

  const prevIdsRef = useRef(innerIds);

  // Define ONE place that sets inner block attrs how you want
  const syncInnerBlocks = () => {
    if (!innerBlocks?.length) return;

    innerBlocks.forEach((block, index) => {
      // If you only want to touch specific block types:
      if (block.name !== 'stanza/media') return;

      const templateAttrs = template?.[0]?.[1];
      updateBlockAttributes(block.clientId, templateAttrs);
    });
  };
	
	useEffect(() => {
		if (!containerRef.current) return;

		// destroy previous instance
		if (containerRef.current._swiperInstance) {
			containerRef.current._swiperInstance.destroy(true, true);
		}

		const slides = containerRef.current.querySelector('.swiper-wrapper')?.children;
		if (!slides) return;

		// The same as
		// slider\view.js
		const swiper = new Swiper(containerRef.current, {
			modules: [Navigation, Pagination],
			wrapperClass: 'swiper-wrapper',
			slidesPerView: sliderSettings?.slidesPerView,
			centeredSlides: sliderSettings?.centeredSlides,
			initialSlide: sliderSettings?.initialSlide,
			spaceBetween: sliderSettings?.spaceBetween,
			//slideClass: [...slides[0].classList].find(c => c.startsWith('wp-block-')) || 'swiper-slide',
			slideClass: sliderSettings?.slideClass || 'swiper-slide',
			pagination: sliderSettings?.pagination,
			navigation: sliderSettings?.navigation !== false ? {
				nextEl: containerRef.current.querySelector('.swiper-button-next'),
				prevEl: containerRef.current.querySelector('.swiper-button-prev'),
				addIcons: false
			} : false,
			pagination: sliderSettings?.pagination || false
		});

		containerRef.current._swiperInstance = swiper;
	}, [sliderSettings, innerIds]);

  useEffect(() => {
    const prevIds = prevIdsRef.current;

    const added = innerIds.length > prevIds.length;
    // Optional: also treat reorder as a sync trigger:
    // const changed = innerIds.join(',') !== prevIds.join(',');

    if (added) {
      syncInnerBlocks();
    }

    prevIdsRef.current = innerIds;
  }, [innerIds, innerBlocks]); // eslint-disable-line react-hooks/exhaustive-deps
	////////////////////////////////////////////////////////////////////////////////////

	return (
		<>
			<InspectorControls>
				<StanzaAttrsPanelBody
					attributes={ attributes }
				/>
			</InspectorControls>

			{ ! parentId && (
			<InspectorControls group="styles">
				<StanzaPanelColorSettings
					setAttributes={ setAttributes }
					colorAttribute={ backgroundColor }
					palette={ window?.Stanza?.blocks['stanza/slider']?.attributes?.backgroundColor?.options }
				/>
			</InspectorControls>
			)}			

			<div { ...innerBlocksProps }>
				<div className="swiper swiper-container" ref={containerRef}>
					<div className="swiper-wrapper">
						{ innerBlocksProps.children }
					</div>

					<div className="swiper-navigation">
						{ attributes?.iconSet?.prev && attributes?.iconSet?.next ? (
						<>
						<button
							ref={prevRef}
							className="swiper-button-prev"
							dangerouslySetInnerHTML={{ __html: attributes.iconSet.prev }}
						/>
						<button
							ref={nextRef}
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
				</div>

				{/* Appender rendered OUTSIDE Swiper so it's not a slide */}
				<InnerBlocks.ButtonBlockAppender rootClientId={ clientId } />
			</div>
		</>
	);
}











import { useBlockProps, useInnerBlocksProps, InnerBlocks } from '@wordpress/block-editor';

export default function save({ attributes }) {
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
				<div filtermetoclass="swiper-wrapper" data-slider={ JSON.stringify(sliderSettings) }>
					{ innerBlocksProps.children }
				</div>

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
			</div>
		</div>
	);
}