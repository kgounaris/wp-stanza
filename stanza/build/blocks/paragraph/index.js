/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/blocks/helpers.js":
/*!*******************************!*\
  !*** ./src/blocks/helpers.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   defaultsByOptions: () => (/* binding */ defaultsByOptions),
/* harmony export */   registerBlockStyles: () => (/* binding */ registerBlockStyles),
/* harmony export */   registerBlockTypes: () => (/* binding */ registerBlockTypes),
/* harmony export */   registerBlockVariations: () => (/* binding */ registerBlockVariations),
/* harmony export */   setAlignLayoutBackground: () => (/* binding */ setAlignLayoutBackground),
/* harmony export */   setBlockOptionsAttribute: () => (/* binding */ setBlockOptionsAttribute),
/* harmony export */   supportsByOptions: () => (/* binding */ supportsByOptions)
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_4__);






/**
 * Set align layout and default background
 */
const setAlignLayoutBackground = (block, clientId, setAttributes, backgroundColor, align, layout = undefined, parentId = undefined) => {
  const rootClientId = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_3__.useSelect)(select => select(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.store).getBlockRootClientId(clientId), [clientId]);

  // Disable align and layout if has parent block
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.useEffect)(() => {
    if (!rootClientId) return;
    setAttributes({
      parentId: rootClientId,
      layout: undefined,
      align: ''
    });
  }, [rootClientId, layout, align]);
  if ('stanza/media' == block) return rootClientId; // TODO: conflict with backgroundColor & mediaBackgroundColor

  // Set default background color by force
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.useEffect)(() => {
    // For variations
    /*if ( 'undefined' == backgroundColor || undefined == backgroundColor ) {
    	setAttributes({ backgroundColor: undefined });
    	return;
    }*/

    if (rootClientId) {
      setAttributes({
        backgroundColor: undefined
      });
    }
    if (!backgroundColor && !rootClientId && window?.Stanza?.blocks[block]?.attributes?.backgroundColor?.default) {
      setAttributes({
        backgroundColor: window?.Stanza?.blocks[block]?.attributes?.backgroundColor?.default
      });
    }
  }, [rootClientId]);
  return rootClientId;
};

/**
 * Overwrite supports using stanza.json options
 * "align" has to be both in attributes & supports (boolean or array)
 * "layout" has to be only in supports
 */
const supportsByOptions = (block, metadata) => {
  var _window$Stanza;
  const Stanza = (_window$Stanza = window?.Stanza) !== null && _window$Stanza !== void 0 ? _window$Stanza : undefined;
  if (!metadata?.supports || !Stanza?.blocks?.[block]?.supports) return metadata;
  Object.entries(metadata?.supports).forEach(([key, value]) => {
    if ('undefined' !== typeof Stanza?.blocks?.[block]?.supports?.[key]) {
      const generalSetting = 'undefined' !== typeof Stanza?.supports?.[key] ? Stanza?.supports?.[key] : true;
      metadata.supports[key] = generalSetting ? Stanza.blocks[block].supports[key] : false;
    }
  });
  return metadata;
};

/**
 * Overwrite attributes defaults using stanza.json options
 * align
 * globalPadding
 * mediaImageSize
 * mediaAspectRatio
 * template
 * subtitlePosition
 */
const defaultsByOptions = (block, metadata) => {
  var _window$Stanza2;
  const Stanza = (_window$Stanza2 = window?.Stanza) !== null && _window$Stanza2 !== void 0 ? _window$Stanza2 : undefined;
  if (!metadata?.attributes || !Stanza?.blocks?.[block]?.attributes) return metadata;
  Object.entries(metadata?.attributes).forEach(([key, value]) => {
    if ('undefined' !== typeof Stanza?.blocks?.[block]?.attributes?.[key]?.default) {
      metadata.attributes[key].default = Stanza.blocks[block].attributes[key].default;
    }
  });
  return metadata;
};

/**
 * Set attributes options using stanza.json options
 * Exclude align, backgroundColor, layout (TODO: is it necessary?)
 * 
 * 
 * mediaPosition
 * mediaImageSizes // TODO: Exception because it is an attribute as well because of on select new media. Does it realy need to be an attribute?
 * innerBlock
 * mediaAspectRatio
 */
