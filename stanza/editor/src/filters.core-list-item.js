import { addFilter } from '@wordpress/hooks';
import { createHigherOrderComponent } from '@wordpress/compose';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl } from '@wordpress/components';

/**
 * Add custom attribute to core/list-item
 */
addFilter(
	'blocks.registerBlockType',
	'myplugin/extend-list-item',
	(settings, name) => {
		if (name !== 'core/list-item') return settings;

		return {
			...settings,
			attributes: {
				...settings.attributes,
				stanzaAttributes: {
					type: 'object',
					default: {
						marker: ''
					}
				},
			},
		};
	}
);

/**
 * Add custom attribute το settingσ
 */
const addInspectorControl = createHigherOrderComponent((BlockEdit) => {
	return (props) => {
		if (props.name !== 'core/list-item') {
			return <BlockEdit {...props} />;
		}

		const { attributes, setAttributes } = props;

		return (
			<>
				<BlockEdit {...props} />

				<InspectorControls>
					<PanelBody title="Extra Options">
						<TextControl
							label="Marker"
							value={attributes.stanzaAttributes.marker}
							onChange={(value) =>
								setAttributes({ stanzaAttributes: { marker: value } })
							}
						/>
					</PanelBody>
				</InspectorControls>
			</>
		);
	};
}, 'addInspectorControl');

addFilter(
	'editor.BlockEdit',
	'myplugin/add-inspector-controls',
	addInspectorControl
);


/**
 * Add custom attribute as data attribute on list item (editor)
 */
const withMyWrapperProp = createHigherOrderComponent( ( BlockListBlock ) => {
    return ( props ) => {
        const wrapperProps = 'core/list-item' == props.block.name ? {
            ...props.wrapperProps,
            'data-stanza-marker': props?.attributes?.stanzaAttributes?.marker || '',
        } : { ...props.wrapperProps } ;
        return <BlockListBlock { ...props } wrapperProps={ wrapperProps } />;
    };
}, 'withMyWrapperProp' );

wp.hooks.addFilter(
    'editor.BlockListBlock',
    'my-plugin/with-my-wrapper-prop',
    withMyWrapperProp
);

/**
 * Add custom attribute as data attribute on list item (front-end)
 */
addFilter(
	'blocks.getSaveElement',
	'myplugin/list-item-save',
	(element, blockType, attributes) => {
		if (blockType.name !== 'core/list-item') return element;

		if (attributes.stanzaAttributes.marker) {
			return (
				<li data-stanza-marker={attributes.stanzaAttributes.marker}>
					{element.props.children}
				</li>
			);
		}

		return element;
	}
);