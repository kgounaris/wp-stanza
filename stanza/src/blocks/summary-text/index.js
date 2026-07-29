import { registerBlockType } from '@wordpress/blocks';
import metadata from './block.json';
import edit from './edit';
import save from './save';

import { Icon } from '@wordpress/components';
import { postContent as postContentIcon } from '@wordpress/icons';

import { supportsByOptions, setBlockOptionsAttribute, defaultsByOptions, registerBlockVariations, registerBlockStyles } from '../helpers';

//import './style.scss';
//import './editor.scss';

// Overwrite supports using stanza.json options
metadata = supportsByOptions('stanza/summary-text', metadata);

// Overwrite attributes defaults using stanza.json options
metadata = defaultsByOptions('stanza/summary-text', metadata);

// Set options using stanza.json options
metadata = setBlockOptionsAttribute('stanza/summary-text', metadata, 'summaryTextOptions');

registerBlockType(metadata.name, {
	...metadata,
	icon: (
		<Icon icon={ postContentIcon } />
	),
	edit,
	save
});

// Register styles using stanza.json options
registerBlockStyles('stanza/summary-text');

// Register variations using stanza.json options
registerBlockVariations('stanza/summary-text');