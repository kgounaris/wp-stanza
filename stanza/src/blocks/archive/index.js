import { registerBlockType } from '@wordpress/blocks';
import metadata from './block.json';
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