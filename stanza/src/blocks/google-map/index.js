import { registerBlockType } from '@wordpress/blocks';
import metadata from './block.json';
import edit from './edit';
import save from './save';

import { Icon } from '@wordpress/components';
import { mapMarker as mapMarkerIcon } from '@wordpress/icons';

import { supportsByOptions, defaultsByOptions, registerBlockVariations, registerBlockStyles } from '../helpers';

import './style.scss';
import './editor.scss';

// Overwrite supports using stanza.json options
metadata = supportsByOptions('stanza/google-map', metadata);

// Overwrite attributes defaults using stanza.json options
metadata = defaultsByOptions('stanza/google-map', metadata);

registerBlockType(metadata.name, {
	...metadata,
	icon: (
		<Icon icon={ mapMarkerIcon } />
	),
	edit,
	save
});

// Register styles using stanza.json options
registerBlockStyles('stanza/google-map');

// Register variations using stanza.json options
registerBlockVariations('stanza/google-map');