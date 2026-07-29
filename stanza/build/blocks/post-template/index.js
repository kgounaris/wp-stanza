/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@wordpress/icons/build-module/library/layout.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@wordpress/icons/build-module/library/layout.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/primitives */ "@wordpress/primitives");
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__);
/**
 * WordPress dependencies
 */


const layout = /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__.SVG, {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__.Path, {
    d: "M18 5.5H6a.5.5 0 00-.5.5v3h13V6a.5.5 0 00-.5-.5zm.5 5H10v8h8a.5.5 0 00.5-.5v-7.5zm-10 0h-3V18a.5.5 0 00.5.5h2.5v-8zM6 4h12a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2z"
  })
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (layout);
//# sourceMappingURL=layout.js.map

/***/ }),

/***/ "./src/blocks/components.js":
/*!**********************************!*\
  !*** ./src/blocks/components.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   StanzaAttrsPanelBody: () => (/* binding */ StanzaAttrsPanelBody),
/* harmony export */   StanzaPanelColorSettings: () => (/* binding */ StanzaPanelColorSettings)
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wp_data__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./wp-data */ "./src/blocks/wp-data.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__);






/**
 * Custom Color panel settings component
 */

const StanzaPanelColorSettings = ({
  attributeKey = 'backgroundColor',
  palette,
  colorAttribute,
  setAttributes,
  title = "Background color"
}) => {
  const {
    settings
  } = (0,_wp_data__WEBPACK_IMPORTED_MODULE_4__.wpData)();

  // Get theme-defined palette & filter colors
  const colors = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_1__.useSelect)(select => {
    const allColors = settings.colors || [];

    // First, find the color value of the 'darkblue' slug
    //const darkblueEntry = allColors.find(color => color.slug === 'darkblue');
    //const darkblueColor = darkblueEntry?.color;

    return palette ? allColors.filter(color => {
      // Keep only if it's in the palette
      if (!palette.includes(color.slug)) return false;

      // If it's the 'darkblue' entry, keep it
      //if (color.slug === 'darkblue') return true;

      // Exclude any other entry with the same color value as 'darkblue'
      return color.color; //!== darkblueColor;
    }) : 0;
  }, []);
  return colors.length ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.PanelColorSettings, {
    title: title,
    colorSettings: [{
      value: colors.find(c => c.slug === colorAttribute)?.color || undefined,
      // || ( colors[colors.length-1].slug )
      onChange: newColor => {
        const matched = colors.find(c => c.color === newColor);
        setAttributes({
          [attributeKey]: matched?.slug || undefined
        }); // || ( colors[colors.length-1].slug )
      },
      label: 'Background color',
      colors
    }]
  }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Notice, {
    status: "warning",
    isDismissible: false,
    children: "No available colors"
  });
};

/**
 * Custom Color panel settings component
 */
