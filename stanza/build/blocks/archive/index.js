/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/blocks/archive/block.json":
/*!***************************************!*\
  !*** ./src/blocks/archive/block.json ***!
  \***************************************/
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"apiVersion":3,"name":"stanza/archive","title":"Archive","category":"widgets","icon":"archive","description":"An advanced block that allows displaying post types based on different query parameters and visual configurations.","attributes":{"align":{"type":"string"},"archiveOptions":{"type":"object","default":{}},"backgroundColor":{"type":"string"},"blocks":{"type":"object","default":{}},"displayAllPosts":{"type":"boolean","default":false},"filters":{"type":"object","default":{}},"numberOfPosts":{"type":"number"},"orderMode":{"type":"string","default":"default"},"pagination":{"type":"boolean"},"parentId":{"type":"string"},"predefinedPosts":{"type":"array"},"postType":{"type":"string","default":"post"},"metaKey":{"type":"string"},"metaValue":{"type":"string"},"readMoreContent":{"type":"string"},"selectedPostIds":{"type":"array","default":[],"items":{"type":"number"}},"template":{"type":"array"},"useBlockWrapper":{"type":"boolean","default":true},"useInnerBlocksWrapper":{"type":"boolean"}},"supports":{"align":true,"anchor":true,"layout":{"allowCustomContentAndWideSize":false,"default":{"type":"default","justifyContent":"center"}}},"providesContext":{"stanza/archivePagination":"pagination","stanza/archiveDisplayAllPosts":"displayAllPosts","stanza/archiveReadMoreContent":"readMoreContent","stanza/archivePostType":"postType","stanza/archiveMetaKey":"metaKey","stanza/archiveMetaValue":"metaValue","stanza/archiveFilters":"filters","stanza/archiveOrderMode":"orderMode","stanza/archiveNumberOfPosts":"numberOfPosts","stanza/archivePredefinedPosts":"predefinedPosts","stanza/archiveSelectedPostIds":"selectedPostIds"},"editorScript":["stanza-config","file:./index.js"],"style":["file:./style-index.css","stanza-archive-style-index"]}');

/***/ }),

/***/ "./src/blocks/archive/components/postTemplate.js":
/*!*******************************************************!*\
  !*** ./src/blocks/archive/components/postTemplate.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ PostTemplate)
/* harmony export */ });
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__);



function PostTemplate({
  PatternComponent,
  posts,
  postType,
  blocks,
  archiveTitle
}) {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.Fragment, {
    children: [!posts && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.Spinner, {}), archiveTitle.display && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
      className: "wp-block-stanza-header is-layout-flow",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.RichText, {
        tagName: "p",
        value: archiveTitle?.subtitle,
        className: "is-style-subtitle",
        onChange: value => setAttributes({
          archiveTitle: {
            text: archiveTitle.text,
            subtitle: value,
            display: archiveTitle.display
          }
        }),
        placeholder: "Subtitle",
        allowedFormats: []
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.RichText, {
        tagName: "h2",
        value: archiveTitle?.text,
        className: "wp-block-heading",
        onChange: value => setAttributes({
          archiveTitle: {
            text: value,
            subtitle: archiveTitle.subtitle,
            display: archiveTitle.display
          }
        }),
        placeholder: "Archive title",
        allowedFormats: []
      })]
    }), posts && posts.length === 0 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
      className: "wp-block-stanza-archive__posts",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("p", {
        children: __('No posts found for the current query.', 'stanza')
      })
    }), posts && posts.length > 0 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.Fragment, {
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(PatternComponent, {
        blocks: blocks,
        posts: posts,
        postType: postType
      })
    })]
  });
}

/***/ }),

