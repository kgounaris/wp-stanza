
import { __ } from '@wordpress/i18n';
import { useEffect, useMemo } from '@wordpress/element';

import { wpData } from '../../wp-data';
import { StanzaAttrsPanelBody } from '../../components';
import { MediaUpload } from '@wordpress/block-editor';

import { onRemovePoster, onSelectPoster } from '../helpers';
import { PanelBody, ToggleControl, TextareaControl, SelectControl, RangeControl, ResponsiveWrapper, BaseControl, Button } from '@wordpress/components';
import { MediaUploadCheck } from '@wordpress/editor';

export default function MediaInspectorControlsSettings({ attributes, setAttributes, provide, children }) {
	const {
		mediaAlt, mediaAspectRatio, mediaId,
		mediaImageSize, mediaImageSizes, mediaIsSvg,
		mediaInlineSvg, mediaOrientation, mediaOriginalAspectRatio,
		mediaOriginalAspectRatioFactor, mediaType, mediaUrl,
		mediaObjectPositionStyle, mediaOptions, mediaVideoSettings, mediaSvgWidth
	} = attributes;
	const { settings } = wpData();
	
	// Assign provided media options if any,
	// from blocks that use the Media block as a component (stanza/post, stanza/media-text)
	useEffect(() => {
		if (provide?.mediaOptions) {
			setAttributes({mediaOptions: provide?.mediaOptions})
		}
	}, []);

	// Keep media size and ratio relative to position rule provided
	// TODO: Now align supports only { mediaPosition: [ mediaImageSize, mediaAspectRatio ] }. Needs support for array like [ "left", "right", "center" ] as well.
	useEffect(() => {
		if (provide?.mediaPosSizeRatioAlign) {
			if (
				// Check if there is align / size / ratio relation
				provide.mediaPosSizeRatioAlign?.[provide?.mediaPosition]?.[2]?.[provide.mediaAlign]
				) {
				setAttributes({
					mediaImageSize: provide.mediaPosSizeRatioAlign[provide.mediaPosition][2][provide.mediaAlign][0],
					mediaAspectRatio: provide.mediaPosSizeRatioAlign[provide.mediaPosition][2][provide.mediaAlign][1]
				});
			} else {
				setAttributes({
					mediaImageSize: provide.mediaPosSizeRatioAlign[provide.mediaPosition][0],
					mediaAspectRatio: provide.mediaPosSizeRatioAlign[provide.mediaPosition][1]
				});			
			}

		}
	}, [provide?.mediaPosition, provide?.mediaAlign])

	// Aspect ratio options
	const aspectRatioOptions = useMemo(() => {
		const common = mediaOptions?.mediaAspectRatio ?? {};

		if ( ! common.length) return;

		if ( mediaIsSvg && mediaInlineSvg ) {
			return common;
		} else if ( mediaIsSvg ) {
			return [
				...common,
				{ label: 'Unset', value: '' }
			]
		} else {
			if (provide?.blockName) {
				return [
					...common
				]
			}
			return [
				{ label: 'Original', value: mediaOriginalAspectRatio },
				...common,
				{ label: 'Unset', value: '' }
			]
		}
	}, [mediaIsSvg, mediaInlineSvg, mediaId]);

	return (
		<>
			<StanzaAttrsPanelBody
				attributes={ attributes }
			/>

			<PanelBody title={__('Settings')}>
				{ children }

				{ /* Svg Image specific settings */
		        mediaIsSvg && (
		        <ToggleControl
		            label={ __('Insert inline svg', 'stanza') }
		            checked={ mediaInlineSvg }
		            onChange={ ( newInlineSvg ) => setAttributes({ mediaInlineSvg : newInlineSvg }) }
		            __nextHasNoMarginBottom
		        />
		        ) }

		        { (mediaId || mediaUrl) && (
		        <TextareaControl
		            label={ __('Alternative Text', 'stanza' ) }
		            value={ mediaAlt ?? '' } // Decorative images should use an empty string for mediaAlt (not “null” or omitted).
		            onChange={ (newAlt) => {
		            	setAttributes( { mediaAlt: newAlt } );
		            }}
		            help={ __('Describe the purpose of the image. Important for accesibility and SEO.') }
		            __nextHasNoMarginBottom // Something about styles depreacted
		        />
		        ) }

				<SelectControl
		            label={ __('Aspect ratio', 'stanza' ) }
		            value={ mediaAspectRatio }
		            disabled={ false }
		            options={ aspectRatioOptions }
		            onChange={ ( newAspectRatio ) => {
		            	setAttributes({ mediaAspectRatio: newAspectRatio })
		            } }
		            __nextHasNoMarginBottom
		            __next40pxDefaultSize // Something about styles depreacted
		        />

		        { /* Image specific settings */
		        mediaId && 'image' == mediaType && ! mediaIsSvg ? (
		        <SelectControl
		            label={ __('Image size', 'stanza' ) }
		            disabled={ false }
		            value={ mediaImageSize }
					options={
						(settings.imageSizes || []) // TODO: reconsider with mediaImageSizes
							// filter allowed sizes
							.filter( ( size ) => {
								const allowedSizes = mediaOptions?.mediaImageSize || [];
								return allowedSizes.includes( size.slug );
							})
							// map to options
							.map( ( size ) => ({
								label: size.name || size.slug,
								value: size.slug,
							}))
					}
		            onChange={ ( newSize ) => {
		            	// Check if chosen size is generated for this image
		            	if (mediaImageSizes[newSize] || null) {
				            setAttributes({
				                mediaImageSize: newSize,
				                mediaUrl: mediaImageSizes[newSize].url,
				            });
				        }
		            } }
		            __nextHasNoMarginBottom
		            __next40pxDefaultSize
		        />
		        ) : ( <></> ) }

		        { /* Svg Image specific settings */
		        mediaIsSvg && mediaInlineSvg && (
		        <RangeControl
		            label={ __('Width', 'stanza') }
		            value={ mediaSvgWidth }
		            onChange={ ( newSvgWidth ) => setAttributes({ mediaSvgWidth: newSvgWidth }) }
		            min={ 25 }
		            max={ 100 }
		            step={ 1 }
		            resetFallbackValue={ 100 }
		            allowReset={ true }
		            marks={ [{value: 50, label: '50'}] }
		            __nextHasNoMarginBottom
		            __next40pxDefaultSize
		        />                    
		        ) } 

		        { mediaOriginalAspectRatioFactor && mediaOrientation && (
		        <RangeControl
		            label={ __('Position', 'stanza') }
		            value={ mediaObjectPositionStyle }
		            onChange={ ( newPosition ) => setAttributes({ mediaObjectPositionStyle: newPosition }) }
		            min={ 0 }
		            max={ 100 }
		            step={ 1 }
		            resetFallbackValue={ 50 }
		            allowReset={ true }
		            disabled={ ! mediaAspectRatio || mediaAspectRatio == mediaOriginalAspectRatio }
		            help={ ! mediaAspectRatio ? __('Set an aspect ratio to activate this feature.', 'stanza') : '' }
		            marks={ [{value: 50, label: '50'}] }
		            __nextHasNoMarginBottom
		            __next40pxDefaultSize
		        />
		        ) }
		    </PanelBody>

		    { /* Video specific settings */
		    mediaId && 'video' == mediaType ? (		        
		    <PanelBody title={__('Video Settings')}>
		        <ToggleControl
		            label={__('Autoplay', 'stanza')}
		            checked={mediaVideoSettings?.autoplay}
		            onChange={( value ) => setAttributes({ mediaVideoSettings: { ...mediaVideoSettings, autoplay: value } })}
		            __nextHasNoMarginBottom
		        />
		        <ToggleControl
		            label={__('Loop', 'stanza')}
		            checked={mediaVideoSettings?.loop}
		            onChange={( value ) => setAttributes({ mediaVideoSettings: { ...mediaVideoSettings, loop: value } })}
		            __nextHasNoMarginBottom
		        />
		        <ToggleControl
		            label={__('Muted', 'stanza')}
		            checked={mediaVideoSettings?.muted}
		            onChange={( value ) => setAttributes({ mediaVideoSettings: { ...mediaVideoSettings, muted: value } })}
		            __nextHasNoMarginBottom
		        />
		        <ToggleControl
		            label={__('Playback Controls', 'stanza')}
		            checked={mediaVideoSettings?.controls}
		            onChange={( value ) => setAttributes({ mediaVideoSettings: { ...mediaVideoSettings, controls: value } })}
		            __nextHasNoMarginBottom
		        />
		        <ToggleControl
		            label={__('Plays Inline', 'stanza')}
		            checked={mediaVideoSettings?.playsInline}
		            onChange={( value ) => setAttributes({ mediaVideoSettings: { ...mediaVideoSettings, playsInline: value } })}
		            help={ 'When enabled, videos will play directly within the webpage on mobile browsers, instead of opening in a fullscreen player.' }
		            __nextHasNoMarginBottom
		        />

		        <BaseControl
		        	label={ __( 'Poster Image', 'stanza' ) }
		        	help={ __( 'The poster image appears when the video is stopped.', 'stanza' ) }
		        >
		            <MediaUploadCheck>
		                <MediaUpload
		                    onSelect={ ( media ) => onSelectPoster(media, mediaVideoSettings, setAttributes)}
		                    allowedTypes={ ['image'] }
		                    value={ mediaVideoSettings.poster?.id }
		                    render={ ({ open }) => (
		                        <>
		                            <Button 
		                                type="button"
		                                aria-describedby="video-block__poster-image-description"
		                                className="components-button is-primary"
		                                onClick={open}
		                            >
		                                { mediaVideoSettings.poster?.id ? __('Replace', 'stanza') : __('Select', 'stanza') }
		                            </Button>
		                            { mediaVideoSettings.poster?.id ? (
		                                <Button 
		                                    type="button"
		                                    className="components-button is-tertiary"
		                                    onClick={ () => onRemovePoster(mediaVideoSettings, setAttributes)}
		                                >
		                                    { __('Remove', 'stanza') }
		                                </Button>
		                            ) : ( <></> ) }
		                        </>
		                    )}
		                />
		            </MediaUploadCheck>

					{ mediaVideoSettings.poster?.url && (
						<div style={{ marginTop: 8 }}>
							<ResponsiveWrapper
								naturalWidth={ 300 }
								naturalHeight={ (() => {
									const ratio = mediaAspectRatio || '1/1'; // fallback
									const [a, b] = ratio.split('/').map(Number);
									return mediaAspectRatio ? 300/(a/b) : 300/mediaOriginalAspectRatioFactor;
								})() }
							>
								<img
									src={ mediaVideoSettings.poster.url }
									alt={ mediaAlt || __( 'Poster preview', 'stanza' ) }
									style={{ width: '100%', height: '100%', objectFit: 'cover' }}
								/>
							</ResponsiveWrapper>
						</div>
					) }
		        </BaseControl>
		    </PanelBody>
	    	) : ( <></> ) }
		</>
	);
}