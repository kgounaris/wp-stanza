import { registerBlockType } from '@wordpress/blocks';
import blockMetadata from './block.json';
// A local copy: the helpers below reassign it, and an ES import binding is read-only
// (a production build turns it into a const and throws at load time).
let metadata = { ...blockMetadata };
import edit from './edit';
import save from './save';

import { supportsByOptions, defaultsByOptions, registerBlockVariations, registerBlockStyles } from '../helpers';

//import './style.scss';
//import './editor.scss';

// Overwrite supports using stanza.json options
metadata = supportsByOptions('stanza/teaser', metadata);

// Overwrite attributes defaults using stanza.json options
metadata = defaultsByOptions('stanza/teaser', metadata);

registerBlockType(metadata.name, {
	...metadata,
	edit,
	save
});

// Register styles using stanza.json options
registerBlockStyles('stanza/teaser');

// Register variations using stanza.json options
registerBlockVariations('stanza/teaser');