/***/ "./src/blocks/archive/components/selectControlPost.js":
/*!************************************************************!*\
  !*** ./src/blocks/archive/components/selectControlPost.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ SelectControlPost)
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__);




function SelectControlPost({
  safePosts,
  selectedPostIds,
  setAttributes
}) {
  const {
    suggestions,
    labelToIdMap,
    idToLabelMap
  } = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useMemo)(() => {
    const suggestions = [];
    const labelToIdMap = {};
    const idToLabelMap = {};
    safePosts.filter(p => p && typeof p.id === 'number').forEach(p => {
      const title = p.title?.rendered || (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('(no title)', 'stanza');
      const label = `${title} (#${p.id})`;
      suggestions.push(label);
      labelToIdMap[label] = p.id;
      idToLabelMap[p.id] = label;
    });
    return {
      suggestions,
      labelToIdMap,
      idToLabelMap
    };
  }, [safePosts]);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.FormTokenField, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Select posts', 'stanza'),
    value: (selectedPostIds !== null && selectedPostIds !== void 0 ? selectedPostIds : []).map(id => idToLabelMap[id]).filter(Boolean),
    suggestions: suggestions,
    disableCustomTokens: true,
    onChange: tokens => {
      const ids = (tokens !== null && tokens !== void 0 ? tokens : []).map(label => labelToIdMap[label]).filter(id => typeof id === 'number');

      // optional: de-dupe
      setAttributes({
        selectedPostIds: Array.from(new Set(ids))
      });
    }
  });
}

/***/ }),

/***/ "./src/blocks/archive/components/taxFilters.js":
/*!*****************************************************!*\
  !*** ./src/blocks/archive/components/taxFilters.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ TaxFiltersPanelBody)
/* harmony export */ });
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__);


function TaxFiltersPanelBody({
  taxonomies,
  termsByTax,
  filters,
  setAttributes
}) {
  if (!taxonomies) {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.Spinner, {});
  }
  if (!taxonomies.length) {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("p", {
      children: "No taxonomies for this post type."
    });
  }
  const toggleTerm = (taxSlug, termId) => {
    const current = filters?.[taxSlug] || [];
    const has = current.includes(termId);
    let nextTaxTerms;
    if (has) {
      nextTaxTerms = current.filter(id => id !== termId);
    } else {
      nextTaxTerms = [...current, termId];
    }
    const nextFilters = {
      ...filters,
      [taxSlug]: nextTaxTerms
    };
    if (nextFilters[taxSlug] && nextFilters[taxSlug].length === 0) {
      delete nextFilters[taxSlug];
    }
    setAttributes({
      filters: nextFilters
    });
  };
  return taxonomies.map(tax => {
    const terms = termsByTax[tax.slug];
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.PanelBody, {
      title: tax.labels?.name || tax.name,
      initialOpen: false,
      children: [!terms && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.Spinner, {}), terms && !terms.length && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("p", {
        children: "No terms."
      }), terms && terms.length > 0 && terms.map(term => {
        const taxFilter = filters?.[tax.slug] || [];
        const checked = taxFilter.includes(term.id);
        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.CheckboxControl, {
          label: `${term.name} (${term.count})`,
          checked: checked,
          onChange: () => toggleTerm(tax.slug, term.id)
        }, term.id);
      })]
    }, tax.slug);
  });
}

/***/ }),

/***/ "./src/blocks/archive/edit.js":
/*!************************************!*\
  !*** ./src/blocks/archive/edit.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Edit)
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./helpers */ "./src/blocks/archive/helpers.js");
/* harmony import */ var _components_postTemplate__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/postTemplate */ "./src/blocks/archive/components/postTemplate.js");
/* harmony import */ var _components_taxFilters__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./components/taxFilters */ "./src/blocks/archive/components/taxFilters.js");
/* harmony import */ var _components_selectControlPost__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./components/selectControlPost */ "./src/blocks/archive/components/selectControlPost.js");
/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../components */ "./src/blocks/components.js");
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../helpers */ "./src/blocks/helpers.js");
/* harmony import */ var _icons__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../icons */ "./src/blocks/icons.js");
/* harmony import */ var _wp_data__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../wp-data */ "./src/blocks/wp-data.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__);














