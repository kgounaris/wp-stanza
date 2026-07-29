/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@wordpress/icons/build-module/library/group.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@wordpress/icons/build-module/library/group.js ***!
  \*********************************************************************/
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


const group = /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__.SVG, {
  viewBox: "0 0 24 24",
  xmlns: "http://www.w3.org/2000/svg",
  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__.Path, {
    d: "M18 4h-7c-1.1 0-2 .9-2 2v3H6c-1.1 0-2 .9-2 2v7c0 1.1.9 2 2 2h7c1.1 0 2-.9 2-2v-3h3c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-4.5 14c0 .3-.2.5-.5.5H6c-.3 0-.5-.2-.5-.5v-7c0-.3.2-.5.5-.5h3V13c0 1.1.9 2 2 2h2.5v3zm0-4.5H11c-.3 0-.5-.2-.5-.5v-2.5H13c.3 0 .5.2.5.5v2.5zm5-.5c0 .3-.2.5-.5.5h-3V11c0-1.1-.9-2-2-2h-2.5V6c0-.3.2-.5.5-.5h7c.3 0 .5.2.5.5v7z"
  })
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (group);
//# sourceMappingURL=group.js.map

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

/***/ "./src/blocks/group/block.json":
/*!*************************************!*\
  !*** ./src/blocks/group/block.json ***!
  \*************************************/
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"apiVersion":3,"name":"stanza/group","title":"Group","category":"design","description":"Gather blocks in a layout container.","attributes":{"align":{"type":"string"},"allowedBlocks":{"type":"array"},"backgroundColor":{"type":"string"},"parentId":{"type":"string"},"template":{"type":"array"},"tagName":{"type":"string"},"groupOptions":{"type":"object","default":{}},"useInnerBlockWrapper":{"type":"boolean"}},"supports":{"align":true,"anchor":true,"__experimentalHasCustomAppender":true},"editorScript":"file:./index.js"}');

/***/ }),

/***/ "./src/blocks/group/edit.js":
/*!**********************************!*\
  !*** ./src/blocks/group/edit.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Edit)
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_notices__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/notices */ "@wordpress/notices");
/* harmony import */ var _wordpress_notices__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_notices__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../components */ "./src/blocks/components.js");
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../helpers */ "./src/blocks/helpers.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__);









function Edit({
  attributes,
  setAttributes,
  clientId
}) {
  const {
    align,
    allowedBlocks,
    backgroundColor,
    layout,
    parentId,
    tagName,
    template,
    groupOptions,
    useInnerBlockWrapper
  } = attributes;
  const tagNameOptions = window?.Stanza?.blocks['stanza/group']?.attributes?.tagName?.options;

  // Set align layout and default background
  (0,_helpers__WEBPACK_IMPORTED_MODULE_7__.setAlignLayoutBackground)('stanza/group', clientId, setAttributes, backgroundColor, align, layout, parentId);
  const blockProps = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.useBlockProps)({
    className: ['wp-block', backgroundColor ? `has-${backgroundColor}-background-color has-background-color` : ''].filter(Boolean).join(' ')
  });
  const innerBlocksProps = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.useInnerBlocksProps)({
    className: 'wp-block-stanza-group__inner'
  }, {
    template: template || [],
    allowedBlocks: allowedBlocks || []
  });
  const TagName = tagName || 'div';
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.Fragment, {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.InspectorControls, {
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_components__WEBPACK_IMPORTED_MODULE_6__.StanzaAttrsPanelBody, {
        attributes: attributes,
        setAttributes: setAttributes
      }), tagNameOptions?.length && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody, {
        title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Settings'),
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.SelectControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Tag', 'stanza'),
          value: tagName,
          disabled: false,
          options: tagNameOptions,
          onChange: newTagName => {
            setAttributes({
              tagName: newTagName
            });
          },
          __nextHasNoMarginBottom: true,
          __next40pxDefaultSize: true // Something about styles depreacted
        })
      })]
    }),
    // Add wp-block-stanza-group__inner wrapper only if it does NOT have a parent block
    !parentId && (useInnerBlockWrapper !== null && useInnerBlockWrapper !== void 0 ? useInnerBlockWrapper : true) || parentId && (useInnerBlockWrapper !== null && useInnerBlockWrapper !== void 0 ? useInnerBlockWrapper : false) ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.Fragment, {
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.InspectorControls, {
        group: "styles",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_components__WEBPACK_IMPORTED_MODULE_6__.StanzaPanelColorSettings, {
          setAttributes: setAttributes,
          colorAttribute: backgroundColor,
          palette: window?.Stanza?.blocks['stanza/group']?.attributes?.backgroundColor?.options
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(TagName, {
        ...blockProps,
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("div", {
          ...innerBlocksProps
        })
      })]
    }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(TagName, {
      ...blockProps,
      children: innerBlocksProps.children
    })]
  });
}

