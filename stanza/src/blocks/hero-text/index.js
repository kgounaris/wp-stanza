import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import metadata from './block.json';
import edit from './edit';
import save from './save';

import { Icon } from '@wordpress/components';
import { postExcerpt as postExcerptIcon } from '@wordpress/icons';

import { supportsByOptions, defaultsByOptions, registerBlockVariations, registerBlockStyles } from '../helpers';

//import './style.scss';
//import './editor.scss';

// Overwrite supports using stanza.json options
metadata = supportsByOptions('stanza/hero-text', metadata);

// Overwrite attributes defaults using stanza.json options
metadata = defaultsByOptions('stanza/hero-text', metadata);

// Set options using stanza.json options
//metadata = setBlockOptionsAttribute('stanza/hero-text', metadata, 'heroTextOptions');

registerBlockType(metadata.name, {
	...metadata,
	icon: (
		<Icon icon={ postExcerptIcon } />
	),
	edit,
	save
});

// Register styles using stanza.json options
registerBlockStyles('stanza/hero-text');

// Register variations using stanza.json options
registerBlockVariations('stanza/hero-text');