const ORDER_OPTIONS = [{
  label: 'Default order',
  value: 'default'
}, {
  label: 'Newest first',
  value: 'newest'
}, {
  label: 'Oldest first',
  value: 'oldest'
}, {
  label: 'A → Z (title)',
  value: 'az'
}, {
  label: 'Z → A (title)',
  value: 'za'
}];
const ITEM_TEMPLATE = [
//["stanza/paragraph", { "subtitlePosition": "", "tag": ""}],
['stanza/post-template', {
  template: [
  //[ 'core/post-featured-image' ],
  ['core/post-title'], ['core/post-excerpt']]
}]];
function Edit({
  attributes,
  setAttributes,
  clientId
}) {
  const {
    align,
    archiveOptions,
    blocks = [],
    backgroundColor,
    predefinedPosts,
    postType = 'post',
    orderMode = 'default',
    layout,
    metaKey,
    metaValue,
    parentId,
    readMoreContent,
    filters = {},
    numberOfPosts,
    displayAllPosts,
    pagination,
    selectedPostIds,
    template,
    useBlockWrapper,
    useInnerBlocksWrapper
  } = attributes;
  const {
    entityRecord
  } = (0,_wp_data__WEBPACK_IMPORTED_MODULE_12__.wpData)();

  // Set align layout and default background
  (0,_helpers__WEBPACK_IMPORTED_MODULE_10__.setAlignLayoutBackground)('stanza/archive', clientId, setAttributes, backgroundColor, align, layout, parentId);
  const blockProps = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.useBlockProps)({
    className: ['wp-block', backgroundColor ? `has-${backgroundColor}-background-color has-background-color` : ''].filter(Boolean).join(' ')
  });

  // Selected Post Ids related attributes
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    if (selectedPostIds.length) {
      setAttributes({
        displayAllPosts: false
      });
    }
  }, [selectedPostIds]);

  // Set default number of posts
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    if (selectedPostIds?.length) {
      setAttributes({
        numberOfPosts: selectedPostIds.length
      });
    } else if (predefinedPosts?.length) {
      setAttributes({
        numberOfPosts: predefinedPosts.length
      });
    } else if (!numberOfPosts) {
      setAttributes({
        numberOfPosts: entityRecord?.posts_per_page
      });
    }
  }, [entityRecord, numberOfPosts, selectedPostIds, predefinedPosts]);

  // Set default template
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    if (!template?.length) {
      setAttributes({
        template: ITEM_TEMPLATE
      });
    }
  }, [template /*, setAttributes*/]);
  const innerBlocksProps = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.useInnerBlocksProps)(blockProps, {
    template: template
  });

  // Get all viewable post types
  const postTypes = (0,_helpers__WEBPACK_IMPORTED_MODULE_5__.getPostTypes)();

  // Current post type object (to get rest_base, taxonomies, etc.)
  //const currentPostType = getCurrentPostType(postTypes, postType);

  // Taxonomies for current post type
  const taxonomies = (0,_helpers__WEBPACK_IMPORTED_MODULE_5__.getTaxonomies)(postType);

  // Terms for each taxonomy
  const termsByTax = (0,_helpers__WEBPACK_IMPORTED_MODULE_5__.getTermsByTax)(taxonomies);

  // Post type options
  const postTypeOptions = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useMemo)(() => {
    if (!postTypes) return [];
    return postTypes.map(type => ({
      label: type.labels?.singular_name || type.name,
      value: type.slug
    }));
  }, [postTypes]);

  // Fetch posts for preview (no ServerSideRender)	
  //const posts = fetchPosts(postType, orderMode, filters, numberOfPosts, predefinedPosts, selectedPostIds);

  // Fetch safe posts
  const safePosts = (0,_helpers__WEBPACK_IMPORTED_MODULE_5__.fetchSafePosts)(postType);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.Fragment, {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxs)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.InspectorControls, {
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_components__WEBPACK_IMPORTED_MODULE_9__.StanzaAttrsPanelBody, {
        attributes: attributes,
        setAttributes: setAttributes
      }),  true && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.Fragment, {
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.PanelBody, {
          title: "Archive settings",
          initialOpen: true,
          children: [!postTypes && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.Spinner, {}), postTypes && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.SelectControl, {
            label: "Post type",
            value: postType,
            options: postTypeOptions,
            onChange: newPostType => (0,_helpers__WEBPACK_IMPORTED_MODULE_5__.onChangePostType)(newPostType, predefinedPosts, selectedPostIds, setAttributes),
            __next40pxDefaultSize: true,
            _nextHasNoMarginBottom: true
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_components_selectControlPost__WEBPACK_IMPORTED_MODULE_8__["default"], {
            safePosts: safePosts,
            selectedPostIds: selectedPostIds,
            setAttributes: setAttributes
          }),  true && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.Fragment, {
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.SelectControl, {
              label: "Order by",
              value: orderMode,
              options: ORDER_OPTIONS,
              onChange: newOrderMode => (0,_helpers__WEBPACK_IMPORTED_MODULE_5__.onChangeOrderMode)(newOrderMode, setAttributes),
              __next40pxDefaultSize: true,
              _nextHasNoMarginBottom: true
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.__experimentalNumberControl, {
              label: "Number of posts",
              value: predefinedPosts?.length ? predefinedPosts.length : numberOfPosts,
              onChange: value => {
                setAttributes({
                  numberOfPosts: parseInt(value, 10)
                });
              },
              min: 1,
              max: 50,
              step: 1,
              help: `If empty, it loads the Dashboard\'s "Blog pages show at most" reading setting. (${entityRecord?.posts_per_page})`,
              disabled: displayAllPosts || selectedPostIds?.length || predefinedPosts?.length
            })]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.ToggleControl, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Display all posts', 'stanza'),
            checked: displayAllPosts,
            disabled: selectedPostIds.length,
            onChange: newDisplayAllPosts => setAttributes({
              displayAllPosts: newDisplayAllPosts
            }),
            __nextHasNoMarginBottom: true
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.TextControl, {
            label: "Read more",
            value: readMoreContent,
            help: 'Shortcodes: [post-title]',
            onChange: value => setAttributes({
              readMoreContent: value
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.BaseControl, {
            label: "Pagination",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.ToggleControl, {
              label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Enable', 'stanza'),
              checked: pagination,
              onChange: newPagination => setAttributes({
                pagination: newPagination
              }),
              __nextHasNoMarginBottom: true
            })
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.PanelBody, {
          title: "Meta query",
          initialOpen: false,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.TextControl, {
            label: "Meta key",
            value: metaKey,
            onChange: value => setAttributes({
              metaKey: value
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.TextControl, {
            label: "Meta value",
            value: metaValue,
            onChange: value => setAttributes({
              metaValue: value
            })
          })]
        }), !selectedPostIds.length && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.PanelBody, {
          title: "Filters",
          initialOpen: false,
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_components_taxFilters__WEBPACK_IMPORTED_MODULE_7__["default"], {
            taxonomies: taxonomies,
            termsByTax: termsByTax,
            filters: filters,
            setAttributes: setAttributes
          })
        })]
      })]
    }), !parentId ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.InspectorControls, {
      group: "styles",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_components__WEBPACK_IMPORTED_MODULE_9__.StanzaPanelColorSettings, {
        setAttributes: setAttributes,
        colorAttribute: backgroundColor,
        palette: window?.Stanza?.blocks['stanza/archive']?.attributes?.backgroundColor?.options
      })
    }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.Fragment, {}), useBlockWrapper ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)("div", {
      ...innerBlocksProps,
      children:
      // Add wp-block-stanza-free-archive__inner wrapper only if it does NOT have a parent block
      !parentId && (useInnerBlocksWrapper !== null && useInnerBlocksWrapper !== void 0 ? useInnerBlocksWrapper : true) || parentId && (useInnerBlocksWrapper !== null && useInnerBlocksWrapper !== void 0 ? useInnerBlocksWrapper : false) ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)("div", {
        className: "wp-block-stanza-archive__inner",
        children: innerBlocksProps.children
      }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.Fragment, {
        children: innerBlocksProps.children
      })
    }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.Fragment, {
      children: innerBlocksProps.children
    })]
  });
}

