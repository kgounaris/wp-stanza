
import { __ } from '@wordpress/i18n';

import { wpData } from '../../wp-data';
import { mediaItemPositionStyle } from '../helpers';

export default function StanzaFigureContent (props) {
	const { mediaAlt, mediaAspectRatio, mediaId, mediaOrientation, mediaOriginalAspectRatioFactor, mediaObjectPositionStyle, mediaType, mediaUrl, mediaVideoSettings } = props;

	switch (mediaType) {
		case 'image': {
			if (mediaId) {
				return (
					// Image
					<img 
			            src={ mediaUrl }
			            className={ `wp-image-${mediaId}` } // Mandatory for core image attributes like srcet etc. to be applied
			            alt={ mediaAlt } 
			            style={ mediaAspectRatio ? { ...( mediaItemPositionStyle(mediaObjectPositionStyle, mediaOrientation, mediaAspectRatio, mediaOriginalAspectRatioFactor) ) } : null }
			        />
				);
			} else {
				return (
					// Placeholder
					<img 
			            src={ Stanza?.bloginfo?.template_url + '/theme-blocks/media-placeholder.svg' } // TODO: fix url
			            style={ mediaAspectRatio ? { ...( mediaItemPositionStyle(mediaObjectPositionStyle, mediaOrientation, mediaAspectRatio, mediaOriginalAspectRatioFactor) ) } : null }
			        />
				);
			}
		}
		case 'video': {
			return(
                <video
                	style={ mediaAspectRatio ? { ...( mediaItemPositionStyle(mediaObjectPositionStyle, mediaOrientation, mediaAspectRatio, mediaOriginalAspectRatioFactor) ) } : null }
                	controls={ mediaVideoSettings?.controls }
                    autoPlay={ mediaVideoSettings?.autoplay }
                    loop={ mediaVideoSettings?.loop }
                    muted={ mediaVideoSettings?.muted }
                    playsInline={ mediaVideoSettings?.playsInline }
                    preload={ mediaVideoSettings?.preload }
                    poster={ mediaVideoSettings?.poster?.url }
                >
                    {mediaUrl && (<source src={mediaUrl} />)}
                </video>
			);
		}
		default: { // For external image (mediaType = '')
			if (mediaUrl) {
				return(
					<img 
			            src={ mediaUrl }
			            className={ `wp-image-${mediaId}` } // Mandatory for core image attributes like srcet etc. to be applied
			            alt={ mediaAlt } 
			            style={ mediaAspectRatio ? { ...( mediaItemPositionStyle(mediaObjectPositionStyle, mediaOrientation, mediaAspectRatio, mediaOriginalAspectRatioFactor) ) } : null }
			        />
				);
			}
		}
	}
}


/*import { __ } from '@wordpress/i18n';

import { wpData } from '../../wp-data';
import { mediaItemPositionStyle } from '../helpers';

export default function StanzaFigureContent( props ) {
	const {
		mediaAlt,
		mediaAspectRatio,
		mediaId,
		mediaOrientation,
		mediaOriginalAspectRatioFactor,
		mediaObjectPositionStyle,
		mediaType,
		mediaUrl,
		mediaVideoSettings
	} = props;

	const style = mediaAspectRatio
		? mediaItemPositionStyle(
				mediaObjectPositionStyle,
				mediaOrientation,
				mediaAspectRatio,
				mediaOriginalAspectRatioFactor
		  )
		: null;

	switch ( mediaType ) {
		case 'image': {
			if ( mediaId && mediaUrl ) {
				return (
					<img
						src={ mediaUrl }
						className={ `wp-image-${ mediaId }` }
						alt={ mediaAlt || '' }
						style={ style }
					/>
				);
			}

			return (
				<img
					src={
						Stanza?.bloginfo?.template_url +
						'/theme-blocks/media-placeholder.svg'
					}
					alt=""
					style={ style }
				/>
			);
		}

		case 'video': {
			return (
				<video
					style={ style }
					controls={ !!mediaVideoSettings?.controls }
					autoPlay={ !!mediaVideoSettings?.autoplay }
					loop={ !!mediaVideoSettings?.loop }
					muted={ !!mediaVideoSettings?.muted }
					playsInline={ !!mediaVideoSettings?.playsInline }
					preload={ mediaVideoSettings?.preload }
					poster={ mediaVideoSettings?.poster?.url }
				>
					<source src={mediaUrl} />
				</video>
			);
		}

		default: {
			if ( ! mediaUrl ) {
				return null;
			}

			return (
				<img
					src={ mediaUrl }
					className={ mediaId ? `wp-image-${ mediaId }` : undefined }
					alt={ mediaAlt || '' }
					style={ style }
				/>
			);
		}
	}
}*/