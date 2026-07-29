
import { __, sprintf } from '@wordpress/i18n';
import { useInnerBlocksProps, useBlockProps, InnerBlocks, InspectorControls, store as blockEditorStore } from '@wordpress/block-editor';
import { store as noticesStore } from '@wordpress/notices';
import { useSelect, useDispatch } from '@wordpress/data';
import { useEffect, useRef } from '@wordpress/element';

import { StanzaPanelColorSettings, StanzaAttrsPanelBody } from '../components';
import { setAlignLayoutBackground } from '../helpers';

export default function Edit({ attributes, setAttributes, clientId }) {
	const { align, backgroundColor, layout, maxParagraphs, parentId, template, summaryTextOptions } = attributes;

	// Set align layout and default background
	setAlignLayoutBackground('stanza/summary-text', clientId, setAttributes, backgroundColor, align, layout, parentId);

	const blockProps = useBlockProps({
		className: [			
			'wp-block',
			backgroundColor ? `has-${backgroundColor}-background-color has-background-color` : '',
			'is-layout-flow'
		].filter(Boolean).join(' ')
	});

	// Notice
	// __experimentalHasCustomAppender support to block.json
	const { createNotice } = useDispatch(noticesStore);	
	const lastNoticeTs = useRef(0); // throttle notices to avoid spam on paste
	//.

	// Count direct children and get their clientIds
	const { count, childIds } = useSelect( (select) => {
		const s = select(blockEditorStore);
		return {
			count: s.getBlockCount(clientId),
			childIds: s.getBlockOrder(clientId),
		};
	}, [clientId]);

	// Hide the inserter/appender once we reach the limit
	const canAddMore = count < maxParagraphs;

	// Hard-cap — if user pastes too many, remove extras
	const { removeBlocks } = useDispatch( blockEditorStore );
	useEffect( () => {
		if ( childIds.length > maxParagraphs ) {
			removeBlocks(childIds.slice(maxParagraphs));
			// Notice
			const now = Date.now();
			if ( now - lastNoticeTs.current > 500 ) {
				createNotice(
					'warning',
					sprintf(
						__( 'You can only add up to %d paragraphs.', 'stanza' ),
						maxParagraphs
					),
					{ type: 'snackbar', isDismissible: true }
				);
				lastNoticeTs.current = now;
			}
			//.
		}
	}, [childIds, removeBlocks, createNotice]);	

	const innerBlocksProps = useInnerBlocksProps({}, {
        template: template || [
			['core/paragraph', {
			    placeholder: __('Type', 'stanza')
			}]
		],
        allowedBlocks: ['core/paragraph'],
        templateLock: false,
        renderAppender: () =>
			canAddMore ? <InnerBlocks.DefaultBlockAppender /> : null,
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
					palette={ window?.Stanza?.blocks['stanza/summary-text']?.attributes?.backgroundColor?.options || summaryTextOptions?.backgroundColor }
				/>
			</InspectorControls>			
    		
    		<div { ...blockProps }>{innerBlocksProps.children}</div>
    	</>
    );
}