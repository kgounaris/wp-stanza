import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import metadata from './block.json';
import edit from './edit';
import save from './save';

import { Icon } from '@wordpress/components';
import { gallery as galleryIcon } from '@wordpress/icons';

import { supportsByOptions, defaultsByOptions, registerBlockVariations, setBlockOptionsAttribute, registerBlockStyles } from '../helpers';

//import './style.scss';
//import './editor.scss';

// Overwrite supports using stanza.json options
metadata = supportsByOptions('stanza/gallery', metadata);

// Overwrite attributes defaults using stanza.json options
metadata = defaultsByOptions('stanza/gallery', metadata);

// Set options using stanza.json options
metadata = setBlockOptionsAttribute('stanza/gallery', metadata, 'galleryOptions');

registerBlockType(metadata.name, {
	...metadata,
	icon: (
		<Icon icon={ galleryIcon } />
	),
	edit,
	save
});

// Register styles using stanza.json options
registerBlockStyles('stanza/gallery');

// Register variations using stanza.json options
registerBlockVariations('stanza/gallery');