/***/ }),

/***/ "./src/blocks/archive/helpers.js":
/*!***************************************!*\
  !*** ./src/blocks/archive/helpers.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
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
 * Fetch safe posts
 */
const fetchSafePosts = postType => {
  var _useSelect;
  return (_useSelect = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.useSelect)(select => {
    if (!postType) return [];
    return select('core').getEntityRecords('postType', postType, {
      per_page: -1
    } // or a large number like 100
    );
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
const onChangePostType = (value, predefinedPosts, selectedPostIds, setAttributes) => {
  setAttributes({
    postType: value,
    predefinedPosts: [],
    selectedPostIds: [],
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

/***/ "./src/blocks/archive/index.js":
/*!*************************************!*\
  !*** ./src/blocks/archive/index.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./block.json */ "./src/blocks/archive/block.json");
/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./edit */ "./src/blocks/archive/edit.js");
/* harmony import */ var _save__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./save */ "./src/blocks/archive/save.js");
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../helpers */ "./src/blocks/helpers.js");
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./style.scss */ "./src/blocks/archive/style.scss");






//import './editor.scss';

// Overwrite supports using stanza.json options
_block_json__WEBPACK_IMPORTED_MODULE_1__ = (0,_helpers__WEBPACK_IMPORTED_MODULE_4__.supportsByOptions)('stanza/archive', _block_json__WEBPACK_IMPORTED_MODULE_1__);

// Overwrite attributes defaults using stanza.json options
_block_json__WEBPACK_IMPORTED_MODULE_1__ = (0,_helpers__WEBPACK_IMPORTED_MODULE_4__.defaultsByOptions)('stanza/archive', _block_json__WEBPACK_IMPORTED_MODULE_1__);

// Set options using stanza.json options
_block_json__WEBPACK_IMPORTED_MODULE_1__ = (0,_helpers__WEBPACK_IMPORTED_MODULE_4__.setBlockOptionsAttribute)('stanza/archive', _block_json__WEBPACK_IMPORTED_MODULE_1__, 'archiveOptions');
(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.registerBlockType)(_block_json__WEBPACK_IMPORTED_MODULE_1__.name, {
  ..._block_json__WEBPACK_IMPORTED_MODULE_1__,
  edit: _edit__WEBPACK_IMPORTED_MODULE_2__["default"],
  save: _save__WEBPACK_IMPORTED_MODULE_3__["default"]
});

// Register styles using stanza.json options
(0,_helpers__WEBPACK_IMPORTED_MODULE_4__.registerBlockStyles)('stanza/archive');

// Register variations using stanza.json options
(0,_helpers__WEBPACK_IMPORTED_MODULE_4__.registerBlockVariations)('stanza/archive');

/***/ }),

