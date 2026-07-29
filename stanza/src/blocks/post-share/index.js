import { registerBlockType } from '@wordpress/blocks';
import metadata from './block.json';
import edit from './edit';
import save from './save';

import { Icon } from '@wordpress/components';
import { share as shareIcon } from '@wordpress/icons';

import { supportsByOptions, setBlockOptionsAttribute, defaultsByOptions, registerBlockVariations, registerBlockStyles } from '../helpers';

//import './style.scss';
//import './editor.scss';

// Overwrite supports using stanza.json options
metadata = supportsByOptions('stanza/post-share', metadata);

// Overwrite attributes defaults using stanza.json options
metadata = defaultsByOptions('stanza/post-share', metadata);

// Set options using stanza.json options
metadata = setBlockOptionsAttribute('stanza/post-share', metadata, 'postShareOptions');

registerBlockType(metadata.name, {
	...metadata,
	icon: (
		<Icon icon={ shareIcon } />
	),
	edit,
	save
});

// Register styles using stanza.json options
registerBlockStyles('stanza/post-share');

// Register variations using stanza.json options
registerBlockVariations('stanza/post-share');