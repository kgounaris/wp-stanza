/*
 * On select media
 * On select url
 * On remove
 * On select poster
 * On remove poster
 * Reset attributes and defaults that are not set on select/replace media
 * Object position style
 * List View item style
 * Get orientation by aspect ratio
*/

import { useEffect } from '@wordpress/element';
import { select, subscribe } from '@wordpress/data';

import { wpData } from '../wp-data';


/**
 * On select media
 * ! SVGs have no width and height properties
 */
export const onSelect = (media, setAttributes, imageSize, mediaAspectRatio, idPredefined = false) => {
	const { entityRecord } = wpData();
	const orientation = media?.height && media?.width ? ( media.height > media.width ? 'portrait' : 'landscape' ) : ''; // TODO: Exists in media.sizes.full (reconsider)
	const figureOrientation = getOrientationByRatio(mediaAspectRatio);
	//console.log(media);
	// TODO: this attributes are same with 
	// see src/blocks/post/edit.js
	
	setAttributes( {
		mediaIdPredefined: idPredefined, // This attribute informs Media Block that has a predefined id
        mediaId: media.id,
        mediaUrl: media.sizes ? (media.sizes[imageSize]?.url || media.sizes[imageSize]?.source_url) || media.url : media.url,
        mediaAlt: media.alt || '',
        mediaType: media.type,
        mediaImageSize: imageSize || window?.Stanza?.blocks?.['stanza/media']?.defaultMediaSize, // TODO: // Full image size always exists
        mediaImageSizes:  media?.sizes || [],
        mediaIsSvg: media?.mime === 'image/svg+xml' || media?.mime_type === 'image/svg+xml',
        mediaOrientation: orientation,
        mediaFigureOrientation: figureOrientation,
        mediaOriginalAspectRatio: media?.height && media?.width && orientation ? ( 'landscape' == orientation ? `${media.width}/${media.height}` : `${media.height}/${media.width}` ) : '',
        mediaOriginalAspectRatioFactor: media?.height && media?.width ? (media.width / media.height) : '',
        mediaThumbnail:
        	'image' == media.type ? ( (media?.sizes?.thumbnail?.url || media?.sizes?.thumbnail?.source_url) || '' ) : (
        	'video' == media.type ? Stanza.bloginfo.STANZA_URL + '/assets/img/video.svg' : ''	)
    } );
}

/**
 * On select url
 */
export const onSelectURL = (url, setAttributes) => {
	setAttributes( {
		mediaId: 0,
        mediaUrl: url,
        mediaAlt: '',
        mediaType: '',
        mediaIsSvg: false,
        mediaOrientation: '',
        mediaFigureOrientation: '',
        mediaOriginalAspectRatioFactor: '',
        mediaThumbnail: ''
	} );
};   

/**
 * On remove
 */
export const onRemove = (setAttributes) => {
	setAttributes( {
		mediaId: 0,
        mediaUrl: '',
        mediaAlt: '',
        mediaType: '',
        mediaIsSvg: false,
        mediaOrientation: '',
        mediaFigureOrientation: '',
        mediaOriginalAspectRatioFactor: '',
        mediaThumbnail: ''
	} );
};   

/**
 * On select poster
 */
export const onSelectPoster = (media, videoSettings, setAttributes) => {
    setAttributes({
    	mediaVideoSettings: {
	    	...videoSettings,
	    	poster: {
		    	mediaId: media.id,
		    	mediaUrl: media.url
	    	}    		
    	}
    });
};

/**
 * On remove poster
 */
export const onRemovePoster = (videoSettings, setAttributes) => {
    setAttributes({
    	mediaVideoSettings: {
	    	...videoSettings,
	    	poster: {
		    	mediaId: 0,
		    	mediaUrl: ''
	    	}    		
    	}
    });
};

/**
 * Reset attributes and defaults that are not set on select/replace media
 * If is an uploaded media, external url, or svg
 * //user attributes: aspectRatio, backgroundColor, mediaImageSize, position, svgWidth, videoSettings
 * //attributes with defaults mediaImageSize, position, svgWidth, videoSettings
 */
export const resetAttrsAndDefaults = (id, url, mediaIsSvg, setAttributes) => {
	// External image
	if ( ! id && url ) {
		setAttributes({
			//mediaImageSize: '',
			mediaInlineSvg: false,
			//position: undefined,
			mediaThumbnail: ''
		});
	} else {
		// SVG image
		if ( mediaIsSvg ) {
			setAttributes({
				//mediaImageSize: '',
				//mediaInlineSvg: false,
				//position: undefined,
				//svgWidth: 100, // Default value
				mediaThumbnail: ''
			});
		} else {
			setAttributes({
				//mediaImageSize: 'full', // Default value
				mediaInlineSvg: false,
				//position: 50, // Default value
				//svgWidth: undefined
			});
		}
	}
};

/**
 * Object position style
 */
export const mediaItemPositionStyle = (position, orientation, aspectRatio, originalAspectRatioFactor) => {
    let addVerticalPosition = false;

    if ('' !== aspectRatio) {
        if ('portrait' == orientation) {
            addVerticalPosition = true;
            try {
                if ( originalAspectRatioFactor > eval(aspectRatio) ) {
                    addVerticalPosition = false;
                }
            } catch {}
        } else if ('landscape' == orientation) {
            addVerticalPosition = false;
            try {
                if ( originalAspectRatioFactor < eval(aspectRatio) ) {
                    addVerticalPosition = true;
                }
            } catch {}
        }
    } else {
        if ('portrait' == orientation) {
            addVerticalPosition = true;
        }
    }

    return (
    	position >= 0 && position !== 50
        ? { objectPosition: `${addVerticalPosition ? '50% ' : ''}${position}%${ ! addVerticalPosition ? ' 50%' : ''}` }
        : {}
    )
}

/**
 * List View item style
 */
export const useStyleListViewItem = (clientId, apply) => {
	useEffect(() => {
		let raf = 0;

		const run = () => {
			cancelAnimationFrame(raf);
			raf = requestAnimationFrame(() => {
				const el = document.querySelector( `[data-block="${ clientId }"] .block-editor-list-view-block-select-button` );
				if (el) apply(el);
			});
		};

		// 1) Re-run on editor state changes (insert, move, select, etc.)
		const un = subscribe(() => {
			// Only when List View is open (works in post & site editors)
			const isOpen =
				select('core/editor')?.isListViewOpened?.() ||
				select('core/edit-site')?.isListViewOpened?.();
			if (!isOpen) return;
			run();
		});

		// 2) Re-run when the List View DOM mutates (rows get re-rendered)
		const root =
			document.querySelector('.block-editor-list-view') ||
			document.querySelector('.block-editor-list-view__container');
		const mo = root
			? new MutationObserver(run)
			: null;

		if (mo && root) {
			mo.observe(root, { childList: true, subtree: true });
		}

		// Initial pass (in case List View is already open)
		run();

		return () => {
			un?.();
			mo?.disconnect();
			cancelAnimationFrame(raf);
		};
	}, [clientId, apply]);
}

/**
 * Get orientation by aspect ratio
 */
export const getOrientationByRatio = (ratio) => {
	if (!ratio) return '';
    const [w, h] = ratio.split('/').map(Number);

    if (!w || !h) return '';

    if (w / h > 1) return 'landscape';
    if (w / h < 1) return 'portrait';
    return 'square';
};