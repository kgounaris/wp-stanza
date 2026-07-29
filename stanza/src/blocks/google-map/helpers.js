
export const newMap = (markers, el, googleMapOptions, clientId) => {
  const googleMap = new google.maps.Map(el, {
    center: { lat: markers[0]?.position?.lat || 0.0000000, lng: markers[0]?.position?.lng || 0.0000000 },
    mapId: `map-style-${clientId}`,
    zoom: markers[0] ? googleMapOptions.zoom : 0,
    streetViewControl: false,
    fullscreenControl: false,
    mapTypeControl: false,
    zoomControl: false,
    scrollwheel: false,
    gestureHandling: 'none',
    mapTypeId: google.maps.MapTypeId.MAP
  });

  return googleMap;
}

/**
 * Add a marker
 */
export const addMarker = (searchTerm, setSearchTerm, mapRef, markersRef, markers, icon, setAttributes) => {
  if (!searchTerm) return;

  const geocoder = new google.maps.Geocoder();
  geocoder.geocode({ address: searchTerm }, (results, status) => {
    if (status === 'OK') {
      const location = results[0].geometry.location;
      const newMarkerData = {
        position: { lat: location.lat(), lng: location.lng() },
        address: results[0].formatted_address,
        label: '', // Initialize label as empty
        icon: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(icon)}`
      };

      const marker = new google.maps.Marker({
        position: location,
        map: mapRef.current.mapInstance,
        icon: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(icon)}`
      });

      // Store the marker instance for manipulation (not serialized)
      markersRef.current.push(marker);

      // Update the markers attribute with serializable data
      //setAttributes({ markers: [...markers, newMarkerData] }); Multiple markers
      setAttributes({ markers: [newMarkerData] });
      setSearchTerm(''); // Clear search input
    } else {
      alert('Location not found.');
    }
  });
};

/**
 * Update a marker's label
 */
export const updateLabel = (index, newLabel) => {
  const updatedMarkers = markers.map((marker, i) =>
    i === index ? { ...marker, label: newLabel } : marker
  );
  console.log(updatedMarkers)
  setAttributes({ markers: updatedMarkers });
};

/**
 * Remove a marker
 */
export const removeMarker = (index) => {
  const markerToRemove = markersRef.current[index];
  if (markerToRemove) {
    markerToRemove.setMap(null); // Remove marker from map
  }

  // Remove marker from the instance list
  markersRef.current = markersRef.current.filter((_, i) => i !== index);

  // Update markers attribute to remove the corresponding serialized data
  const updatedMarkers = markers.filter((_, i) => i !== index);
  setAttributes({ markers: updatedMarkers });
};