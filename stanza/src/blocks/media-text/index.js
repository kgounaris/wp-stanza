import { registerBlockType } from '@wordpress/blocks';
import metadata from './block.json';
import edit from './edit';
import save from './save';

import { Icon } from '@wordpress/components';
import { mediaAndText as mediaAndTextIcon } from '@wordpress/icons';

import { supportsByOptions, defaultsByOptions, setBlockOptionsAttribute, registerBlockVariations, registerBlockStyles } from '../helpers';
import { attributes as mediaAttributes } from '../media/attributes'

import './style.scss';
//import './editor.scss';

// Inject Media block attributes
metadata.attributes = {
	...metadata.attributes,
	...mediaAttributes
}

// Overwrite supports using stanza.json options
metadata = supportsByOptions('stanza/media-text', metadata);

// Overwrite attributes defaults using stanza.json options
metadata = defaultsByOptions('stanza/media-text', metadata)

// Set options using stanza.json options
metadata = setBlockOptionsAttribute('stanza/media-text', metadata, 'mediaTextOptions');

registerBlockType(metadata.name, {
	...metadata,
	icon: (
		<Icon icon={ mediaAndTextIcon } />
	),
	edit,
	save
});

// Register styles using stanza.json options
registerBlockStyles('stanza/media-text');

// Register variations using stanza.json options
registerBlockVariations('stanza/media-text');