// src/blocks/gallery/view.js
// import Swiper from 'swiper';
// import { Navigation, Pagination } from 'swiper/modules';
// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';

document.addEventListener('DOMContentLoaded', () => {
	createAccordion('.wp-block-stanza-accordion .wp-block-post-title', '.wp-block-stanza-accordion .wp-block-post-excerpt');
	//createAccordion('.wp-block-stanza-accordion .entry-header', '.wp-block-stanza-accordion .entry-content');
});

function createAccordion(titleSelector, contentSelector, singleOpen = true) {
    const titles = document.querySelectorAll(titleSelector);

    titles.forEach(title => {
        const content = title.parentElement.querySelector(contentSelector);        
        if (!content) return;

        const style = window.getComputedStyle(content);
        const paddingBottomValue = parseFloat(style.paddingBottom);        
        const paddingTopValue = parseFloat(style.paddingTop);        

        content.style.maxHeight = "0";
        content.style.paddingBottom = "0";
        content.style.paddingTop = "0";
        content.style.overflow = "hidden";
        content.style.transition = "max-height 0.3s ease, padding 0.3s ease";


        title.addEventListener('click', (e) => {
        	e.preventDefault();
            const isOpen = content.style.maxHeight !== "0px";

            titles.forEach(title => {
                title.classList.remove('is-open');
                title.parentElement.classList.remove('has-expanded-accordion');
                title.parentElement.querySelector(contentSelector).style.overflow = "hidden";
            });

            if (singleOpen) {
                // close all others
                document.querySelectorAll(contentSelector).forEach(c => {
                    if (c !== content) {
                        c.style.maxHeight = "0";
                        c.style.paddingBottom = "0";
                        c.style.paddingTop = "0";
                    };
                });
            }

            content.style.maxHeight = isOpen ? "0" : content.scrollHeight + "px";
            content.style.paddingBottom = isOpen ? "0" : paddingBottomValue + "px";
            content.style.paddingTop = isOpen ? "0" : paddingTopValue + "px";

            if (isOpen) {
                title.classList.remove('is-open');
                title.parentElement.classList.remove('has-expanded-accordion');
                content.style.overflow = "hidden";                
            } else {
                title.classList.add('is-open');
                title.parentElement.classList.add('has-expanded-accordion');
                setTimeout(function(){
                    content.style.overflow = "visible";
                }, 300);
            }
        });
    });
}