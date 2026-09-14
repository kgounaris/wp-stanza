import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import blockMetadata from './block.json';
// A local copy: the helpers below reassign it, and an ES import binding is read-only
// (a production build turns it into a const and throws at load time).
let metadata = { ...blockMetadata };
import edit from './edit';
import save from './save';

import { defaultsByOptions, registerBlockVariations, registerBlockStyles } from '../helpers';

//import './style.scss';
//import './editor.scss';

// Overwrite attributes defaults using stanza.json options
metadata = defaultsByOptions('stanza/header', metadata);

registerBlockType(metadata.name, {
	...metadata,
	edit,
	save
});

// Register styles using stanza.json options
registerBlockStyles('stanza/header');

// Register variations using stanza.json options
registerBlockVariations('stanza/header');