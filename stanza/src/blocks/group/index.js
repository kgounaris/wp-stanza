import { registerBlockType } from '@wordpress/blocks';
import metadata from './block.json';
import edit from './edit';
import save from './save';

import { Icon } from '@wordpress/components';
import { group as groupIcon } from '@wordpress/icons';

import { supportsByOptions, setBlockOptionsAttribute, defaultsByOptions, registerBlockVariations, registerBlockStyles } from '../helpers';

//import './style.scss';
//import './editor.scss';

// Overwrite supports using stanza.json options
metadata = supportsByOptions('stanza/group', metadata);

// Overwrite attributes defaults using stanza.json options
metadata = defaultsByOptions('stanza/group', metadata);

// Set options using stanza.json options
metadata = setBlockOptionsAttribute('stanza/group', metadata, 'groupOptions');

registerBlockType(metadata.name, {
	...metadata,
	icon: (
		<Icon icon={ groupIcon } />
	),
	edit,
	save
});

// Register styles using stanza.json options
registerBlockStyles('stanza/group');

// Register variations using stanza.json options
registerBlockVariations('stanza/group');