import { addFilter } from '@wordpress/hooks';
import { createHigherOrderComponent } from '@wordpress/compose';
import { useDispatch } from '@wordpress/data';
import { store as blockEditorStore } from '@wordpress/block-editor';
import { useEffect } from '@wordpress/element';
import { assign, merge } from 'lodash';

/*
 * Keep text align value always "left" for paragraphs and headings
 * Disable typography and color options for paragraphs and headings
 * Disable format types globaly but enable some for paragraphs and headings
 */

handleFormatTypes();

/**
 * Keep text align value always "left" for paragraphs and headings
 */
const stripHeadingTextAlign = createHigherOrderComponent( ( BlockEdit ) => {
  return ( props ) => {
    if ( props.name === 'core/heading' || props.name === 'core/paragraph' ) {
      const { updateBlockAttributes } = useDispatch( blockEditorStore );
      const { textAlign } = props.attributes;

      useEffect( () => {
        if ( textAlign ) {
          updateBlockAttributes( props.clientId, { textAlign: undefined } );
        }
      }, [ textAlign ] );
    }
    return <BlockEdit { ...props } />;
  };
}, 'stripHeadingTextAlign' );

addFilter( 'editor.BlockEdit', 'stanza/strip-heading-textalign', stripHeadingTextAlign );

/**
 * Disable typography and color options for paragraphs and headings
 */
/*addFilter( 'blocks.registerBlockType', 'stanza/changesupport', ( settings, name ) => {
	if ( 'core/heading' === name || 'core/paragraph' === name ) {
		return assign( {}, settings, {
			supports: merge( settings.supports, {
				typography: [],
				color: {
					text: false,
					background: false,
					gradients: false,
					defaultPalette: false
				}
			})
		});
	}

  return settings;
});*/

/**
 * Disable format types globaly but enable some for paragraphs and headings
 * https://salferrarello.com/unregisterformattype-for-specific-block-type-in-gutenberg/
 * wp.data.select('core/rich-text').getFormatTypes();
 */
function handleFormatTypes() {
	wp.richText.unregisterFormatType('core/strikethrough');
	wp.richText.unregisterFormatType('core/code');
	wp.richText.unregisterFormatType('core/subscript');
	wp.richText.unregisterFormatType('core/superscript');
	wp.richText.unregisterFormatType('core/text-color');
	wp.richText.unregisterFormatType('core/image');
	wp.richText.unregisterFormatType('core/keyboard');
	wp.richText.unregisterFormatType('core/language');

	const originalFormatTypes = [
		wp.data.select('core/rich-text')?.getFormatType('core/bold'),
		wp.data.select('core/rich-text')?.getFormatType('core/italic'),
		wp.data.select('core/rich-text')?.getFormatType('core/link'),
	];

	for (const formatType of originalFormatTypes) {
		if (formatType) {
		  const { edit } = formatType;

		  wp.richText.unregisterFormatType(formatType.name);

		  wp.richText.registerFormatType(formatType.name, {
		    ...formatType,
		    edit: (props) => {
		    	const selectedBlock = wp.data.select('core/block-editor').getSelectedBlock() || undefined;

		      if ('core/heading' === selectedBlock?.name) {
		        // Do not render formatType.name (i.e. no button, no keyboard shortcut).
		        return null;
		      }
		      if (
		      	'core/paragraph' === selectedBlock?.name
		      	&& selectedBlock?.attributes?.className?.includes('wp-element-stanza-subtitle')
		      	) {
		        return null;
		      }
		      // Render the original formatType.name (i.e. button, keyboard shortcut).
		      return edit(props);
		    },
		  });
		}
	}	
}