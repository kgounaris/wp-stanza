
import { __ } from '@wordpress/i18n';
import { useInnerBlocksProps, useBlockProps, InspectorControls, store as blockEditorStore } from '@wordpress/block-editor';
import { PanelBody, TextControl, Button, RangeControl } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { useEffect, useState, useRef } from '@wordpress/element';

import { StanzaPanelColorSettings, StanzaAttrsPanelBody } from '../components';
import { setAlignLayoutBackground } from '../helpers';
import { wpData } from '../wp-data';
import { addMarker, newMap } from './helpers';

export default function Edit({ attributes, setAttributes, clientId }) {
	const { align, backgroundColor, googleMapOptions, layout, markers, parentId } = attributes;
	const { entityRecord } = wpData();
	// Map
	const [searchTerm, setSearchTerm] = useState('');
  const mapRef = useRef(null); // Reference to the map container
  const markersRef = useRef([]);
  // .
  // SVG Icons
  const mapMarkerIcon = 
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="48" height="48" aria-hidden="true" focusable="false"><path d="M12 9c-.8 0-1.5.7-1.5 1.5S11.2 12 12 12s1.5-.7 1.5-1.5S12.8 9 12 9zm0-5c-3.6 0-6.5 2.8-6.5 6.2 0 .8.3 1.8.9 3.1.5 1.1 1.2 2.3 2 3.6.7 1 3 3.8 3.2 3.9l.4.5.4-.5c.2-.2 2.6-2.9 3.2-3.9.8-1.2 1.5-2.5 2-3.6.6-1.3.9-2.3.9-3.1C18.5 6.8 15.6 4 12 4zm4.3 8.7c-.5 1-1.1 2.2-1.9 3.4-.5.7-1.7 2.2-2.4 3-.7-.8-1.9-2.3-2.4-3-.8-1.2-1.4-2.3-1.9-3.3-.6-1.4-.7-2.2-.7-2.5 0-2.6 2.2-4.7 5-4.7s5 2.1 5 4.7c0 .2-.1 1-.7 2.4z"></path></svg>`;
	
	// Set align layout and default background
	setAlignLayoutBackground('stanza/google-map', clientId, setAttributes, backgroundColor, align, layout, parentId);

	// Initialize Google Map when the block is mounted
  useEffect(() => {
    const googleMap = newMap(markers, mapRef.current, googleMapOptions, clientId);
    mapRef.current.mapInstance = googleMap;

    // Add existing markers to the map
    if (markers.length) {
	    markers.forEach((markerData, i) => {
	      const iconSvg = mapMarkerIcon
	      const marker = new google.maps.Marker({
	        position: markerData.position,
	        map: googleMap,
	        title: markerData.label || '', // Set the marker title to the label
	        icon: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(iconSvg)}`
	      });
	      markersRef.current.push(marker);
	    });    	
    }

    // Set map center
    if (markers.length) {
	  	mapRef.current.mapInstance.setCenter({lat: markers[0]?.position?.lat, lng: markers[0]?.position?.lng});    	
    }
  }, [markers]);

  // Set map id
  useEffect(() => {
  	setAttributes({ googleMapOptions: {...(googleMapOptions || {}), mapId: clientId} })
  }, [clientId]);

  // Update zoom
  useEffect(() => {
  	mapRef.current.mapInstance.setZoom(googleMapOptions.zoom);
  }, [googleMapOptions.zoom]);

	const blockProps = useBlockProps({
		className: [			
			backgroundColor ? `has-${backgroundColor}-background-color has-background-color` : '',
		].filter(Boolean).join(' ')
	});
	
	const innerBlocksProps = useInnerBlocksProps(
		layout ? { className: 'wp-block-stanza-google-map__inner' } : blockProps,
		{
			layout: layout
		}
	);

	return (
    	<>
    		<InspectorControls>
					<StanzaAttrsPanelBody attributes={ attributes } />

					<PanelBody title={__('Settings', 'stanza')}>
						<TextControl
	            label={__('Search for a location', 'stanza')}
	            placeholder={__('Enter a valid Google Map address', 'stanza')}
	            value={searchTerm}
	            help={markers[0]?.address || ''}
	            onChange={(value) => setSearchTerm(value)}
	            __nextHasNoMarginBottom // Something about styles depreacted
	            __next40pxDefaultSize
	            onKeyDown={(event) => {
				        if (event.key === 'Enter') {
			            //event.preventDefault();
			            addMarker(searchTerm, setSearchTerm, mapRef, markersRef, markers, mapMarkerIcon, setAttributes);
				        }
				    	}}
	          />
	          <div className="components-base-control">
		          <Button isPrimary onClick={() => {
		          	addMarker(searchTerm, setSearchTerm, mapRef, markersRef, markers, mapMarkerIcon, setAttributes);
		          }}>{markers[0] ? __('Replace marker', 'stanza') : __('Add marker', 'stanza')}</Button>
		        </div>

	          <RangeControl
		            label={ __('Zoom', 'stanza') }
		            value={ googleMapOptions.zoom || 0 }
		            onChange={ ( newZoom ) => setAttributes({ googleMapOptions: {...(googleMapOptions || {}), zoom: newZoom} }) }
		            min={ 0 }
		            max={ 20 }
		            step={ .5 }
		            __nextHasNoMarginBottom
		            __next40pxDefaultSize
		        /> 
	      </PanelBody>
			</InspectorControls>

			{
			// Add wp-block-stanza-google-map__inner wrapper only if has NOT parent block
			! parentId ? (
				<>
	    		<InspectorControls group="styles">
						<StanzaPanelColorSettings
	              setAttributes={ setAttributes }
	              colorAttribute={ backgroundColor }
	              palette={window?.Stanza?.blocks['stanza/google-map']?.attributes?.backgroundColor?.options}
	          />
					</InspectorControls>

    			<div { ...blockProps }>
    				<div {...innerBlocksProps}>
    					<div
                ref={mapRef}
                className="wp-block-stanza-google-map__wrap"
                >		                    	
              </div>
    				</div>
    			</div>
    			</>
			) : (
				<div { ...blockProps }>
					<div
            ref={mapRef}
            className="wp-block-stanza-google-map__wrap"
            >		                    	
          </div>
				</div>
			)}    		
    	</>
    );
}
