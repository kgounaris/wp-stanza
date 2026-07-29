
import { __ } from '@wordpress/i18n';
import { useMemo, useEffect } from '@wordpress/element';
import { useInnerBlocksProps, useBlockProps, InspectorControls, MediaUpload, BlockControls, MediaPlaceholder } from '@wordpress/block-editor';
import { PanelBody, ToggleControl, ToolbarButton, ToolbarGroup, RangeControl, SelectControl } from '@wordpress/components';
import { useDispatch, useSelect } from '@wordpress/data';
import { createBlock } from '@wordpress/blocks';

import { StanzaPanelColorSettings, StanzaAttrsPanelBody } from '../components';
import { setAlignLayoutBackground } from '../helpers';
import { getOrientationByRatio } from '../media/helpers';
import { wpData } from '../wp-data';

export default function Edit({ attributes, setAttributes, clientId }) {
	const { align, galleryMediaAspectRatio, galleryOptions, galleryMediaImageSize, backgroundColor, columns, layout, parentId, useInnerBlocksWrapper, useBlockWrapper } = attributes;
	const { replaceInnerBlocks, insertBlocks } = useDispatch('core/block-editor');
    const { entityRecord } = wpData();

	// Set align layout and default background
	setAlignLayoutBackground('stanza/gallery', clientId, setAttributes, backgroundColor, align, layout, parentId);

	const blockProps = useBlockProps({
		className: [
			'wp-block',
			backgroundColor ? `has-${backgroundColor}-background-color has-background-color` : '',
			galleryMediaAspectRatio ? `has-${galleryMediaAspectRatio}-media-aspect-ratio` : 'has-unset-media-aspect-ratio',
			columns ? `has-${columns}-columns` : ''
		].filter(Boolean).join(' ')
	});

	const innerBlocksProps = useInnerBlocksProps(
		{ className: 'wp-block-stanza-gallery__inner' },
		{
	        allowedBlocks: ['stanza/media'],
	        templateLock: false,
	        renderAppender: () => false // this completely removes the block-list-appender element
    	}
    );

    const innerBlocks = useSelect(select => select('core/block-editor').getBlocks(clientId), [clientId]);

    // Update all Media blocks mediaImageSize
    const { updateBlockAttributes } = useDispatch( 'core/block-editor' );

	useEffect( () => {
		if ( ! innerBlocks.length ) {
			return;
		}

		innerBlocks.forEach( ( block ) => {
			updateBlockAttributes( block.clientId, {
				mediaAspectRatio: galleryMediaAspectRatio,
			} );
		} );
	}, [ galleryMediaAspectRatio, innerBlocks, updateBlockAttributes ] );
	// .Update all Media blocks mediaImageSize

	const doCreateBlock = (media) => {
	    return media.map((m) => {
	        const orientation =
	            m?.sizes?.full?.height && m?.sizes?.full?.width
	                ? m.sizes?.full?.height > m.sizes?.full?.width
	                    ? 'portrait'
	                    : 'landscape'
	                : '';

	        const mediaOriginalAspectRatio = m?.sizes?.full?.height && m?.sizes?.full?.width && orientation ? ( 'landscape' == orientation ? `${m.sizes?.full?.width}/${m.sizes?.full?.height}` : `${m.sizes?.full?.height}/${m.sizes?.full?.width}` ) : '';

	        return createBlock('stanza/media', {
	            mediaId: m.id,
	            mediaUrl: m.url,
	            mediaAlt: m.alt,
	            mediaImageSize: galleryMediaImageSize || 'full',
	            mediaImageSizes: m?.sizes || [],
	            mediaIsSvg:
	                m?.mime === 'image/svg+xml' ||
	                m?.mime_type === 'image/svg+xml',
	            mediaType: m.type,
	            mediaOrientation: orientation,
	            mediaFigureOrientation: getOrientationByRatio(galleryMediaAspectRatio || mediaOriginalAspectRatio),
	            mediaAspectRatio: galleryMediaAspectRatio || '',
	            mediaOriginalAspectRatio: mediaOriginalAspectRatio,
	            mediaOriginalAspectRatioFactor:
	                m?.sizes?.full?.height && m?.sizes?.full?.width ? m.sizes?.full?.width / m.sizes?.full?.height : '',
                mediaThumbnail:
                    'image' == m.type ? ( (m?.sizes?.thumbnail?.url || m?.sizes?.thumbnail?.source_url) || '' ) : (
                    'video' == m.type ? entityRecord.url + '/wp-content/plugins/stanza/assets/img/video-alt3.svg' : ''    )
	        });
	    });
	};

    const onSelectImages = (media) => {
        replaceInnerBlocks(clientId, doCreateBlock(media), false);
    };

    const onAddImages = (media) => {
        insertBlocks(doCreateBlock(media), innerBlocks.length, clientId);
    };

    const aspectRatioOptions = useMemo(() => {
		const common = galleryOptions?.galleryMediaAspectRatio ?? {};

		if ( ! common.length) return;

		return [
			// TODO: { label: 'Original', value: mediaOriginalAspectRatio },
			...common,
			// TODO: { label: 'Unset', value: '' }
		]
	}, []);
    
    return (
    	<>
			<BlockControls>
                <MediaUpload
                    onSelect={ onAddImages }
                    allowedTypes={['image']}
                    multiple
                    render={({ open }) => (
                        <ToolbarGroup>
                            <ToolbarButton
                                label={__('Add', 'stanza')}
                                onClick={open}
                            >
                                {__('Add', 'stanza')}
                            </ToolbarButton>
                        </ToolbarGroup>
                    )}
                />
            </BlockControls>

    		<InspectorControls>
				<StanzaAttrsPanelBody
					attributes={ attributes }
					setAttributes={ setAttributes }
				/>				

				<PanelBody title={__('Settings', 'stanza')}>
					<RangeControl
	                    label={__('Columns', 'stanza')}
	                    value={ columns }
	                    onChange={ (newColumns) => {
					        setAttributes({ columns: newColumns});
					    } }
	                    min={1}
	                    max={6}
	                />

		            <SelectControl
			            label={ __('Aspect ratio', 'stanza' ) }
			            value={ galleryMediaAspectRatio }
			            disabled={ false }
			            options={ aspectRatioOptions }
			            onChange={ ( newAspectRatio ) => {
			            	setAttributes({ galleryMediaAspectRatio: newAspectRatio })
			            } }
			            __nextHasNoMarginBottom
			            __next40pxDefaultSize // Something about styles depreacted
			        />
	            </PanelBody>

			</InspectorControls>
			
			{
    		// Add wp-block-stanza-free-gallery__inner wrapper only if it does NOT have a parent block
			((! parentId && (useInnerBlocksWrapper ?? true)) || (parentId && (useInnerBlocksWrapper ?? false))) ? (
			<>
	    		<InspectorControls group="styles">
					<StanzaPanelColorSettings
	                    setAttributes={ setAttributes }
	                    colorAttribute={ backgroundColor }
	                    palette={window?.Stanza?.blocks['stanza/gallery']?.attributes?.backgroundColor?.options}
	                />
				</InspectorControls>

    			<div { ...blockProps }>
    				<div {...innerBlocksProps} />

    				{ !innerBlocks.length && (
	                    <MediaPlaceholder
	                        onSelect={ onSelectImages }
	                        allowedTypes={['image']}
	                        multiple
	                        gallery
	                        labels={{ title: __('Select Images', 'stanza') }}
	                    />
	                ) }
    			</div>
			</>
			) : (
				useBlockWrapper ? (
					<div { ...blockProps }>
						{ !innerBlocks.length && (
		                    <MediaPlaceholder
		                        onSelect={ onSelectImages }
		                        allowedTypes={['image']}
		                        multiple
		                        gallery
		                        labels={{ title: __('Select Images', 'stanza') }}
		                    />
		                ) }

						{innerBlocksProps.children}
					</div>
				) : (
					<>
						{ !innerBlocks.length && (
		                    <MediaPlaceholder
		                        onSelect={ onSelectImages }
		                        allowedTypes={['image']}
		                        multiple
		                        gallery
		                        labels={{ title: __('Select Images', 'stanza') }}
		                    />
		                ) }

						{innerBlocksProps.children}
					</>
				)
			)}
    	</>
    );
}