/***/ "./src/blocks/archive/save.js":
/*!************************************!*\
  !*** ./src/blocks/archive/save.js ***!
  \************************************/
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
    parentId,
    useBlockWrapper,
    useInnerBlocksWrapper
  } = attributes;
  const blockProps = _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__.useBlockProps.save();
  const innerBlocksProps = _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__.useInnerBlocksProps.save(blockProps);
  return useBlockWrapper ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
    ...innerBlocksProps,
    children:
    // Add wp-block-stanza-free-archive__inner wrapper only if it does NOT have a parent block
    !parentId && (useInnerBlocksWrapper !== null && useInnerBlocksWrapper !== void 0 ? useInnerBlocksWrapper : true) || parentId && (useInnerBlocksWrapper !== null && useInnerBlocksWrapper !== void 0 ? useInnerBlocksWrapper : false) ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
      className: "wp-block-stanza-archive__inner",
      children: innerBlocksProps.children
    }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.Fragment, {
      children: innerBlocksProps.children
    })
  }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.Fragment, {
    children: innerBlocksProps.children
  });
}

/***/ }),

/***/ "./src/blocks/archive/style.scss":
/*!***************************************!*\
  !*** ./src/blocks/archive/style.scss ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


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

/***/ "./src/blocks/icons.js":
/*!*****************************!*\
  !*** ./src/blocks/icons.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   IconSet: () => (/* binding */ IconSet)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);