const StanzaAttrsPanelBody = ({
  attributes,
  title = "Attributes",
  setAttributes = undefined
}) => {
  const {
    user,
    settings,
    entityRecord
  } = (0,_wp_data__WEBPACK_IMPORTED_MODULE_4__.wpData)();
  const {
    useInnerBlockWrapper,
    useInnerBlocksWrapper,
    readMoreContent,
    useBlockWrapper,
    sliderSettings
  } = attributes;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.Fragment, {
    children: 1 == user.id ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.Fragment, {
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.PanelBody, {
        title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)(title, 'stanza'),
        initialOpen: false,
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("pre", {
          style: {
            fontSize: '12px',
            background: '#f6f7f7',
            padding: '8px',
            overflow: 'scroll'
          },
          children: JSON.stringify(attributes, null, 2)
        })
      }),  true && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.PanelBody, {
        title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Attributes Settings', 'stanza'),
        initialOpen: false,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.RadioControl, {
          label: "useInnerBlockWrapper",
          selected: useInnerBlockWrapper === undefined ? 'default' : useInnerBlockWrapper ? 'true' : 'false',
          options: [{
            label: 'Undefined',
            value: 'default'
          }, {
            label: 'Yes',
            value: 'true'
          }, {
            label: 'No',
            value: 'false'
          }],
          onChange: value => {
            setAttributes({
              useInnerBlockWrapper: value === 'default' ? undefined : value === 'true'
            });
          }
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.RadioControl, {
          label: "useInnerBlock [s] Wrapper",
          selected: useInnerBlocksWrapper === undefined ? 'default' : useInnerBlocksWrapper ? 'true' : 'false',
          options: [{
            label: 'Undefined',
            value: 'default'
          }, {
            label: 'Yes',
            value: 'true'
          }, {
            label: 'No',
            value: 'false'
          }],
          onChange: value => {
            setAttributes({
              useInnerBlocksWrapper: value === 'default' ? undefined : value === 'true'
            });
          }
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.RadioControl, {
          label: "useBlockWrapper",
          selected: useBlockWrapper === undefined ? 'default' : useBlockWrapper ? 'true' : 'false',
          options: [{
            label: 'Undefined',
            value: 'default'
          }, {
            label: 'Yes',
            value: 'true'
          }, {
            label: 'No',
            value: 'false'
          }],
          onChange: value => {
            setAttributes({
              useBlockWrapper: value === 'default' ? undefined : value === 'true'
            });
          }
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.TextControl, {
          label: "readMoreContent",
          value: readMoreContent,
          onChange: value => setAttributes({
            readMoreContent: value
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.TextControl, {
          label: "sliderSettings.effect",
          value: sliderSettings?.effect || '',
          onChange: value => setAttributes({
            sliderSettings: {
              ...sliderSettings,
              effect: value
            }
          })
        })]
      })]
    }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.Fragment, {})
  });
};

/***/ }),

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

/***/ "./src/blocks/post-template/block.json":
/*!*********************************************!*\
  !*** ./src/blocks/post-template/block.json ***!
  \*********************************************/
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"apiVersion":3,"name":"stanza/post-template","title":"Post template","category":"design","icon":"layout","description":"Contains the block elements used to render a post, like the title, date, featured image, content or excerpt, and more.","attributes":{"align":{"type":"string"},"allowedBlocks":{"type":"array"},"backgroundColor":{"type":"string"},"htmlAttrs":{"type":"object","default":{}},"template":{"type":"array"},"parentId":{"type":"string"},"postTemplateOptions":{"type":"object","default":{}},"predefinedPosts":{"type":"array"},"useThePost":{"type":"boolean"},"postType":{"type":"string","default":"post"},"metaKey":{"type":"string"},"metaValue":{"type":"string"},"tag":{"type":"string"}},"supports":{"anchor":true,"align":false,"layout":false},"usesContext":["postId","stanza/archivePagination","stanza/archiveReadMoreContent","stanza/archiveDisplayAllPosts","stanza/archivePostType","stanza/archiveMetaKey","stanza/archiveMetaValue","stanza/archiveFilters","stanza/archiveOrderMode","stanza/archiveNumberOfPosts","stanza/archivePredefinedPosts","stanza/archiveSelectedPostIds"],"editorScript":["stanza-config","file:./index.js"],"editorStyle":["file:./index.css"]}');

/***/ }),

/***/ "./src/blocks/post-template/edit.js":
/*!******************************************!*\
  !*** ./src/blocks/post-template/edit.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Edit)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./helpers */ "./src/blocks/post-template/helpers.js");
/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../components */ "./src/blocks/components.js");
/* harmony import */ var _wp_data__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../wp-data */ "./src/blocks/wp-data.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__);








