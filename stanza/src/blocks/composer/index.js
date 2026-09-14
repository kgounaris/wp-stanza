import { registerBlockType } from '@wordpress/blocks';
import blockMetadata from './block.json';
// A local copy: the helpers below reassign it, and an ES import binding is read-only
// (a production build turns it into a const and throws at load time).
let metadata = { ...blockMetadata };
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