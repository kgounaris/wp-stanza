
import { __ } from '@wordpress/i18n';
import { useInnerBlocksProps, useBlockProps, BlockControls, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, BaseControl, ToolbarButton, ButtonGroup, Button } from '@wordpress/components';
import { useEffect } from '@wordpress/element';
import { Icon, justifyLeft, justifyCenter, justifyRight } from '@wordpress/icons';

import { IconSet } from '../icons';
import { StanzaPanelColorSettings } from '../components';
import { setAlignLayoutBackground } from '../helpers';
import StanzaMediaEdit from '../media/components/edit';
import MediaBlockControls from '../media/components/blockControls';
import MediaInspectorControlsSettings from '../media/components/inspectorControls';

const ALIGN_OPTIONS = [
	{ value: 'left', label: __( 'Align left', 'stanza' ), icon: justifyLeft },
	{ value: 'center', label: __( 'Align center', 'stanza' ), icon: justifyCenter },
	{ value: 'right', label: __( 'Align right', 'stanza' ), icon: justifyRight },
];

export default function Edit({ attributes, setAttributes, clientId, isSelected }) {
	const { align, backgroundColor, blockPropsOverwrite, layout, mediaBackgroundColor, mediaAlign, mediaAspectRatio, mediaImageSize, mediaPosition, mediaTextOptions, parentId, template, useInnerBlockWrapper } = attributes;
	const mediaPosSizeRatioAlign = window?.Stanza?.blocks['stanza/media-text']?.mediaPosSizeRatioAlign;
	const TEMPLATE = [
		['stanza/hero-text', { template: [
			['core/heading'],
			['stanza/summary-text']
		]}]
	];

	// Set align layout and default background
	setAlignLayoutBackground('stanza/media-text', clientId, setAttributes, backgroundColor, align, layout, parentId);

  	// Keep media align options relative to position
	useEffect(() => {
		if (mediaPosSizeRatioAlign) {
			if (mediaPosSizeRatioAlign?.[mediaPosition]?.[2]) {
				const alignOptions = mediaPosSizeRatioAlign[mediaPosition][2];
				if (Array.isArray(alignOptions)) {
					setAttributes({ mediaTextOptions: { ...mediaTextOptions, mediaAlign: alignOptions } })
				} else if ('object' == typeof(alignOptions)) {
					const keys = Object.keys(alignOptions);
					setAttributes({ mediaTextOptions: { ...mediaTextOptions, mediaAlign: keys } });
				}
			} else {
				setAttributes({
					mediaTextOptions: { ...mediaTextOptions, mediaAlign: [] },
					mediaAlign: ''
				})
			}
		}  	
	}, [mediaPosition]);

	const blockProps = useBlockProps({
		className: [
			'wp-block',
			backgroundColor ? `has-${backgroundColor}-background-color has-background-color` : '',
			mediaPosition ? `has-media-on-the-${mediaPosition}` : '',
			mediaAlign ? `has-media-align-on-the-${mediaAlign}` : ''
		].filter(Boolean).join(' ')
	});
	
	const innerBlocksProps = useInnerBlocksProps(blockProps, {
		template: template || TEMPLATE,
		templateLock: 'all'      
  	});

	return (
		<>
			<BlockControls group="other">
				{ mediaTextOptions.mediaPosition?.map((position, index) => (
					<ToolbarButton
						key={ index }
	                    icon={ 'top' == position || 'bottom' == position ? IconSet[`alignPull${position.charAt(0).toUpperCase() + position.slice(1)}`] : `align-pull-${position}` }
	                    label={ __(`Show media on ${position}`, 'Stanza') }
	                    isActive={ mediaPosition === position }
	                    onClick={ () => setAttributes({mediaPosition: position}) }
	                />
				)) }
				<MediaBlockControls
					{...{ attributes, setAttributes, isSelected }}
				/>
			</BlockControls>

			<InspectorControls>
				{ mediaTextOptions?.mediaAlign?.length ? (
				<PanelBody
					title="Media Layout"				
				>
					<BaseControl
						label={ __( 'Alignment', 'stanza' ) }
						help={ __( 'Align the media horizontally.', 'stanza' ) }
					>
						<ButtonGroup aria-label={ __( 'Content alignment', 'stanza' ) }>
							{ mediaTextOptions?.mediaAlign?.map( ( option ) => {
								const optionObj = ALIGN_OPTIONS.filter((opt) => {
									if (opt.value == option) {
										return option;
									}
								});
								
								const isPressed = mediaAlign === optionObj[0].value;

								return (
									<Button
										key={ optionObj[0].value }
										isPressed={ isPressed }
										aria-pressed={ isPressed }
										label={ optionObj[0].label }
										onClick={ () => setAttributes( { mediaAlign: optionObj[0].value } ) }
									>
										<Icon icon={ optionObj[0].icon } />
									</Button>
								);
							} ) }
						</ButtonGroup>
					</BaseControl>
				</PanelBody>
				) : <></> }

				<MediaInspectorControlsSettings
					{...{ attributes, setAttributes }}
					provide={ ! parentId && mediaPosSizeRatioAlign ? { // Only for root block
						blockName: 'stanza/media-text',
						mediaPosition: mediaPosition,
						mediaAlign: mediaAlign,
						mediaPosSizeRatioAlign: mediaPosSizeRatioAlign,
						mediaOptions: {
							mediaAspectRatio: mediaTextOptions?.mediaAspectRatio,
							mediaImageSize: mediaTextOptions?.mediaImageSize,
							mediaBackgroundColor: mediaTextOptions?.mediaBackgroundColor
						}
					} : {} }
				/>
			</InspectorControls>

			{
			// Add wp-block-stanza-media-text__inner wrapper only if it does NOT have a parent block				
			((! parentId && (useInnerBlockWrapper ?? true)) || (parentId && (useInnerBlockWrapper ?? false))) ? (
			<>
				<InspectorControls group="styles">
					<StanzaPanelColorSettings
			            setAttributes={ setAttributes }
			            colorAttribute={ backgroundColor }
			            palette={window?.Stanza?.blocks['stanza/media-text']?.attributes?.backgroundColor?.options}
			        />

					<StanzaPanelColorSettings
			            setAttributes={ setAttributes }
			            attributeKey="mediaBackgroundColor"
			            colorAttribute={ mediaBackgroundColor }
			            palette={window?.Stanza?.blocks['stanza/media-text']?.attributes?.mediaBackgroundColor?.options}
			            title="Media Background color"
			        />
				</InspectorControls>

    			<div {...innerBlocksProps}>
			    	<div>		    		
				        <StanzaMediaEdit
							blockProps={{ className: 'wp-block-stanza-media' }}
							{...{ attributes, setAttributes, clientId }}
						/>
						
			    		{/*<div className="is-layout-flow">{innerBlocksProps.children}</div>*/}
			    		{innerBlocksProps.children}
					</div>
			    </div>
			</>
			) : (
			    <div { ...(Object.entries(blockPropsOverwrite).length ? blockPropsOverwrite : blockProps) }>		
			        <StanzaMediaEdit
						blockProps={{ className: 'wp-block-stanza-media' }}
						{...{ attributes, setAttributes, clientId }}
					/>
					
		    		{/*<div className="is-layout-flow">{innerBlocksProps.children}</div>*/}
		    		{innerBlocksProps.children}
			    </div>
			)}	    
		</>
	);
}