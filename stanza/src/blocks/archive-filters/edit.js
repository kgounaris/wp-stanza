import { useBlockProps } from '@wordpress/block-editor';

export default function Edit({ attributes, setAttributes, clientId }) {
    const blockProps = useBlockProps();        

    return (
        <div {...blockProps} >
            <div className="archive-filters__section archive-filters__categories is-layout-flow">{'Filters'}</div>
        </div>
    );
}