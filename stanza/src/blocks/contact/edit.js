
import { __ } from '@wordpress/i18n';
import { useInnerBlocksProps, useBlockProps, InspectorControls } from '@wordpress/block-editor';

import { StanzaPanelColorSettings, StanzaAttrsPanelBody } from '../components';
import { monitorBlockFocus } from '../utilities';

export default function Edit({ attributes, setAttributes, clientId }) {
	const { backgroundColor, globalPadding } = attributes;
	const TEMPLATE = [
		['stanza/free-text', {
			freeTextOptions: {
				template: [
					['core/heading', {
					    level: 2,
					    placeholder: __('Heading', 'stanza')
					}],
					['core/paragraph', {            
			        	placeholder: __('Type', 'stanza')
			        }],
			        ['wpforms/form-selector'],
					['core/paragraph', {            
			        	placeholder: __('Type', 'stanza')
			        }]
				]
			}
		}],
		['stanza/google-map']
	];	

	const blockProps = useBlockProps({
		className: [			
			'wp-block',
			'has-google-map-on-the-right',
			backgroundColor ? `has-${backgroundColor}-background-color has-background-color` : '',
			globalPadding ? 'has-global-padding' : ''
			
		].filter(Boolean).join(' ')
	});
	
	const innerBlocksProps = useInnerBlocksProps(blockProps,{
		template: TEMPLATE,
		templateLock: 'all',    
	    allowedBlocks: []
	});

    return (
    	<>
    		<InspectorControls>
				<StanzaAttrsPanelBody attributes={ attributes } />
			</InspectorControls>

    		<InspectorControls group="styles">
				<StanzaPanelColorSettings
                    setAttributes={ setAttributes }
                    colorAttribute={ backgroundColor }
                    palette={window?.Stanza?.blocks['stanza/contact']?.attributes?.backgroundColor?.options}
                />
			</InspectorControls>
    		
    		<div { ...innerBlocksProps }><div>{innerBlocksProps.children}</div></div>
    	</>
    );
}