const ITEM_TEMPLATE = [['core/post-featured-image'], ['core/post-title'], ['core/post-excerpt']];
function Edit({
  attributes,
  setAttributes,
  clientId,
  context
}) {
  var _context$stanzaA, _attributes$postType, _context$stanzaA2, _attributes$metaKey, _context$stanzaA3, _attributes$metaValue, _context$stanzaA4, _attributes$readMoreC, _context$stanzaA5, _context$stanzaA6, _context$stanzaA7, _context$stanzaA8, _context$stanzaA9, _attributes$predefine, _context$stanzaA0;
  const {
    template,
    useThePost,
    tag,
    htmlAttrs = {}
  } = attributes;
  const blockProps = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.useBlockProps)();
  const {
    entityRecord
  } = (0,_wp_data__WEBPACK_IMPORTED_MODULE_6__.wpData)();
  const postType = (_context$stanzaA = context?.['stanza/archivePostType']) !== null && _context$stanzaA !== void 0 ? _context$stanzaA : (_attributes$postType = attributes?.postType) !== null && _attributes$postType !== void 0 ? _attributes$postType : 'post';
  const metaKey = (_context$stanzaA2 = context?.['stanza/archiveMetaKey']) !== null && _context$stanzaA2 !== void 0 ? _context$stanzaA2 : (_attributes$metaKey = attributes?.metaKey) !== null && _attributes$metaKey !== void 0 ? _attributes$metaKey : '';
  const metaValue = (_context$stanzaA3 = context?.['stanza/archiveMetaValue']) !== null && _context$stanzaA3 !== void 0 ? _context$stanzaA3 : (_attributes$metaValue = attributes?.metaValue) !== null && _attributes$metaValue !== void 0 ? _attributes$metaValue : '';
  const readMoreContent = (_context$stanzaA4 = context?.['stanza/archiveReadMoreContent']) !== null && _context$stanzaA4 !== void 0 ? _context$stanzaA4 : (_attributes$readMoreC = attributes?.readMoreContent) !== null && _attributes$readMoreC !== void 0 ? _attributes$readMoreC : '';
  const filters = (_context$stanzaA5 = context?.['stanza/archiveFilters']) !== null && _context$stanzaA5 !== void 0 ? _context$stanzaA5 : {};
  const orderMode = (_context$stanzaA6 = context?.['stanza/archiveOrderMode']) !== null && _context$stanzaA6 !== void 0 ? _context$stanzaA6 : 'desc';
  const displayAllPosts = (_context$stanzaA7 = context?.['stanza/archiveDisplayAllPosts']) !== null && _context$stanzaA7 !== void 0 ? _context$stanzaA7 : false;
  const numberOfPosts = displayAllPosts ? -1 : (_context$stanzaA8 = context?.['stanza/archiveNumberOfPosts']) !== null && _context$stanzaA8 !== void 0 ? _context$stanzaA8 : entityRecord?.posts_per_page;
  const predefinedPosts = useThePost && context?.postId ? [context.postId] : (_context$stanzaA9 = context?.['stanza/archivePredefinedPosts']) !== null && _context$stanzaA9 !== void 0 ? _context$stanzaA9 : (_attributes$predefine = attributes?.predefinedPosts) !== null && _attributes$predefine !== void 0 ? _attributes$predefine : [];
  const selectedPostIds = (_context$stanzaA0 = context?.['stanza/archiveSelectedPostIds']) !== null && _context$stanzaA0 !== void 0 ? _context$stanzaA0 : [];
  const TagName = tag || 'article';

  // Keep attribute template for compatibility / inspector UI
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (!template?.length) {
      setAttributes({
        template: ITEM_TEMPLATE
      });
    }
  }, [template]);
  const effectiveTemplate = template?.length ? template : ITEM_TEMPLATE;

  // ✅ Read actual stored inner blocks (these are what InnerBlocks.Content will output)
  const innerBlocks = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_1__.useSelect)(select => select('core/block-editor').getBlocks(clientId), [clientId]);
  const {
    replaceInnerBlocks,
    updateBlockAttributes
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_1__.useDispatch)('core/block-editor');

  // ✅ Seed InnerBlocks ONCE if empty, using your template array
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (innerBlocks?.length) return;
    const seeded = (0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_3__.createBlocksFromInnerBlocksTemplate)(effectiveTemplate);
    // 3rd arg: shouldSelectFirstBlock — keep false so it doesn't jump focus
    replaceInnerBlocks(clientId, seeded, false);
  }, [clientId, innerBlocks?.length, effectiveTemplate, replaceInnerBlocks]);

  // Update read more content attribute
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const updateReadMoreBlocks = blocks => {
      blocks.forEach(block => {
        if (block.name === 'core/read-more' && block.attributes.content !== 'Read more') {
          updateBlockAttributes(block.clientId, {
            content: readMoreContent
          });
        }
        if (block.innerBlocks?.length) {
          updateReadMoreBlocks(block.innerBlocks);
        }
      });
    };
    updateReadMoreBlocks(innerBlocks);
  }, [readMoreContent]);

  // Fetch posts for preview (no ServerSideRender)
  const posts = (0,_helpers__WEBPACK_IMPORTED_MODULE_4__.fetchPosts)(postType, metaKey, metaValue, orderMode, filters, numberOfPosts, predefinedPosts, selectedPostIds);

  // Preview blocks: prefer the REAL stored innerBlocks, fallback to template
  const previewBlocks = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => innerBlocks?.length ? innerBlocks : (0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_3__.createBlocksFromInnerBlocksTemplate)(effectiveTemplate), [innerBlocks, effectiveTemplate]);
  const previewProps = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.__experimentalUseBlockPreview)({
    blocks: previewBlocks
  });
  if (posts === null) return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("div", {
    ...blockProps,
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("div", {
      className: "loader",
      children: "Loading response"
    })
  });
  if (!posts?.length) return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("div", {
    ...blockProps,
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("div", {
      className: "noposts",
      children: "No posts found."
    })
  });
  const previewPropsClassname = previewProps.className;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.Fragment, {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.InspectorControls, {
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_components__WEBPACK_IMPORTED_MODULE_5__.StanzaAttrsPanelBody, {
        attributes: attributes
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("div", {
      className: "stanza-archive__template-store",
      style: {
        display: 'none'
      },
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.InnerBlocks, {
        templateLock: "all",
        renderAppender: false
      })
    }), posts.map(post => {
      var _post$categories;
      const categoryClasses = ((_post$categories = post?.categories) !== null && _post$categories !== void 0 ? _post$categories : []).map(id => `category-${id}`).join(' ');
      if (htmlAttrs?.id == 'slug') {
        previewProps.id = post?.slug;
      } else if (htmlAttrs?.id == 'id') {
        previewProps.id = postType + '-' + post?.id;
      }
      previewProps.className = `${previewPropsClassname} wp-block-stanza-post is-layout-flow ${categoryClasses}`;
      if (htmlAttrs?.className?.acf) {
        previewProps.className += ` ${post?.acf?.[htmlAttrs.className.acf]}`;
      }
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.BlockContextProvider, {
        value: {
          postId: post.id,
          postType
        },
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(TagName, {
          ...previewProps
        })
      }, post.id);
    })]
  });
}

