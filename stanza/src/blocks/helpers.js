
import { __ } from '@wordpress/i18n';
import { registerBlockType, getBlockType } from '@wordpress/blocks';
import { store as blockEditorStore } from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';
import { useEffect } from '@wordpress/element';

/**
 * Set align layout and default background
 */
export const setAlignLayoutBackground = (block, clientId, setAttributes, backgroundColor, align, layout = undefined, parentId = undefined) => {
	const rootClientId = useSelect(
        ( select ) => select( blockEditorStore ).getBlockRootClientId( clientId ),
        [ clientId ]
    );

	// Disable align and layout if has parent block
	useEffect(() => {
		if ( ! rootClientId) return;
		
		setAttributes({
			parentId: rootClientId,
			layout: undefined,
			align: ''
		});		
	}, [rootClientId, layout, align]);

	if ('stanza/media' == block) return rootClientId; // TODO: conflict with backgroundColor & mediaBackgroundColor

	// Set default background color by force
	useEffect(() => {
		// For variations
		/*if ( 'undefined' == backgroundColor || undefined == backgroundColor ) {
			setAttributes({ backgroundColor: undefined });
			return;
		}*/

		if ( rootClientId ) {
			setAttributes({ backgroundColor: undefined });
		}

		if ( ! backgroundColor && ! rootClientId && window?.Stanza?.blocks[block]?.attributes?.backgroundColor?.default ) {
			setAttributes({ backgroundColor: window?.Stanza?.blocks[block]?.attributes?.backgroundColor?.default })
		}		
	}, [rootClientId]);

	return rootClientId;
}

/**
 * Overwrite supports using stanza.json options
 * "align" has to be both in attributes & supports (boolean or array)
 * "layout" has to be only in supports
 */
export const supportsByOptions = (block, metadata) => {
	const Stanza = window?.Stanza ?? undefined;
	if ( ! metadata?.supports || ! Stanza?.blocks?.[block]?.supports) return metadata;

	Object.entries(metadata?.supports).forEach(([key, value]) => {
		if ('undefined' !== typeof Stanza?.blocks?.[block]?.supports?.[key]) {
			const generalSetting = 'undefined' !== typeof Stanza?.supports?.[key] ? Stanza?.supports?.[key] : true;
			metadata.supports[key] = generalSetting ? Stanza.blocks[block].supports[key] : false;
		}
	});

	return metadata;
}

/**
 * Overwrite attributes defaults using stanza.json options
 * align
 * globalPadding
 * mediaImageSize
 * mediaAspectRatio
 * template
 * subtitlePosition
 */
export const defaultsByOptions = (block, metadata) => {
	const Stanza = window?.Stanza ?? undefined;

	if ( ! metadata?.attributes || ! Stanza?.blocks?.[block]?.attributes) return metadata;


	Object.entries(metadata?.attributes).forEach(([key, value]) => {
		if ('undefined' !== typeof Stanza?.blocks?.[block]?.attributes?.[key]?.default) {
			metadata.attributes[key].default = Stanza.blocks[block].attributes[key].default;
		}
	});
	
	return metadata;
}

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
export const setBlockOptionsAttribute = (block, metadata, optionsAttr = '') => {
	const Stanza = window?.Stanza ?? undefined;

	if ( ! metadata?.attributes || ! Stanza?.blocks?.[block]?.attributes) return metadata;

	Object.entries(metadata?.attributes).forEach(([key, value]) => {
		if (optionsAttr && 'undefined' !== typeof Stanza?.blocks?.[block]?.attributes?.[key]?.options) {
			metadata.attributes[optionsAttr].default[key] = Stanza.blocks[block].attributes[key].options;
		}
	});


	return metadata;
}

/**
 * Register styles using stanza.json options
 * TODO: Somehow handle style, variation pair inside edit.js
 */
export const registerBlockStyles = (block) => {
	const Stanza = window?.Stanza ?? undefined;
	const styles = Stanza?.blocks?.[block]?.styles;
	const stylesArray = []

	if (!styles || !styles.length) {	
		return;
	}

	for (const s of styles) {
	 	const [ name, label ] = Object.entries( s )[0];
	 	const isDefault = s?.isDefault;

		stylesArray.push(
			{
			    name: name,
				label: __( label, 'stanza' ),
				isDefault: isDefault
			}
		);
	}

	wp.blocks.registerBlockStyle(block, stylesArray);
}

/**
 * Register variations using stanza.json options
 */
export const registerBlockVariations = (block) => {
	const Stanza = window?.Stanza ?? undefined;
	const variations = Stanza?.blocks?.[block]?.variations;
	const variationsArray = []

	if (!variations || !variations.length) {	
		return;
	}


	for (const v of variations) {
		variationsArray.push(
			{
			    name: v.name,
			    title: v.title,
			    description: v.description,
			    icon: v.icon,
			    attributes: v.attributes,
			    scope: v.scope,
			    isActive: v.isActive,
			    isDefault: v.isDefault
			}
		);
	}

	wp.blocks.registerBlockVariation(block, variationsArray);
}

/**
 * Register block types using stanza.json options
 */
export const registerBlockTypes = (block) => {
	const Stanza = window?.Stanza ?? undefined;
	const newBlocks = Stanza?.blocks?.[block]?.registerBlocks;
	const newBlocksArray = [];

	if (!newBlocks || ! newBlocks.length) {	
		return;
	}

	for (const nb of newBlocks) {
		// Same attributes declaration as src/blocks/composer/index.php (PHP side)
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
				  	"default": { "type": "default", "justifyContent": "center" }
				}
			}
		}

		// Overwrite supports using stanza.json options
		newMetadata = supportsByOptions(`${block}-${nb.name}`, newMetadata);

		// Overwrite attributes defaults using stanza.json options
		newMetadata = defaultsByOptions((`${block}-${nb.name}`), newMetadata);		

		registerBlockType(`${block}-${nb.name}`, {
			...newMetadata,
			edit( props ) {
				const { attributes, setAttributes, clientId } = props;
				const { backgroundColor } = attributes;

				// Set align layout and default background
				setAlignLayoutBackground(`${block}-${nb.name}`, clientId, setAttributes, backgroundColor/*, parentId*/);

				const newBlock = getBlockType(block);
				return newBlock.edit(props);
			},
			save( props ) {
				const newBlock = getBlockType(block);

				if ( ! newBlock ) {
					return null;
				}

				return newBlock.save(props);
			}
		} );

		// Register styles using stanza.json options
		registerBlockStyles(`${block}-${nb.name}`);

		// Register variations using stanza.json options
		registerBlockVariations(`${block}-${nb.name}`);
	}
}