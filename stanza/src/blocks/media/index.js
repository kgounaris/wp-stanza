import { registerBlockType, createBlock } from '@wordpress/blocks';
import metadata from './block.json';
import edit from './edit';
import save from './save';

import { Icon } from '@wordpress/components';
import { media as mediaIcon } from '@wordpress/icons';

import { supportsByOptions, defaultsByOptions, setBlockOptionsAttribute, registerBlockVariations, registerBlockStyles } from '../helpers';

import { attributes } from './attributes'

import './style.scss';
import './editor.scss';

// Declare align here to distinguish from other attributes from './attributes' TOD: remove?
attributes.align = {
	type: 'string'
}

// Inject Media block attributes
metadata.attributes = {
	...attributes,
}

// Context
metadata.usesContext = [ "postId", "postType" ];

// Overwrite supports using stanza.json options
metadata = supportsByOptions('stanza/media', metadata);

// Overwrite attributes defaults using stanza.json options
metadata = defaultsByOptions('stanza/media', metadata);

// Set options using stanza.json options
metadata = setBlockOptionsAttribute('stanza/media', metadata, 'mediaOptions');

registerBlockType(metadata.name, {
	...metadata,
	icon: (
		<Icon icon={ mediaIcon } />
	),
	edit,
	save/*,
	transforms: {
		from: [
			{
				type: 'block',
				blocks: [ 'core/image' ],

				transform: ( attributes ) => {
					const {
						id,
						url,
						alt,
						caption,
						title,
						align,
						sizeSlug,
						width,
						height,
						href,
						linkDestination,
						linkTarget,
						rel,
						className,
						metadata: blockMetadata,
					} = attributes;

					return createBlock( 'stanza/media', {
						mediaType: 'image',

						// Adjust these names to your stanza/media attributes.
						mediaId: id,
						mediaUrl: url,
						mediaIdPredefined: true,
						mediaAlt: alt,
						mediaCaption: caption,

						// Optional: preserve useful core/image settings.
						mediaImageSize: sizeSlug,
						mediaHref: href,
						mediaRel: rel,
						metadata: blockMetadata
					} );
				},
			},
		],
	}*/
});

// Register styles using stanza.json options
registerBlockStyles('stanza/media');

// Register variations using stanza.json options
registerBlockVariations('stanza/media');