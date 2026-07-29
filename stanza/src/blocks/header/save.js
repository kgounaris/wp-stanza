
import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';

export default function save({ attributes }) {
    const { tag, tagProps } = attributes;

    const blockProps = useBlockProps.save({
        className: [
            tagProps?.className,
            'is-layout-flow'
        ].filter(Boolean).join(' '),
    });

	const innerBlocksProps = useInnerBlocksProps.save();

    return (
    	<>
        { tag ? (
                (() => {
                    const Tag = tag;
                    return <Tag {...blockProps}>{ innerBlocksProps.children }</Tag>;
                })()
            ) : (
                innerBlocksProps.children
            )}
        </>
    );
}