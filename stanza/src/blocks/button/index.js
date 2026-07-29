import { registerBlockType } from '@wordpress/blocks';
import metadata from './block.json';
import edit from './edit';
import save from './save';

import { Icon } from '@wordpress/components';
import { button as buttonIcon } from '@wordpress/icons';

import { supportsByOptions, defaultsByOptions, registerBlockVariations, registerBlockStyles } from '../helpers';

//import './style.scss';
//import './editor.scss';

// Overwrite supports using stanza.json options
metadata = supportsByOptions('stanza/button', metadata);

// Overwrite attributes defaults using stanza.json options
metadata = defaultsByOptions('stanza/button', metadata);

registerBlockType(metadata.name, {
	...metadata,
	icon: (
		<Icon icon={ buttonIcon } />
	),
	edit,
	save
});

// Register styles using stanza.json options
registerBlockStyles('stanza/button');

// Register variations using stanza.json options
registerBlockVariations('stanza/button');