{
  "apiVersion": 3,
  "name": "stanza/composer",
  "title": "Block composer",
  "icon": "grid-view",
  "category": "design",
  "description": "Combine multiple blocks to create rich, custom layouts.",
  "attributes": {
    "align": { ! important
      "type": "string" ! important
      "default": // Defaults must go here - optional
    },
    // Layout attributes no longer need to be declared manually
    "backgroundColor": {
      "type": "string"
    },
    "template": {
      "type": "array"
    }
  },
  "supports": {
    "anchor": true,
    "inserter": true,
    "align": true, // ! important
    "layout": {
      "allowCustomContentAndWideSize": false
      { "type": "default", "justifyContent": "center" } // Defaults must go here * - ! important
    }
  },  
  "editorScript": [ "file:./index.js" ]
}


*
After insert block, editor has the updated values, but front-end not.
Toggle any layout option to update front-end
TODO: find a solution (maybe updating attributes from php)


/**
 * Overwrite supports using stanza.json options
 * "align" has to be both in attributes & supports (boolean or array)
 * "layout" has to be only in supports
 */
export const supportsByOptions = (block, metadata) => {
  const Stanza = window?.Stanza ?? undefined;

  if (metadata?.supports?.align) {
    metadata.supports.align =
      Stanza?.settings?.align // Settings align
      ? Stanza?.blocks?.[block]?.align?.options // (boolean or Array)
      : false;
  }
  
  if (metadata?.supports?.layout) {
    metadata.supports.layout.default =
      Stanza?.settings?.layout  // Settings layout      
      ? Stanza?.blocks?.[block]?.layout?.default // (Object)
      : false;
  }

  return metadata;
}