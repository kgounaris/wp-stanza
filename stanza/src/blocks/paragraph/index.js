import { __ } from '@wordpress/i18n';
import { registerBlockType, getBlockType, createBlock } from '@wordpress/blocks';
import metadata from './block.json';

import { registerBlockVariations, registerBlockStyles } from '../helpers';

registerBlockType( metadata.name, {
	title: metadata.title,
	description: metadata.description,
	icon: metadata.icon,
	attributes: metadata.attributes,
	transforms: {
		to: [
			{
				type: 'block',
				blocks: [ 'core/paragraph' ],
				transform: ( attributes ) => {
					return createBlock( 'core/paragraph', {
					content: attributes.content,
					placeholder: attributes.placeholder
				} );
				},
			},
		],
		from: [
			{
				type: 'block',
				blocks: [ 'core/paragraph' ],
				transform: ( attributes ) => {
					return createBlock( 'stanza/paragraph', {
					content: attributes.content,
					placeholder: attributes.placeholder
				} );
				},
			},
		]
	},
	edit( props ) {
		const { attributes, setAttributes } = props;

		// 🔑 Get core paragraph *here*, at render time
		const coreParagraph = getBlockType( 'core/paragraph' );

		if ( ! coreParagraph ) {
			// Failsafe: core blocks not ready yet
			return null;
		}

		// enforce our className
		/*if ( attributes.className !== 'is-style-lead-paragraph' ) {
			setAttributes( { className: 'is-style-lead-paragraph' } );
		}*/


		// pass a custom placeholder
		const patchedProps = {
			...props,
			attributes: {
				...attributes
			},
		};

		return coreParagraph.edit( patchedProps );
	},

	save( props ) {
		const coreParagraph = getBlockType( 'core/paragraph' );

		if ( ! coreParagraph ) {
			return null;
		}

		return coreParagraph.save( props );
	},
} );

// Register styles using stanza.json options
registerBlockStyles('stanza/paragraph');

// Register variations using stanza.json options
registerBlockVariations('stanza/paragraph');