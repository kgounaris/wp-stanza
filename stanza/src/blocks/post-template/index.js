import { registerBlockType } from '@wordpress/blocks';
import blockMetadata from './block.json';
// A local copy: the helpers below reassign it, and an ES import binding is read-only
// (a production build turns it into a const and throws at load time).
let metadata = { ...blockMetadata };
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