/***/ }),

/***/ "./src/blocks/post-template/editor.scss":
/*!**********************************************!*\
  !*** ./src/blocks/post-template/editor.scss ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/blocks/post-template/helpers.js":
/*!*********************************************!*\
  !*** ./src/blocks/post-template/helpers.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   fetchPosts: () => (/* binding */ fetchPosts),
/* harmony export */   fetchSafePosts: () => (/* binding */ fetchSafePosts),
/* harmony export */   getCurrentPostType: () => (/* binding */ getCurrentPostType),
/* harmony export */   getPostTypes: () => (/* binding */ getPostTypes),
/* harmony export */   getTaxonomies: () => (/* binding */ getTaxonomies),
/* harmony export */   getTermsByTax: () => (/* binding */ getTermsByTax),
/* harmony export */   onChangeOrderMode: () => (/* binding */ onChangeOrderMode),
/* harmony export */   onChangePostType: () => (/* binding */ onChangePostType)
/* harmony export */ });
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);



/**
 * Fetch posts for preview (no ServerSideRender)
 */
const fetchPosts = (postType, metaKey, metaValue, orderMode, filters, numberOfPosts, predefinedPosts, selectedPostIds) => {
  return (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.useSelect)(select => {
    if (!postType) return null;
    const query = {};
    if (predefinedPosts?.length) {
      query.include = predefinedPosts;
      query.per_page = predefinedPosts?.length;
    } else if (selectedPostIds?.length) {
      query.include = selectedPostIds;
      query.per_page = selectedPostIds?.length;
    }
    // Per page: in editor we cap -1 to something sane (e.g. 100)
    else if (Number(numberOfPosts) === -1 || !numberOfPosts) {
      query.per_page = 100;
    } else {
      query.per_page = Number(numberOfPosts);
    }

    // Ordering
    switch (orderMode) {
      case 'newest':
        query.order = 'desc';
        query.orderby = 'date';
        break;
      case 'oldest':
        query.order = 'asc';
        query.orderby = 'date';
        break;
      case 'az':
        query.order = 'asc';
        query.orderby = 'title';
        break;
      case 'za':
        query.order = 'desc';
        query.orderby = 'title';
        break;
      default:
        // leave default REST order
        break;
    }

    // Tax filters (e.g. { categories: [1,2], your_tax: [3] })
    if (filters && Object.keys(filters).length) {
      Object.entries(filters).forEach(([taxSlug, termIds]) => {
        if (termIds && termIds.length && taxSlug !== 'author') {
          // TODO: that is not a taxonomy
          if ('category' == taxSlug) {
            taxSlug = 'categories';
          } else if ('post_tag' == taxSlug) {
            taxSlug = 'tags';
          }
          query[taxSlug] = termIds;
        }
      });
    }

    // Author filter
    if (filters && Object.keys(filters).length && filters?.author) {
      query.author = filters?.author;
    }

    // Meta query args
    if (metaKey !== undefined && metaKey !== '' && metaValue !== undefined && metaValue !== '') {
      query.meta_key = metaKey;
      query.meta_value = metaValue;
    }
    return select('core').getEntityRecords('postType', postType, query);
  }, [postType, orderMode, filters, numberOfPosts, selectedPostIds, metaKey, metaValue]);
};

