import { registerBlockType } from '@wordpress/blocks';
import metadata from './block.json';
import edit from './edit';
import save from './save';

import { supportsByOptions, defaultsByOptions, setBlockOptionsAttribute, registerBlockVariations, registerBlockStyles } from '../helpers';
import { attributes as mediaAttributes } from '../media/attributes'

//import './style.scss';
//import './editor.scss';

// Inject Media block attributes
metadata.attributes = {
	...metadata.attributes,
	...mediaAttributes
}

// Overwrite supports using stanza.json options
metadata = supportsByOptions('stanza/hero-media', metadata);

// Overwrite attributes defaults using stanza.json options
metadata = defaultsByOptions('stanza/hero-media', metadata)

// Set options using stanza.json options
metadata = setBlockOptionsAttribute('stanza/hero-media', metadata, 'heroMediaOptions');

registerBlockType(metadata.name, {
	...metadata,
	edit,
	save
});

// Register styles using stanza.json options
registerBlockStyles('stanza/hero-media');

// Register variations using stanza.json options
registerBlockVariations('stanza/hero-media');