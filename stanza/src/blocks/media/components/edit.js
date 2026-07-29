
import { __ } from '@wordpress/i18n';
import { useEffect, useState, useRef } from '@wordpress/element';
import { useSelect, useDispatch } from '@wordpress/data';
import { media as mediaIcon } from '@wordpress/icons';
import { RichText, MediaPlaceholder, store as blockEditorStore } from '@wordpress/block-editor';
import { Icon } from '@wordpress/components';

import { wpData } from '../../wp-data';
import { useFetchSvg } from '../../utilities';
import { setAlignLayoutBackground } from '../../helpers';

import { onSelect, onSelectURL, useStyleListViewItem, resetAttrsAndDefaults, getOrientationByRatio } from '../helpers';
import StanzaFigureContent from './figure'; // TODO: change to MediaFigureContent

export default function StanzaMediaEdit({ blockProps, attributes = {}, setAttributes, context, clientId }) {	
	const { editPost } = useDispatch( 'core/editor' );
	const {
		align,
		mediaAlt,
		mediaAspectRatio,
		mediaBackgroundColor,
		mediaCaption,
		mediaHasCaption,
		mediaHref,
		mediaHrefIsPredefined,
		mediaId,
		mediaIdPredefined,
		mediaImageSize,
		mediaIsSvg,
		mediaIsFeaturedImage,
		mediaIdMetaKey,
		mediaInlineSvg,
		mediaLinkTarget,
		mediaOrientation,
		mediaFigureOrientation,
		mediaOriginalAspectRatio,
		mediaOriginalAspectRatioFactor,
		mediaType,
		mediaUrl,
		mediaObjectPositionStyle,
		mediaSvgHTML,
		mediaSvgWidth,
		mediaThumbnail,
		mediaVideoSettings = {}
	} = attributes;
	const abortRef = useRef();
	const { entityRecord } = wpData();
	const allowedTypes = ['image', 'video'];

	// Set align layout and default background
	const rootClientId = setAlignLayoutBackground('stanza/media', clientId, setAttributes, undefined, align/*, layout, parentId*/);

    const rootBlockName = useSelect(
	    ( select ) => {
	        if ( ! rootClientId ) return null;
	        return select( blockEditorStore ).getBlockName( rootClientId );
	    },
	    [ rootClientId ]
	);

    // Update blockProps.ClassName
	blockProps = {
    	...blockProps,	
		className: [
			// 'wp-block', there is in block props
			blockProps.className,
			mediaAspectRatio ? `has-${mediaAspectRatio.replace('/','-')}-aspect-ratio` : 'has-unset-aspect-ratio',
			blockProps?.className ?? '',
			mediaBackgroundColor ? `has-${mediaBackgroundColor}-background-color has-background-color` : '',
			mediaOrientation ? `has-${mediaOrientation}-orientation` : '',
			mediaFigureOrientation ? `has-${mediaFigureOrientation}-figure-orientation` : '',
			mediaImageSize ? `size-${mediaImageSize}` : ''
		].filter(Boolean).join(' ')
	}

	// Featured video
	const mediaFromMetaData = useSelect(
		( select ) => {
			if ( ! context?.postId ) return null;
			if ( ! mediaIdMetaKey ) return null;

			const record = select( 'core' ).getEntityRecord(
				'postType',
				context?.postType,
				context.postId
			);

			const mId = record?.meta?.[mediaIdMetaKey] ?? record?.acf?.[mediaIdMetaKey] ?? null;

			const media = select( 'core' ).getMedia( mId );
			const mUrl = media?.source_url ?? null;

			return { mediaId: mId, mediaUrl: mUrl, mediaOrientation: media?.media_details?.height && media?.media_details?.width ? ( media.media_details.height > media.media_details.width ? 'portrait' : 'landscape' ) : '' };
		},
		[ context?.postId ]
	);

	useEffect(() => {
		if (mediaFromMetaData) {
			setAttributes({
				mediaId: mediaFromMetaData.mediaId,
				mediaUrl: mediaFromMetaData.mediaUrl,
				mediaOrientation: mediaFromMetaData.mediaOrientation
			})
		}
	}, [mediaFromMetaData]);

	// Featured image
	const featuredImage = useSelect(
		( select ) => {
			if ( ! context?.postId ) return null;
			if ( ! mediaIsFeaturedImage ) return null;

			const record = select( 'core' ).getEntityRecord(
				'postType',
				context?.postType,
				context.postId
			);
			const imageId = record?.featured_media ?? null;

			const media = select( 'core' ).getMedia( imageId );
			const imageUrl = media?.source_url ?? null;

			return { mediaId: imageId, mediaUrl: imageUrl, mediaOrientation: media?.media_details?.height && media?.media_details?.width ? ( media.media_details.height > media.media_details.width ? 'portrait' : 'landscape' ) : '' };
		},
		[ context?.postId ]
	);

	useEffect(() => {
		if (featuredImage) {
			setAttributes({
				mediaId: featuredImage.mediaId,
				mediaUrl: featuredImage.mediaUrl
			})
		}
	}, [featuredImage]);

	// Predefined media
	const predefinedMedia = useSelect(
		( select ) => {
			if ( ! mediaIdPredefined ) return null;

            const media = select( 'core' ).getMedia( mediaId );
            const mediaUrl = media?.source_url ?? null;

			return { mediaUrl: mediaUrl, mediaOrientation: media?.media_details?.height && media?.media_details?.width ? ( media.media_details.height > media.media_details.width ? 'portrait' : 'landscape' ) : '' };
		},
		[mediaId]
	);	

	useEffect(() => {
		if (mediaIdPredefined && predefinedMedia && ! mediaUrl) {
			setAttributes({ mediaUrl: predefinedMedia.mediaUrl })
		}
	}, [predefinedMedia]);

	// Predefined mediaHref
	const predefinedHref = useSelect(
		( select ) => {
			if ( ! context?.postId ) return null;
			if ( mediaHrefIsPredefined !== 'the_permalink' ) return null;

			const record = select( 'core' ).getEntityRecord(
				'postType',
				context?.postType,
				context.postId
			);
			
			return record?.link
		},
		[ context?.postId ]
	);

	useEffect(() => {
		if (mediaHrefIsPredefined && predefinedHref && ! mediaHref) {
			setAttributes({ mediaHref: predefinedHref });		
		}
	}, [predefinedHref]);

	// Reset irrelevent attributes and defaults that are not set, on select/replace media
	useEffect(() => {
		resetAttrsAndDefaults(mediaId, mediaUrl, mediaIsSvg, setAttributes);
	}, [mediaId]);

    // Current Media's generated sizes (slugs) by Wordpress core
    const mediaExistingSizes = useSelect(
        ( select ) => mediaId ? select('core').getMedia(mediaId)?.media_details?.sizes : [],
        [mediaId]
    );

	// Style List View iten
	useStyleListViewItem(clientId, (el) => {
		el.style.backgroundImage = `url(${mediaThumbnail || mediaUrl})`;
		el.style.backgroundSize = '18px auto';
		el.style.backgroundPosition = `calc(100% - 4px) center`;
		el.style.backgroundRepeat = `no-repeat`;
	});

  	// Initialize aspect ratio
	useEffect(() => {
		if ( ! mediaAspectRatio && mediaOriginalAspectRatio ) {
			setAttributes({mediaAspectRatio: mediaOriginalAspectRatio});
		}
		// Root block is Slider 
		if ( 'stanza/slider' == rootBlockName ) {
			setAttributes({mediaAspectRatio: Stanza?.blocks['stanza/slider']?.template?.default[0][1]?.mediaAspectRatio ?? mediaAspectRatio});
	    }
	}, [mediaId]);

  	// Initialize figure orientation
	useEffect(() => {
		setAttributes({mediaFigureOrientation: getOrientationByRatio(mediaAspectRatio)});		
	}, [mediaAspectRatio]);

  	// Avoid empty mediaAlt
	useEffect(() => {
		if ( (mediaId || mediaUrl) && ! mediaAlt ) {
			setAttributes({mediaAlt: entityRecord?.title + (entityRecord?.description ? ' | ' + entityRecord.description : '')});
		}
	}, [mediaAlt]);

  	// Returns SVG HTML
	useEffect(
	  useFetchSvg(mediaUrl, mediaIsSvg, mediaSvgWidth, setAttributes, mediaSvgHTML, abortRef),
	  [mediaUrl, mediaAlt, mediaId]
	);
	
  	// Updates SVG inline styles
	useEffect(() => {
		setAttributes({mediaSvgHTML: mediaSvgHTML?.replace('<svg', `<svg style="width:${mediaSvgWidth}%;height:auto;"`) || ''});
	}, [mediaSvgWidth]);

	// Avoid "Unset" aspect ratio option for SVG
	// Todo: SVGs have no width and height properties to add a default aspect ratio to figure.
	useEffect(() => {
		if ( mediaIsSvg && mediaInlineSvg && ! mediaAspectRatio ) {
			setAttributes({ mediaAspectRatio: '3/2' })
		}
	}, [mediaId, mediaAspectRatio, mediaInlineSvg]);

	return  mediaHref ?
	(
		/* Upload Media */
		! (mediaId || mediaUrl) && ! mediaIdPredefined ? (

		<figure { ...blockProps }>
			<a>
	            <MediaPlaceholder
	            	icon={ <Icon icon={ mediaIcon } /> }
	               	onSelect={ ( media ) => ( onSelect(media, setAttributes, mediaImageSize, mediaAspectRatio) ) }
	                onSelectURL={ ( media ) => ( onSelectURL(media, setAttributes) ) }           
	                allowedTypes={ allowedTypes }
	                multiple={ false }
	                labels={ { title: __('Media') } }
			     />
		     </a>
		</figure>

		) : (

		 /* Render Media */
		'image' == mediaType && mediaIsSvg && mediaInlineSvg && mediaSvgHTML ? (
		// Inline SVG. Can't have caprton
		<figure { ...blockProps }
	 		dangerouslySetInnerHTML={{ __html: mediaSvgHTML }}
	 	/>

		) : (

		<figure { ...blockProps }>
			<a>
		 		<StanzaFigureContent
					mediaAlt={ mediaAlt }
					mediaAspectRatio={ mediaAspectRatio }
					mediaId={ mediaId }
					mediaInlineSvg={ mediaInlineSvg }
					mediaIsSvg={ mediaIsSvg }
					mediaOrientation={ mediaOrientation }
					mediaFigureOrientation={ mediaFigureOrientation }
					mediaOriginalAspectRatioFactor={ mediaOriginalAspectRatioFactor }
					mediaObjectPositionStyle={ mediaObjectPositionStyle }
					mediaType={ mediaType }
					mediaUrl={ mediaUrl }
					mediaVideoSettings={ mediaVideoSettings }
				/>

				{ mediaHasCaption && (
					<RichText
						tagName="figcaption"
						className="wp-element-caption"
						placeholder={ __( 'Add caption…', 'textdstanzaomain' ) }
						value={ mediaCaption }
						onChange={ ( value ) => setAttributes({ mediaCaption: value }) }
						allowedFormats={ ['core/link'] }
					/>
		        ) }
	     	</a>
		 </figure>

		))
	) :
	
	<>
		{ /* Upload Media */
		! (mediaId || mediaUrl) && ! mediaIdPredefined ? (
		<figure { ...blockProps } >
            <MediaPlaceholder
            	icon={ <Icon icon={ mediaIcon } /> }
               	onSelect={ ( media ) => {
               		onSelect(media, setAttributes, mediaImageSize, mediaAspectRatio);
               		if (mediaIsFeaturedImage) {
	               		editPost( {
							featured_media: media.id,
						});               			
               		}
               	} }
                onSelectURL={ ( media ) => ( onSelectURL(media, setAttributes) ) }           
                allowedTypes={ allowedTypes }
                multiple={ false }
                labels={ { title: __('Media') } }
		     />
		</figure>
		) : (
			 /* Render Media */
			'image' == mediaType && mediaIsSvg && mediaInlineSvg && mediaSvgHTML ? (
			// Inline SVG. Can't have caprton
			<figure { ...blockProps }
		 		dangerouslySetInnerHTML={{ __html: mediaSvgHTML }}
		 	/>
			) : (
			<figure { ...blockProps } >
		 		<StanzaFigureContent
					mediaAlt={ mediaAlt }
					mediaAspectRatio={ mediaAspectRatio }
					mediaId={ mediaId }
					mediaInlineSvg={ mediaInlineSvg }
					mediaIsSvg={ mediaIsSvg }
					mediaOrientation={ mediaOrientation }
					mediaFigureOrientation={ mediaFigureOrientation }
					mediaOriginalAspectRatioFactor={ mediaOriginalAspectRatioFactor }
					mediaObjectPositionStyle={ mediaObjectPositionStyle }
					mediaType={ mediaType }
					mediaUrl={ mediaUrl }
					mediaVideoSettings={ mediaVideoSettings }
				/>

				{ mediaHasCaption && (
					<RichText
						tagName="figcaption"
						className="wp-element-caption"
						placeholder={ __( 'Add caption…', 'textdstanzaomain' ) }
						value={ mediaCaption }
						onChange={ ( value ) => setAttributes({ mediaCaption: value }) }
						allowedFormats={ ['core/link'] }
					/>
		        ) }
		 	</figure>
			)
		)}
    </>
}