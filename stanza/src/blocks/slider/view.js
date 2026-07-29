// src/blocks/gallery/view.js
import Swiper from 'swiper';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// global registry
window.stanzaSwipers = window.stanzaSwipers || new Map(); // TODO: Stanza front-end object

document.addEventListener('DOMContentLoaded', () => {
	document
		.querySelectorAll('.wp-block-stanza-slider .swiper-container')
		.forEach((container) => {
			if (container._swiperInstance) {
				container._swiperInstance.destroy(true, true);
			}

			const slides = container.querySelector('.swiper-wrapper')?.children;
			if (!slides) return;

			// Parse settings
			const rawSettings = container.querySelector('.swiper-wrapper').dataset.slider;
			let settings = {};
	        try {
	            settings = JSON.parse(rawSettings);
	        } catch (e) {
	            console.error('Invalid slider settings JSON:', e);
	        }

	        console.log(settings);

			// The same as
			// slider\edit.js
			const swiper = new Swiper(container, {
				modules: [Navigation, Pagination, Autoplay, EffectFade],
				effect: settings?.effect ?? 'slide',
				wrapperClass: 'swiper-wrapper',
				direction: settings?.direction ?? "horizontal",
				slidesPerView: settings?.slidesPerView,
				centeredSlides: settings?.centeredSlides,
				initialSlide: settings?.initialSlide,
				spaceBetween: settings?.spaceBetween,
				slideClass: settings?.slideClass || 'swiper-slide',
				autoplay: settings?.autoplay,
				navigation: settings?.navigation !== false ? {
					nextEl: container.querySelector('.swiper-button-next'),
					prevEl: container.querySelector('.swiper-button-prev'),
					addIcons: false
				} : false,
				pagination: settings?.pagination || false,
				allowTouchMove: settings?.allowTouchMove ?? true,
				breakpoints: settings?.breakpoints || {}
			});

			container._swiperInstance = swiper;

			// register globally
			window.stanzaSwipers.set(settings.id, swiper);			
		});
});
