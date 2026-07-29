export const attributes = {  
  "mediaAlt": {
    "type": "string"
  },
  "mediaAspectRatio": {
    "type": "string"
  },
  "mediaBackgroundColor": {
    "type": "string"
  },
  "mediaFigureOrientation": {
    "type": "string"
  },
  "mediaCaption": {
    "type": "string"
  },
  "mediaHasCaption": {
    "type": "boolean"
  },
  "mediaHref": {
    "type": "string",
    "source": "attribute",
    "selector": "figure > a",
    "attribute": "href",
    "role": "content"
  },
  "mediaHrefIsPredefined": {
    "type": "string"
  },
  "mediaId": {
    "type": "number"
  },
  "mediaIdPredefined": {
    "type": "boolean",
    "default": false
  },
  "mediaIdMetaKey": {
    "type": "string"
  },
  "mediaIsFeaturedImage": {
    "type": "boolean",
    "default": false
  },
  "mediaImageSize": {
    "type": "string"
  },
  "mediaImageSizes": {
    "type": "object"
  },
  "mediaIsSvg": {
    "type": "boolean"
  },
  "mediaInlineSvg": {
    "type": "boolean"
  },
  "mediaLinkTarget": {
    "type": "string",
    "source": "attribute",
    "selector": "figure > a",
    "attribute": "target"
  },
  "mediaType": {
    "type": "string"
  },
  "mediaUrl": {
    "type": "string"
  },
  "mediaOrientation": {
    "type": "string"
  },
  "mediaOriginalAspectRatio": {
    "type": "string"
  },
  "mediaOriginalAspectRatioFactor": {
    "type": "number"
  },
  "mediaObjectPositionStyle": {
      "type": "number",
      "default": 50
  },
  "mediaOptions": {
    "type": "object",
    "default": {}
  },
  "mediaSvgHTML": {
      "type": "string"
  },
  "mediaSvgWidth": {
      "type": "number",
      "default": 100
  },
  "mediaThumbnail": {
      "type": "string"
  },
  "mediaVideoSettings": {
    "type": "object",
    "default": {
      "autoplay": true,
      "controls": false,
      "loop": true,
      "muted": true,
      "playsInline": true,
      "preload": "metadata",
      "poster": {
        "id": 0,
        "url": ""
      }
    }
  }
}