import { newMap } from './helpers';

document.querySelectorAll('.wp-block-stanza-google-map__wrap').forEach(el => {
    const data = JSON.parse(el.dataset.googleMap);
   	const map = newMap(data.markers, el, data.googleMapOptions, data.clientId);
});