/**
 * Fetch safe posts
 */
const fetchSafePosts = postType => {
  var _useSelect;
  return (_useSelect = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.useSelect)(select => {
    if (!postType) return [];
    return select('core').getEntityRecords('postType', postType);
  }, [postType])) !== null && _useSelect !== void 0 ? _useSelect : []; // Because getEntityRecords() returns null while it’s loading
};

/**
 * Get post types
 */
const getPostTypes = () => {
  return (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.useSelect)(select => {
    const types = select('core').getPostTypes({
      per_page: -1
    });
    if (!types) return null;
    return types.filter(type => type.viewable && type.slug !== 'attachment' && type.slug !== 'wp_block');
  }, []);
};

/**
 * Get current post type
 */
const getCurrentPostType = (postTypes, postType) => {
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useMemo)(() => {
    if (!postTypes) return null;
    return postTypes.find(type => type.slug === postType) || null;
  }, [postTypes, postType]);
};

/**
 * Get Taxonomies for current post type
 */
const getTaxonomies = postType => {
  return (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.useSelect)(select => {
    if (!postType) return null;
    return select('core').getTaxonomies({
      type: postType,
      context: 'view'
    });
  }, [postType]);
};

/**
 * Get Terms for each taxonomy
 */
const getTermsByTax = taxonomies => {
  return (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.useSelect)(select => {
    if (!taxonomies) return {};
    const result = {};
    taxonomies.forEach(tax => {
      const terms = select('core').getEntityRecords('taxonomy', tax.slug, {
        per_page: -1
      });
      result[tax.slug] = terms;
    });
    return result;
  }, [taxonomies]);
};

/**
 * On change post type
 */
