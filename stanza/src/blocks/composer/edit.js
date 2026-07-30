
import { __ } from '@wordpress/i18n';
import { useInnerBlocksProps, useBlockProps, BlockControls, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, ToolbarButton } from '@wordpress/components';

import { StanzaPanelColorSettings, StanzaAttrsPanelBody } from '../components';
import { setAlignLayoutBackground } from '../helpers';
import { monitorBlockFocus } from '../utilities';
import { wpData } from '../wp-data';

export default function Edit({ attributes, setAttributes, clientId }) {
	const { backgroundColor, blockName, mediaPosition, template, useInnerBlockWrapper } = attributes;

	const { entityRecord } = wpData();
	
	const blockProps = useBlockProps({
		className: [			
			'wp-block',
			mediaPosition ? `has-media-on-the-${mediaPosition}` : '',
			backgroundColor ? `has-${backgroundColor}-background-color has-background-color` : ''			
		].filter(Boolean).join(' ')
	});

	const archiveBlock = (template ?? []).find(
		( [ blockName ] ) => blockName === 'stanza/archive'
	);
	
	const innerBlocksProps = useInnerBlocksProps(blockProps,{
		template: template,
		templateLock: window.Stanza?.blocks?.[blockName || 'stanza/composer']?.templateLock ?? false,    
	    allowedBlocks: window.Stanza?.blocks?.[blockName || 'stanza/composer']?.allowedBlocks ?? undefined
	});
	
    return (
    	<>
    		{ window?.Stanza?.blocks[blockName || 'stanza/composer']?.attributes?.mediaPosition?.options.length &&
    		(
    		<BlockControls group="other">
				{ window.Stanza?.blocks?.[blockName || 'stanza/composer']?.attributes?.mediaPosition?.options?.map((position, index) => (
					<ToolbarButton
						key={ index }
	                    icon={ 'top' == position || 'bottom' == position ? IconSet[`alignPull${position.charAt(0).toUpperCase() + position.slice(1)}`] : `align-pull-${position}` }
	                    label={ __(`Show media on ${position}`, 'Stanza') }
	                    isActive={ mediaPosition === position }
	                    onClick={ () => setAttributes({mediaPosition: position}) }
	                />
				)) }
    		</BlockControls>
    		)}

    		<InspectorControls>
    			{ archiveBlock?.[1]?.postType && (
	    			<PanelBody title="Help" initialOpen={ true }>
					    <p>
					        Contains archive. Check the { archiveBlock[1].postType } <a href={`edit.php?post_type=${archiveBlock[1].postType}`} target="_blank" rel="noopener noreferrer">edit screen</a> to edit content.
					    </p>
					</PanelBody>
    			)}

				<StanzaAttrsPanelBody
					attributes={ attributes }
					setAttributes={ setAttributes }
				/>
			</InspectorControls>

    		<InspectorControls group="styles">
				<StanzaPanelColorSettings
                    setAttributes={ setAttributes }
                    colorAttribute={ backgroundColor }
                    palette={window?.Stanza?.blocks[blockName || 'stanza/composer']?.attributes?.backgroundColor?.options}
                />
			</InspectorControls>
    		
    		{ useInnerBlockWrapper ?? true ? ( // undefined for preexisting blocks without useInnerBlockWrapper
    		<div { ...innerBlocksProps }><div>{innerBlocksProps.children}</div></div>
    		) : (
    		<div { ...innerBlocksProps }>{innerBlocksProps.children}</div>
    		)}
    	</>
    );
}