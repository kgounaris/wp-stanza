
import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls, store as blockEditorStore } from '@wordpress/block-editor';
import { PanelBody, ToggleControl, SelectControl, Spinner, Notice } from '@wordpress/components';
import { useSelect } from "@wordpress/data";

import { StanzaPanelColorSettings, StanzaAttrsPanelBody } from '../components';
import { setAlignLayoutBackground } from '../helpers';

export default function Edit({ attributes, setAttributes, clientId }) {
    const { align, backgroundColor, layout, menuId, parentId } = attributes;
    // Set align layout and default background
    setAlignLayoutBackground('stanza/hero-text', clientId, setAttributes, backgroundColor, align, layout, parentId);

    const blockProps = useBlockProps({
        className: [
            'wp-block',
            backgroundColor ? `has-${backgroundColor}-background-color has-background-color` : ''
        ].filter(Boolean).join(' ')
    });

    const { menus, isResolving } = useSelect((select) => {
        const core = select("core");
        const query = { per_page: -1 };

        return {
            menus: core.getEntityRecords("taxonomy", "nav_menu", query),
            isResolving: core.isResolving("getEntityRecords", [
                "taxonomy",
                "nav_menu",
                query,
            ]),
        };
    }, []);

    if (isResolving && !menus) return <Spinner />;

    if (!menus) {
        return (
            <Notice status="warning" isDismissible={false}>
                Couldn’t load menus.
            </Notice>
        );
    }

    const options = [
        { label: "Select a menu…", value: 0 },
        ...menus.map((m) => ({ label: m.name, value: m.id }))
    ];    

    const selectedOption = options.find(
      (option) => option.value === menuId
    );

    return (
        <>
            <InspectorControls>
                <StanzaAttrsPanelBody
                    attributes={ attributes }
                />
                
                <PanelBody>
                    <SelectControl
                        label="Menu"
                        value={menuId || 0}
                        options={options}
                        onChange={(value) => setAttributes({ menuId: Number(value) })}
                    />
                </PanelBody>
            </InspectorControls>
            
            {
            // Add wp-block-stanza-navigation__inner wrapper only if it does NOT have a parent block
            ! parentId ? (
            <>
                <InspectorControls group="styles">
                    <StanzaPanelColorSettings
                        setAttributes={ setAttributes }
                        colorAttribute={ backgroundColor }
                        palette={window?.Stanza?.blocks['stanza/navigation']?.attributes?.backgroundColor?.options}
                    />
                </InspectorControls>

                <div { ...blockProps }><div className="wp-block-stanza-navigation__inner wrapper" >{ `Display menu: ${selectedOption?.label || ""}` }</div></div>
            </>
            ) : (
                <div { ...blockProps }>{ `Display menu: ${selectedOption?.label || ""}` }</div>
            )}
        </>
    );

}