/***/ }),

/***/ "./src/blocks/group/save.js":
/*!**********************************!*\
  !*** ./src/blocks/group/save.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ save)
/* harmony export */ });
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__);


function save({
  attributes
}) {
  const {
    backgroundColor,
    layout,
    parentId,
    tagName,
    useInnerBlockWrapper
  } = attributes;
  const blockProps = _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__.useBlockProps.save({
    className: ['wp-block', backgroundColor && !parentId ? `has-${backgroundColor}-background-color has-background-color` : ''].filter(Boolean).join(' ')
  });
  const innerBlocksProps = _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__.useInnerBlocksProps.save({
    className: 'wp-block-stanza-group__inner'
  });
  const TagName = tagName || 'div';
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.Fragment, {
    children: !parentId && (useInnerBlockWrapper !== null && useInnerBlockWrapper !== void 0 ? useInnerBlockWrapper : true) || parentId && (useInnerBlockWrapper !== null && useInnerBlockWrapper !== void 0 ? useInnerBlockWrapper : false) ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(TagName, {
      ...blockProps,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
        ...innerBlocksProps
      })
    }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(TagName, {
      ...blockProps,
      children: innerBlocksProps.children
    })
  });
}

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

/***/ "@wordpress/notices":
/*!*********************************!*\
  !*** external ["wp","notices"] ***!
  \*********************************/
/***/ ((module) => {

module.exports = window["wp"]["notices"];

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
/*!***********************************!*\
  !*** ./src/blocks/group/index.js ***!
  \***********************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./block.json */ "./src/blocks/group/block.json");
/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./edit */ "./src/blocks/group/edit.js");
/* harmony import */ var _save__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./save */ "./src/blocks/group/save.js");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/library/group.js");
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../helpers */ "./src/blocks/helpers.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__);








//import './style.scss';
//import './editor.scss';

// Overwrite supports using stanza.json options

_block_json__WEBPACK_IMPORTED_MODULE_1__ = (0,_helpers__WEBPACK_IMPORTED_MODULE_6__.supportsByOptions)('stanza/group', _block_json__WEBPACK_IMPORTED_MODULE_1__);

// Overwrite attributes defaults using stanza.json options
_block_json__WEBPACK_IMPORTED_MODULE_1__ = (0,_helpers__WEBPACK_IMPORTED_MODULE_6__.defaultsByOptions)('stanza/group', _block_json__WEBPACK_IMPORTED_MODULE_1__);

// Set options using stanza.json options
_block_json__WEBPACK_IMPORTED_MODULE_1__ = (0,_helpers__WEBPACK_IMPORTED_MODULE_6__.setBlockOptionsAttribute)('stanza/group', _block_json__WEBPACK_IMPORTED_MODULE_1__, 'groupOptions');
(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.registerBlockType)(_block_json__WEBPACK_IMPORTED_MODULE_1__.name, {
  ..._block_json__WEBPACK_IMPORTED_MODULE_1__,
  icon: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.Icon, {
    icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_5__["default"]
  }),
  edit: _edit__WEBPACK_IMPORTED_MODULE_2__["default"],
  save: _save__WEBPACK_IMPORTED_MODULE_3__["default"]
});

// Register styles using stanza.json options
(0,_helpers__WEBPACK_IMPORTED_MODULE_6__.registerBlockStyles)('stanza/group');

// Register variations using stanza.json options
(0,_helpers__WEBPACK_IMPORTED_MODULE_6__.registerBlockVariations)('stanza/group');
})();

/******/ })()
;
//# sourceMappingURL=index.js.map