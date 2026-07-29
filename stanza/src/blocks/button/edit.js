
import { __ } from '@wordpress/i18n';
import { useBlockProps, BlockControls, InspectorControls, RichText, __experimentalLinkControl } from '@wordpress/block-editor';
import { ToolbarButton, PanelBody, SelectControl, Popover } from '@wordpress/components';
import { useState } from '@wordpress/element';
import { displayShortcut } from '@wordpress/keycodes';
import { link } from '@wordpress/icons';

export default function Edit({ attributes, setAttributes, isSelected }) {
    const { url, linkToForm, opensInNewTab, text } = attributes;
    const [isEditingURL, setIsEditingURL] = useState(false); // State for controlling the link editing
    const blockProps = useBlockProps();

    const startEditing = () => {
        setIsEditingURL(true);
    };

    const stopEditing = () => {
        setIsEditingURL(false);
    };

    const wpforms = [];

    return (
        <>
            {/* Toolbar for link editing */}
            <BlockControls>
                <ToolbarButton
                    name="link"
                    icon={link}
                    title={__('Edit Link', 'stanza')}
                    shortcut={displayShortcut.primary('k')}
                    onClick={startEditing}
                    style={
                        {backgroundColor: ! url ? 'yellow' : 'transparent' }
                    }
                />
            </BlockControls>
            <InspectorControls>
                <PanelBody title="Options">
                    <SelectControl
                        label="Open form modal"
                        value={linkToForm}
                        options={wpforms}
                        onChange={(value) => setAttributes({
                            linkToForm: value,
                            url: value ? '#' : ''
                        })}
                    />
                </PanelBody>
            </InspectorControls>

            {/* Show the Popover when editing the URL */}
            {isSelected && isEditingURL && (
                <Popover position="bottom-center" onClose={stopEditing}>
                    <__experimentalLinkControl
                        value={{ url, opensInNewTab }}
                        onChange={({ url: newUrl, opensInNewTab: newTab }) => {
                            setAttributes({ url: newUrl, opensInNewTab: newTab });
                        }}
                        onRemove={() => {
                            setAttributes({ url: '' });
                            stopEditing();
                        }}
                    />
                </Popover>
            )}
            <>
                <div {...blockProps}>
                    <RichText
                        tagName="div" // Use div in the admin
                        className={`wp-block-button__link wp-element-button`}
                        value={text}
                        onChange={(newText) => setAttributes({ text: newText })}
                        placeholder={__('Add text...', 'stanza')}
                        allowedFormats={[]}
                    />
                </div>
                { ! url && false && <mark style={{position:'absolute',top:'100%',marginTop:'1em','fontSize':'.8em',padding:'.2em .5em'}}>Link is missing</mark>}
            </>
        </>
    );

}