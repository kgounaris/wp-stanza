import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
    const { url, linkToForm, opensInNewTab, text } = attributes;
    const blockProps = useBlockProps.save();

    return (
        <>
        { text && url && (
            <div {...blockProps}>
                <RichText.Content
                    tagName="a" // Use anchor tag in the front end
                    className={`wp-block-button__link wp-element-button`}
                    href={linkToForm ? linkToForm : (url || undefined)} // Avoid rendering empty href
                    value={text}
                    target={opensInNewTab ? '_blank' : undefined}
                    rel={opensInNewTab ? 'noopener noreferrer' : undefined}
                />
            </div>
        )}
        </>
    );
}