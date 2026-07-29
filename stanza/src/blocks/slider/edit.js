import { __ } from '@wordpress/i18n';
import { useBlockProps, useInnerBlocksProps, InnerBlocks, BlockControls, InspectorControls, store as blockEditorStore } from '@wordpress/block-editor';
import { PanelBody, SelectControl, button } from '@wordpress/components';
import { useEffect, useRef, useMemo } from '@wordpress/element';
import { useSelect, useDispatch } from '@wordpress/data';

import { StanzaPanelColorSettings, StanzaAttrsPanelBody } from '../components';
import { setAlignLayoutBackground } from '../helpers';

import Swiper from 'swiper';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
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
  
	// Set slider id
	useEffect(() => {
		if ( ! sliderSettings?.id ) {
			setAttributes( {
				sliderSettings: {
					...sliderSettings,
					id: `slider-${ clientId.slice( 0, 8 ) }`,
				},
			} );
		}
	}, [ clientId, sliderSettings, setAttributes ] );

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
	// Only for stanza/media at the time.
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
			modules: [Navigation, Pagination, Autoplay, EffectFade],
			wrapperClass: 'swiper-wrapper',
			effect: sliderSettings?.effect ?? 'slide',
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
			pagination: sliderSettings?.pagination || false,
			allowTouchMove: sliderSettings?.allowTouchMove ?? true,
			breakpoints: sliderSettings?.breakpoints || {}
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
	// Keep attributes consistency ////////////////////////////////////////////////////

	return (
		<>
			<InspectorControls>
				<StanzaAttrsPanelBody
					attributes={ attributes }
					setAttributes={ setAttributes }
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

					{ sliderSettings?.navigation !== false &&
					<>
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
					</>						
					}
				</div>

				{/* Appender rendered OUTSIDE Swiper so it's not a slide */}
				<InnerBlocks.ButtonBlockAppender rootClientId={ clientId } />
			</div>
		</>
	);
}