const onChangePostType = (value, setAttributes) => {
  setAttributes({
    postType: value,
    filters: {} // reset filters on post type change
  });
};

/**
 * On change order mode
 */
const onChangeOrderMode = (value, setAttributes) => {
  setAttributes({
    orderMode: value
  });
};

/***/ }),

/***/ "./src/blocks/post-template/save.js":
/*!******************************************!*\
  !*** ./src/blocks/post-template/save.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ save)
/* harmony export */ });
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__);


function save() {
  const innerBlocksProps = _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__.useInnerBlocksProps.save();
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.Fragment, {
    children: innerBlocksProps.children
  });
}

/***/ }),

/***/ "./src/blocks/wp-data.js":
/*!*******************************!*\
  !*** ./src/blocks/wp-data.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   wpData: () => (/* binding */ wpData)
/* harmony export */ });
/**
 * WP Core data
 */
function wpData() {
  return {
    settings: wp.data.select('core/block-editor').getSettings(),
    entityRecord: wp.data.select('core').getEntityRecord('root', 'site'),
    // limited for multisites
    user: wp.data.select('core').getCurrentUser()
  };
}

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

/***/ "@wordpress/components":
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
/***/ ((module) => {

module.exports = window["wp"]["components"];

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

/***/ }),

/***/ "@wordpress/primitives":
/*!************************************!*\
  !*** external ["wp","primitives"] ***!
  \************************************/
/***/ ((module) => {

module.exports = window["wp"]["primitives"];

/***/ }),

/***/ "react/jsx-runtime":
/*!**********************************!*\
  !*** external "ReactJSXRuntime" ***!
  \**********************************/
/***/ ((module) => {

module.exports = window["ReactJSXRuntime"];

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
/*!*******************************************!*\
  !*** ./src/blocks/post-template/index.js ***!
  \*******************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./block.json */ "./src/blocks/post-template/block.json");
/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./edit */ "./src/blocks/post-template/edit.js");
/* harmony import */ var _save__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./save */ "./src/blocks/post-template/save.js");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/library/layout.js");
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../helpers */ "./src/blocks/helpers.js");
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./editor.scss */ "./src/blocks/post-template/editor.scss");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__);








//import './style.scss';


// Overwrite supports using stanza.json options

_block_json__WEBPACK_IMPORTED_MODULE_1__ = (0,_helpers__WEBPACK_IMPORTED_MODULE_6__.supportsByOptions)('stanza/post-template', _block_json__WEBPACK_IMPORTED_MODULE_1__);

// Overwrite attributes defaults using stanza.json options
_block_json__WEBPACK_IMPORTED_MODULE_1__ = (0,_helpers__WEBPACK_IMPORTED_MODULE_6__.defaultsByOptions)('stanza/post-template', _block_json__WEBPACK_IMPORTED_MODULE_1__);

// Set options using stanza.json options
_block_json__WEBPACK_IMPORTED_MODULE_1__ = (0,_helpers__WEBPACK_IMPORTED_MODULE_6__.setBlockOptionsAttribute)('stanza/post-template', _block_json__WEBPACK_IMPORTED_MODULE_1__, 'postTemplateOptions');
(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.registerBlockType)(_block_json__WEBPACK_IMPORTED_MODULE_1__.name, {
  ..._block_json__WEBPACK_IMPORTED_MODULE_1__,
  icon: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.Icon, {
    icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_5__["default"]
  }),
  edit: _edit__WEBPACK_IMPORTED_MODULE_2__["default"],
  save: _save__WEBPACK_IMPORTED_MODULE_3__["default"]
});

// Register styles using stanza.json options
(0,_helpers__WEBPACK_IMPORTED_MODULE_6__.registerBlockStyles)('stanza/post-template');

// Register variations using stanza.json options
(0,_helpers__WEBPACK_IMPORTED_MODULE_6__.registerBlockVariations)('stanza/post-template');
})();

/******/ })()
;
//# sourceMappingURL=index.js.map