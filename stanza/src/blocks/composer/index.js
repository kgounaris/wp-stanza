import { registerBlockType } from '@wordpress/blocks';
import metadata from './block.json';
import edit from './edit';
import save from './save';

import { supportsByOptions, defaultsByOptions, registerBlockVariations, registerBlockStyles, registerBlockTypes } from '../helpers';

//import './style.scss';
//import './editor.scss';

// Overwrite supports using stanza.json options
metadata = supportsByOptions('stanza/composer', metadata);

// Overwrite attributes defaults using stanza.json options
metadata = defaultsByOptions('stanza/composer', metadata);

registerBlockType(metadata.name, {
	...metadata,
	edit,
	save
});

// Register styles using stanza.json options
registerBlockStyles('stanza/composer');

// Register variations using stanza.json options
registerBlockVariations('stanza/composer');

// Register block types using stanza.json options
registerBlockTypes('stanza/composer');