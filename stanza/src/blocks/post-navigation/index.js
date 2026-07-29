import { registerBlockType } from '@wordpress/blocks';
import metadata from './block.json';
import edit from './edit';
import save from './save';

import { Icon } from '@wordpress/components';
import { navigation as navigationIcon } from '@wordpress/icons';

import { supportsByOptions, setBlockOptionsAttribute, defaultsByOptions, registerBlockVariations, registerBlockStyles } from '../helpers';

//import './style.scss';
//import './editor.scss';

// Overwrite supports using stanza.json options
metadata = supportsByOptions('stanza/post-navigation', metadata);

// Overwrite attributes defaults using stanza.json options
metadata = defaultsByOptions('stanza/post-navigation', metadata);

// Set options using stanza.json options
metadata = setBlockOptionsAttribute('stanza/post-navigation', metadata, 'postNavigationOptions');

registerBlockType(metadata.name, {
	...metadata,
	icon: (
		<Icon icon={ navigationIcon } />
	),
	edit,
	save
});

// Register styles using stanza.json options
registerBlockStyles('stanza/post-navigation');

// Register variations using stanza.json options
registerBlockVariations('stanza/post-navigation');