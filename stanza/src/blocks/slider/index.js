import { registerBlockType } from '@wordpress/blocks';
import metadata from './block.json';
import Edit from './edit';
import save from './save';

import { supportsByOptions, defaultsByOptions, setBlockOptionsAttribute, registerBlockVariations, registerBlockStyles } from '../helpers';

// Swiper imports for EDITOR (live preview)
import Swiper, { Navigation, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import './style.scss';
import './editor.scss';

// Overwrite supports using stanza.json options
metadata = supportsByOptions('stanza/slider', metadata);

// Overwrite attributes defaults using stanza.json options
metadata = defaultsByOptions('stanza/slider', metadata);

// Set options using stanza.json options
metadata = setBlockOptionsAttribute('stanza/slider', metadata, 'sliderOptions');

registerBlockType(metadata.name, {
	...metadata,
	edit: ( props ) => <Edit { ...props } SwiperLib={ Swiper } />,
	save
});

// Register styles using stanza.json options
registerBlockStyles('stanza/slider');

// Register variations using stanza.json options
registerBlockVariations('stanza/slider');