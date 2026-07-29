import { registerBlockType } from '@wordpress/blocks';
import metadata from './block.json';
import edit from './edit';
import save from './save';

import { Icon } from '@wordpress/components';
import { layout as layoutIcon } from '@wordpress/icons';

import { supportsByOptions, defaultsByOptions, setBlockOptionsAttribute, registerBlockVariations, registerBlockStyles } from '../helpers';

//import './style.scss';
import './editor.scss';

// Overwrite supports using stanza.json options
metadata = supportsByOptions('stanza/post-template', metadata);

// Overwrite attributes defaults using stanza.json options
metadata = defaultsByOptions('stanza/post-template', metadata);

// Set options using stanza.json options
metadata = setBlockOptionsAttribute('stanza/post-template', metadata, 'postTemplateOptions');

registerBlockType( metadata.name, {
	...metadata,
	icon: (
		<Icon icon={ layoutIcon } />
	),	
	edit,
	save
} );

// Register styles using stanza.json options
registerBlockStyles('stanza/post-template');

// Register variations using stanza.json options
registerBlockVariations('stanza/post-template');