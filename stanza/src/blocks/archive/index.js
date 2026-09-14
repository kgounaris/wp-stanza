import { registerBlockType } from '@wordpress/blocks';
import blockMetadata from './block.json';
// A local copy: the helpers below reassign it, and an ES import binding is read-only
// (a production build turns it into a const and throws at load time).
let metadata = { ...blockMetadata };
import edit from './edit';
import save from './save';

import { supportsByOptions, defaultsByOptions, setBlockOptionsAttribute, registerBlockVariations, registerBlockStyles } from '../helpers';

import './style.scss';
//import './editor.scss';

// Overwrite supports using stanza.json options
metadata = supportsByOptions('stanza/archive', metadata);

// Overwrite attributes defaults using stanza.json options
metadata = defaultsByOptions('stanza/archive', metadata);

// Set options using stanza.json options
metadata = setBlockOptionsAttribute('stanza/archive', metadata, 'archiveOptions');

registerBlockType( metadata.name, {
	...metadata,	
	edit,
	save
} );

// Register styles using stanza.json options
registerBlockStyles('stanza/archive');

// Register variations using stanza.json options
registerBlockVariations('stanza/archive');