const IconSet = {
  alignPullBottom: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    version: "1.1",
    viewBox: "0 0 20 20",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("rect", {
      x: "5",
      y: "3",
      width: "10",
      height: "2"
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("rect", {
      x: "3",
      y: "11",
      width: "14",
      height: "6"
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("rect", {
      x: "5",
      y: "7",
      width: "10",
      height: "2"
    })]
  }),
  alignPullTop: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    version: "1.1",
    viewBox: "0 0 20 20",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("rect", {
      x: "5",
      y: "11",
      width: "10",
      height: "2"
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("rect", {
      x: "3",
      y: "3",
      width: "14",
      height: "6"
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("rect", {
      x: "5",
      y: "15",
      width: "10",
      height: "2"
    })]
  }),
  imageTitleTerms: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    version: "1.1",
    viewBox: "0 0 48 48",
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
      d: "M35.8,9v9H12.2v-9s23.6,0,23.6,0ZM14.2,29h1.4v-6.2h1.9v-1.4h-5.3v1.4h1.9v6.2h.1ZM19.5,25.1h16.3v-1.4h-16.3v1.4ZM27.7,34.3v2.9c0,1-.9,1.9-1.9,1.9h-2.9c-1,0-1.9-.9-1.9-1.9v-2.9c0-1,.9-1.9,1.9-1.9h2.9c1,0,1.9.9,1.9,1.9ZM26.2,34.3c0-.3-.1-.4-.4-.4h-2.9c-.3,0-.4.1-.4.4v2.9c0,.3.1.4.4.4h2.9c.3,0,.4-.1.4-.4v-2.9ZM19.5,29h9.2v-1.4h-9.2v1.4ZM19.1,34.3v2.9c0,1-.9,1.9-1.9,1.9h-2.9c-1,0-1.9-.9-1.9-1.9v-2.9c0-1,.9-1.9,1.9-1.9h2.9c1,0,1.9.9,1.9,1.9ZM17.6,34.3c0-.3-.1-.4-.4-.4h-2.9c-.3,0-.4.1-.4.4v2.9c0,.3.1.4.4.4h2.9c.3,0,.4-.1.4-.4v-2.9Z"
    })
  }),
  termsDateAuthorTitle: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    version: "1.1",
    viewBox: "0 0 48 48",
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
      d: "M26.2,9h-3c-1.1,0-2,.9-2,2v3c0,1.1.9,2,2,2h3c1.1,0,2-.9,2-2v-3c0-1.1-.9-2-2-2ZM26.7,14c0,.3-.2.5-.5.5h-3c-.3,0-.5-.2-.5-.5v-3c0-.3.2-.5.5-.5h3c.3,0,.5.2.5.5v3ZM17.2,9h-3c-1.1,0-2,.9-2,2v3c0,1.1.9,2,2,2h3c1.1,0,2-.9,2-2v-3c0-1.1-.9-2-2-2ZM17.7,14c0,.3-.2.5-.5.5h-3c-.3,0-.5-.2-.5-.5v-3c0-.3.2-.5.5-.5h3c.3,0,.5.2.5.5v3ZM35.8,33.5h-16v1.5h16v-1.5ZM19.8,39h9v-1.5h-9v1.5ZM14.2,39h1.5v-6.5h2v-1.5h-5.5v1.5h2s0,6.5,0,6.5ZM18,21c0,.6-.4,1-1,1s-1-.4-1-1,.4-1,1-1,1,.4,1,1ZM19.5,21c0,1.4-1.1,2.5-2.5,2.5s-2.5-1.1-2.5-2.5,1.1-2.5,2.5-2.5,2.5,1.1,2.5,2.5ZM21.7,28.5v-1c0-1.5-1.2-2.8-2.8-2.8h-4c-1.5,0-2.8,1.2-2.8,2.8v1h1.5v-1c0-.7.6-1.2,1.2-1.2h4c.7,0,1.2.6,1.2,1.2v1h1.7ZM33.8,18.5h-6.5c-1.1,0-2,.9-2,1.9v6.1c0,1.1.9,1.9,2,1.9h6.5c1.1,0,2-.9,2-1.9v-6.1c0-1.1-.9-1.9-2-1.9ZM34.3,26.6c0,.3-.2.5-.5.5h-6.5c-.3,0-.5-.2-.5-.5v-4.2h7.5s0,4.2,0,4.2Z"
    })
  }),
  termsTitle: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    version: "1.1",
    viewBox: "0 0 48 48",
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
      d: "M14.4,30v-3c0-1.1-.9-2-2-2h-3c-1.1,0-2,.9-2,2v3c0,1.1.9,2,2,2h3c1.1,0,2-.9,2-2ZM9.4,30.5c-.3,0-.5-.2-.5-.5v-3c0-.3.2-.5.5-.5h3c.3,0,.5.2.5.5v3c0,.3-.2.5-.5.5h-3ZM14.4,21v-3c0-1.1-.9-2-2-2h-3c-1.1,0-2,.9-2,2v3c0,1.1.9,2,2,2h3c1.1,0,2-.9,2-2ZM9.4,21.5c-.3,0-.5-.2-.5-.5v-3c0-.3.2-.5.5-.5h3c.3,0,.5.2.5.5v3c0,.3-.2.5-.5.5h-3ZM40.6,27.4h-16v1.5h16v-1.5ZM24.6,32.9h9v-1.5h-9v1.5ZM19,33h1.5v-6.5h2v-1.5h-5.5v1.5h2s0,6.5,0,6.5ZM40.6,17.4h-16v1.5h16v-1.5ZM24.6,22.9h9v-1.5h-9v1.5ZM19,23h1.5v-6.5h2v-1.5h-5.5v1.5h2s0,6.5,0,6.5Z"
    })
  }),
  title: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    version: "1.1",
    viewBox: "0 0 48 48",
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
      d: "M35.8,22.4h-16v1.5h16v-1.5ZM19.8,27.9h9v-1.5h-9v1.5ZM14.2,28h1.5v-6.5h2v-1.5h-5.5v1.5h2s0,6.5,0,6.5Z"
    })
  }),
  titleContent: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    version: "1.1",
    viewBox: "0 0 48 48",
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
      d: "M14.2,21.5h1.4v-6.2h1.9v-1.4h-5.3v1.4h1.9v6.2h.1ZM19.5,17.6h16.3v-1.4h-16.3v1.4ZM19.5,21.5h9.2v-1.4h-9.2v1.4ZM12.2,26.3h23.6v-1.4H12.2v1.4ZM12.2,30.2h23.6v-1.4H12.2v1.4ZM12.2,34.1h16.5v-1.4H12.2v1.4Z"
    })
  }),
  titleTerms: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    version: "1.1",
    viewBox: "0 0 48 48",
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
      d: "M14.2,22.7h1.4v-6.2h1.9v-1.4h-5.3v1.4h1.9v6.2h.1ZM19.5,18.8h16.3v-1.4h-16.3v1.4ZM27.7,28v2.9c0,1-.9,1.9-1.9,1.9h-2.9c-1,0-1.9-.9-1.9-1.9v-2.9c0-1,.9-1.9,1.9-1.9h2.9c1,0,1.9.9,1.9,1.9ZM26.2,28c0-.3-.1-.4-.4-.4h-2.9c-.3,0-.4,0-.4.4v2.9c0,.3.1.4.4.4h2.9c.3,0,.4,0,.4-.4v-2.9ZM19.5,22.7h9.2v-1.4h-9.2v1.4ZM19.1,28v2.9c0,1-.9,1.9-1.9,1.9h-2.9c-1,0-1.9-.9-1.9-1.9v-2.9c0-1,.9-1.9,1.9-1.9h2.9c1,0,1.9.9,1.9,1.9ZM17.6,28c0-.3-.1-.4-.4-.4h-2.9c-.3,0-.4,0-.4.4v2.9c0,.3.1.4.4.4h2.9c.3,0,.4,0,.4-.4v-2.9Z"
    })
  })
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
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
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
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"blocks/archive/index": 0,
/******/ 			"blocks/archive/style-index": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = globalThis["webpackChunkstanza_blocks"] = globalThis["webpackChunkstanza_blocks"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["blocks/archive/style-index"], () => (__webpack_require__("./src/blocks/archive/index.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=index.js.map