
import { useBlockProps, RichText } from '@wordpress/block-editor';

import StanzaFigureContent from '../components/figure';

export default function StanzaMediaSave( { blockProps, attributes = {} } ) {
	const {
		mediaAlt,
		mediaAspectRatio,
		mediaBackgroundColor,
		mediaCaption,
		mediaHasCaption,
		mediaId,
		mediaImageSize,
		mediaInlineSvg,
		mediaIsSvg,
		mediaHref,
		mediaHrefIsPredefined,
		mediaLinkTarget,
		mediaOrientation,
		mediaFigureOrientation,
		mediaOriginalAspectRatioFactor,
		mediaObjectPositionStyle,
		mediaSvgHTML,
		mediaType,
		mediaUrl,
		mediaVideoSettings
	} = attributes;

	// Update blockProps.ClassName
	blockProps = {
    	...blockProps,	
		className: [
			'wp-block', // there is NOT in block props
			blockProps.className,
			mediaAspectRatio ? `has-${mediaAspectRatio.replace('/','-')}-aspect-ratio` : 'has-unset-aspect-ratio',
			blockProps?.className ?? '',
			mediaBackgroundColor ? `has-${mediaBackgroundColor}-background-color has-background-color` : '',
			mediaOrientation ? `has-${mediaOrientation}-orientation` : '',
			mediaFigureOrientation ? `has-${mediaFigureOrientation}-figure-orientation` : '',
			mediaImageSize ? `size-${mediaImageSize}` : ''
		].filter(Boolean).join(' ')
	}

	return mediaHref ?
	(
		'image' == mediaType && mediaIsSvg && mediaInlineSvg && mediaSvgHTML ? (
		// Inline SVG. Can't have caption			
		<figure
	 		dangerouslySetInnerHTML={{ __html: mediaSvgHTML }}
	 	/>	
		) : (
		<figure { ...blockProps }>
			<a href={ mediaHref }>
		 		<StanzaFigureContent
					mediaAlt={ mediaAlt }
					mediaAspectRatio={ mediaAspectRatio }
					mediaId={ mediaId }
					mediaInlineSvg={ mediaInlineSvg }
					mediaIsSvg={ mediaIsSvg }
					mediaOrientation={ mediaOrientation }
					mediaOriginalAspectRatioFactor={ mediaOriginalAspectRatioFactor }
					mediaObjectPositionStyle={ mediaObjectPositionStyle }
					mediaType={ mediaType }
					mediaUrl={ mediaUrl }
					mediaVideoSettings={ mediaVideoSettings }
				/>
				{ mediaHasCaption && !!mediaCaption?.length && (
			    <RichText.Content tagName="figcaption" className="wp-element-caption" value={ mediaCaption } />
			    ) }
		 	</a>
		 </figure>
		)
	) : (
		'image' == mediaType && mediaIsSvg && mediaInlineSvg && mediaSvgHTML ? (
		// Inline SVG. Can't have caption
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
				mediaOriginalAspectRatioFactor={ mediaOriginalAspectRatioFactor }
				mediaObjectPositionStyle={ mediaObjectPositionStyle }
				mediaType={ mediaType }
				mediaUrl={ mediaUrl }
				mediaVideoSettings={ mediaVideoSettings }
			/>
			{ mediaHasCaption && !!mediaCaption?.length && (
		    <RichText.Content tagName="figcaption" className="wp-element-caption" value={ mediaCaption } />
		    ) }
	 	</figure>
		)
	);
}