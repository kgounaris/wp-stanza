/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/blocks/google-map/helpers.js":
/*!******************************************!*\
  !*** ./src/blocks/google-map/helpers.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addMarker: () => (/* binding */ addMarker),
/* harmony export */   newMap: () => (/* binding */ newMap),
/* harmony export */   removeMarker: () => (/* binding */ removeMarker),
/* harmony export */   updateLabel: () => (/* binding */ updateLabel)
/* harmony export */ });
const newMap = (markers, el, googleMapOptions, clientId) => {
  const googleMap = new google.maps.Map(el, {
    center: {
      lat: markers[0]?.position?.lat || 0.0000000,
      lng: markers[0]?.position?.lng || 0.0000000
    },
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
};

/**
 * Add a marker
 */
const addMarker = (searchTerm, setSearchTerm, mapRef, markersRef, markers, icon, setAttributes) => {
  if (!searchTerm) return;
  const geocoder = new google.maps.Geocoder();
  geocoder.geocode({
    address: searchTerm
  }, (results, status) => {
    if (status === 'OK') {
      const location = results[0].geometry.location;
      const newMarkerData = {
        position: {
          lat: location.lat(),
          lng: location.lng()
        },
        address: results[0].formatted_address,
        label: '',
        // Initialize label as empty
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
      setAttributes({
        markers: [newMarkerData]
      });
      setSearchTerm(''); // Clear search input
    } else {
      alert('Location not found.');
    }
  });
};

/**
 * Update a marker's label
 */
const updateLabel = (index, newLabel) => {
  const updatedMarkers = markers.map((marker, i) => i === index ? {
    ...marker,
    label: newLabel
  } : marker);
  console.log(updatedMarkers);
  setAttributes({
    markers: updatedMarkers
  });
};

/**
 * Remove a marker
 */
const removeMarker = index => {
  const markerToRemove = markersRef.current[index];
  if (markerToRemove) {
    markerToRemove.setMap(null); // Remove marker from map
  }

  // Remove marker from the instance list
  markersRef.current = markersRef.current.filter((_, i) => i !== index);

  // Update markers attribute to remove the corresponding serialized data
  const updatedMarkers = markers.filter((_, i) => i !== index);
  setAttributes({
    markers: updatedMarkers
  });
};

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!***************************************!*\
  !*** ./src/blocks/google-map/view.js ***!
  \***************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helpers */ "./src/blocks/google-map/helpers.js");

document.querySelectorAll('.wp-block-stanza-google-map__wrap').forEach(el => {
  const data = JSON.parse(el.dataset.googleMap);
  const map = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.newMap)(data.markers, el, data.googleMapOptions, data.clientId);
});
})();

/******/ })()
;
//# sourceMappingURL=view.js.map