const setBlockOptionsAttribute = (block, metadata, optionsAttr = '') => {
  var _window$Stanza3;
  const Stanza = (_window$Stanza3 = window?.Stanza) !== null && _window$Stanza3 !== void 0 ? _window$Stanza3 : undefined;
  if (!metadata?.attributes || !Stanza?.blocks?.[block]?.attributes) return metadata;
  Object.entries(metadata?.attributes).forEach(([key, value]) => {
    if (optionsAttr && 'undefined' !== typeof Stanza?.blocks?.[block]?.attributes?.[key]?.options) {
      metadata.attributes[optionsAttr].default[key] = Stanza.blocks[block].attributes[key].options;
    }
  });
  return metadata;
};

/**
 * Register styles using stanza.json options
 * TODO: Somehow handle style, variation pair inside edit.js
 */
const registerBlockStyles = block => {
  var _window$Stanza4;
  const Stanza = (_window$Stanza4 = window?.Stanza) !== null && _window$Stanza4 !== void 0 ? _window$Stanza4 : undefined;
  const styles = Stanza?.blocks?.[block]?.styles;
  const stylesArray = [];
  if (!styles || !styles.length) {
    return;
  }
  for (const s of styles) {
    const [name, label] = Object.entries(s)[0];
    const isDefault = s?.isDefault;
    stylesArray.push({
      name: name,
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)(label, 'stanza'),
      isDefault: isDefault
    });
  }
  wp.blocks.registerBlockStyle(block, stylesArray);
};

/**
 * Register variations using stanza.json options
 */
const registerBlockVariations = block => {
  var _window$Stanza5;
  const Stanza = (_window$Stanza5 = window?.Stanza) !== null && _window$Stanza5 !== void 0 ? _window$Stanza5 : undefined;
  const variations = Stanza?.blocks?.[block]?.variations;
  const variationsArray = [];
  if (!variations || !variations.length) {
    return;
  }
  for (const v of variations) {
    variationsArray.push({
      name: v.name,
      title: v.title,
      description: v.description,
      icon: v.icon,
      attributes: v.attributes,
      scope: v.scope,
      isActive: v.isActive,
      isDefault: v.isDefault
    });
  }
  wp.blocks.registerBlockVariation(block, variationsArray);
};

/**
 * Register block types using stanza.json options
 */
const registerBlockTypes = block => {
  var _window$Stanza6;
  const Stanza = (_window$Stanza6 = window?.Stanza) !== null && _window$Stanza6 !== void 0 ? _window$Stanza6 : undefined;
  const newBlocks = Stanza?.blocks?.[block]?.registerBlocks;
  const newBlocksArray = [];
  if (!newBlocks || !newBlocks.length) {
    return;
  }
  for (const nb of newBlocks) {
    // Same attributes declaration at src/blocks/composer/index.php
    let newMetadata = {
      apiVersion: 3,
      name: `${block}-${nb.name}`,
      title: nb.title,
      icon: nb.icon,
      category: nb.category || 'design',
      description: nb.description,
      "attributes": {
        "align": {
          "type": "string"
        },
        "backgroundColor": {
          "type": "string"
        },
        "blockName": {
          "type": "string",
          "default": `${block}-${nb.name}`
        },
        "template": {
          "type": "array"
        },
        "mediaPosition": {
          "type": "string"
        },
        "useInnerBlockWrapper": {
          "type": "boolean",
          "default": true
        }
      },
      "supports": {
        "anchor": true,
        "inserter": true,
        "align": true,
        //"multiple": false,
        "layout": {
          "allowCustomContentAndWideSize": false,
          "default": {
            "type": "default",
            "justifyContent": "center"
          }
        }
      }
    };

    // Overwrite supports using stanza.json options
    newMetadata = supportsByOptions(`${block}-${nb.name}`, newMetadata);

    // Overwrite attributes defaults using stanza.json options
    newMetadata = defaultsByOptions(`${block}-${nb.name}`, newMetadata);
    (0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__.registerBlockType)(`${block}-${nb.name}`, {
      ...newMetadata,
      edit(props) {
        const {
          attributes,
          setAttributes,
          clientId
        } = props;
        const {
          backgroundColor
        } = attributes;

        // Set align layout and default background
        setAlignLayoutBackground(`${block}-${nb.name}`, clientId, setAttributes, backgroundColor /*, parentId*/);
        const newBlock = (0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__.getBlockType)(block);
        return newBlock.edit(props);
      },
      save(props) {
        const newBlock = (0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__.getBlockType)(block);
        if (!newBlock) {
          return null;
        }
        return newBlock.save(props);
      }
    });

    // Register styles using stanza.json options
    registerBlockStyles(`${block}-${nb.name}`);

    // Register variations using stanza.json options
    registerBlockVariations(`${block}-${nb.name}`);
  }
};

