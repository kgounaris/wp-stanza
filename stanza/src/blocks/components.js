 
import { __ } from '@wordpress/i18n';
import { useSelect } from '@wordpress/data';

import { PanelColorSettings } from '@wordpress/block-editor';
import { Notice, PanelBody, RadioControl, TextControl } from '@wordpress/components';

import { wpData } from './wp-data';

/**
 * Custom Color panel settings component
 */
export const StanzaPanelColorSettings = ({ attributeKey = 'backgroundColor', palette, colorAttribute, setAttributes, title = "Background color"}) => {
    const { settings } = wpData();

    // Get theme-defined palette & filter colors
    const colors = useSelect((select) => {
        const allColors = settings.colors || [];

        // First, find the color value of the 'darkblue' slug
        //const darkblueEntry = allColors.find(color => color.slug === 'darkblue');
        //const darkblueColor = darkblueEntry?.color;

        return palette ? allColors.filter((color) => {
            // Keep only if it's in the palette
            if ( ! palette.includes(color.slug)) return false;

            // If it's the 'darkblue' entry, keep it
            //if (color.slug === 'darkblue') return true;

            // Exclude any other entry with the same color value as 'darkblue'
            return color.color; //!== darkblueColor;
        }) : 0;
    }, []);
    
    return (
        colors.length ? (
        <PanelColorSettings
            title={ title }
            colorSettings={[
                {
                    value: colors.find((c) => c.slug === colorAttribute)?.color || undefined, // || ( colors[colors.length-1].slug )
                    onChange: (newColor) => {
                        const matched = colors.find((c) => c.color === newColor);
                        setAttributes({ [attributeKey]: matched?.slug || undefined }); // || ( colors[colors.length-1].slug )
                    },
                    label: 'Background color',
                    colors,
                },
            ]}
        />
        ) : (
        <Notice status="warning" isDismissible={ false }>
            No available colors
        </Notice>
        )
    );
};

/**
 * Custom Color panel settings component
 */
export const StanzaAttrsPanelBody = ({ attributes, title="Attributes", setAttributes = undefined }) => {
    const { user, settings, entityRecord } = wpData();
    const { useInnerBlockWrapper, useInnerBlocksWrapper, readMoreContent, useBlockWrapper, sliderSettings } = attributes;
            

    return(
        <>
        { 1 == user.id ? (
            <>
            <PanelBody title={ __(title, 'stanza') } initialOpen={ false }>
                <pre style={{ fontSize: '12px', background: '#f6f7f7', padding: '8px', overflow: 'scroll' }}>
                    { JSON.stringify( attributes, null, 2 ) }
                </pre>
            </PanelBody>

            { true && (
            <PanelBody title={__('Attributes Settings', 'stanza')} initialOpen={ false }>
                <RadioControl
                    label="useInnerBlockWrapper"
                    selected={
                        useInnerBlockWrapper === undefined
                            ? 'default'
                            : useInnerBlockWrapper
                            ? 'true'
                            : 'false'
                    }
                    options={[
                        { label: 'Undefined', value: 'default' },
                        { label: 'Yes', value: 'true' },
                        { label: 'No', value: 'false' },
                    ]}
                    onChange={(value) => {
                        setAttributes({
                            useInnerBlockWrapper:
                                value === 'default'
                                    ? undefined
                                    : value === 'true',
                        });
                    }}
                />

                <RadioControl
                    label="useInnerBlock [s] Wrapper"
                    selected={
                        useInnerBlocksWrapper === undefined
                            ? 'default'
                            : useInnerBlocksWrapper
                            ? 'true'
                            : 'false'
                    }
                    options={[
                        { label: 'Undefined', value: 'default' },
                        { label: 'Yes', value: 'true' },
                        { label: 'No', value: 'false' },
                    ]}
                    onChange={(value) => {
                        setAttributes({
                            useInnerBlocksWrapper:
                                value === 'default'
                                    ? undefined
                                    : value === 'true',
                        });
                    }}
                />

                <RadioControl
                    label="useBlockWrapper"
                    selected={
                        useBlockWrapper === undefined
                            ? 'default'
                            : useBlockWrapper
                            ? 'true'
                            : 'false'
                    }
                    options={[
                        { label: 'Undefined', value: 'default' },
                        { label: 'Yes', value: 'true' },
                        { label: 'No', value: 'false' },
                    ]}
                    onChange={(value) => {
                        setAttributes({
                            useBlockWrapper:
                                value === 'default'
                                    ? undefined
                                    : value === 'true',
                        });
                    }}
                />

                <TextControl
                    label="readMoreContent"
                    value={ readMoreContent }
                    onChange={ (value) => setAttributes({ readMoreContent: value }) }
                />

                <TextControl
                    label="sliderSettings.effect"
                    value={ sliderSettings?.effect || '' }
                    onChange={ ( value ) =>
                        setAttributes( {
                            sliderSettings: {
                                ...sliderSettings,
                                effect: value,
                            },
                        } )
                    }
                />
            </PanelBody> ) }

            </>
        ) : (<></>) }
        </>
    );
};