/***/ }),

/***/ "./src/blocks/paragraph/block.json":
/*!*****************************************!*\
  !*** ./src/blocks/paragraph/block.json ***!
  \*****************************************/
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"apiVersion":3,"name":"stanza/paragraph","title":"Featured paragraph","description":"A paragraph used in templates.","category":"text","icon":"editor-paragraph","attributes":{"content":{"type":"string","source":"html","selector":"p"},"placeholder":{"type":"string","default":"Featured paragraph"}},"supports":{"splitting":true},"editorScript":["stanza-config","file:./index.js"]}');

/***/ }),

/***/ "@wordpress/block-editor":
/*!*************************************!*\
  !*** external ["wp","blockEditor"] ***!
  \*************************************/
/***/ ((module) => {

module.exports = window["wp"]["blockEditor"];

/***/ }),

/***/ "@wordpress/blocks":
/*!********************************!*\
  !*** external ["wp","blocks"] ***!
  \********************************/
/***/ ((module) => {

module.exports = window["wp"]["blocks"];

/***/ }),

/***/ "@wordpress/data":
/*!******************************!*\
  !*** external ["wp","data"] ***!
  \******************************/
/***/ ((module) => {

module.exports = window["wp"]["data"];

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ ((module) => {

module.exports = window["wp"]["element"];

/***/ }),

/***/ "@wordpress/i18n":
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
/***/ ((module) => {

module.exports = window["wp"]["i18n"];

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
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
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
  !*** ./src/blocks/paragraph/index.js ***!
  \***************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./block.json */ "./src/blocks/paragraph/block.json");
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../helpers */ "./src/blocks/helpers.js");




(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__.registerBlockType)(_block_json__WEBPACK_IMPORTED_MODULE_2__.name, {
  title: _block_json__WEBPACK_IMPORTED_MODULE_2__.title,
  description: _block_json__WEBPACK_IMPORTED_MODULE_2__.description,
  icon: _block_json__WEBPACK_IMPORTED_MODULE_2__.icon,
  attributes: _block_json__WEBPACK_IMPORTED_MODULE_2__.attributes,
  transforms: {
    to: [{
      type: 'block',
      blocks: ['core/paragraph'],
      transform: attributes => {
        return (0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__.createBlock)('core/paragraph', {
          content: attributes.content,
          placeholder: attributes.placeholder
        });
      }
    }],
    from: [{
      type: 'block',
      blocks: ['core/paragraph'],
      transform: attributes => {
        return (0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__.createBlock)('stanza/paragraph', {
          content: attributes.content,
          placeholder: attributes.placeholder
        });
      }
    }]
  },
  edit(props) {
    const {
      attributes,
      setAttributes
    } = props;

    // 🔑 Get core paragraph *here*, at render time
    const coreParagraph = (0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__.getBlockType)('core/paragraph');
    if (!coreParagraph) {
      // Failsafe: core blocks not ready yet
      return null;
    }

    // enforce our className
    /*if ( attributes.className !== 'is-style-lead-paragraph' ) {
    	setAttributes( { className: 'is-style-lead-paragraph' } );
    }*/

    // pass a custom placeholder
    const patchedProps = {
      ...props,
      attributes: {
        ...attributes
      }
    };
    return coreParagraph.edit(patchedProps);
  },
  save(props) {
    const coreParagraph = (0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__.getBlockType)('core/paragraph');
    if (!coreParagraph) {
      return null;
    }
    return coreParagraph.save(props);
  }
});

// Register styles using stanza.json options
(0,_helpers__WEBPACK_IMPORTED_MODULE_3__.registerBlockStyles)('stanza/paragraph');

// Register variations using stanza.json options
(0,_helpers__WEBPACK_IMPORTED_MODULE_3__.registerBlockVariations)('stanza/paragraph');
})();

/******/ })()
;
//# sourceMappingURL=index.js.map