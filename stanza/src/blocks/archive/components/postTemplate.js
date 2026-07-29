
import { Spinner } from '@wordpress/components';
import { RichText } from '@wordpress/block-editor';

export default function PostTemplate({ PatternComponent, posts, postType, blocks, archiveTitle }) {

	return (
		<>
		{ !posts && <Spinner /> }

		{ archiveTitle.display && (
		<div className="wp-block-stanza-header is-layout-flow">
	    	<RichText
				tagName="p"
				value={ archiveTitle?.subtitle }
				className="is-style-subtitle"
				onChange={ (value) => setAttributes({ archiveTitle: {text: archiveTitle.text, subtitle: value, display: archiveTitle.display} }) }
				placeholder="Subtitle"
				allowedFormats={ [] }
			/>
			
	    	<RichText
				tagName="h2"
				value={ archiveTitle?.text }
				className="wp-block-heading"
				onChange={ (value) => setAttributes({ archiveTitle: {text: value, subtitle: archiveTitle.subtitle, display: archiveTitle.display} }) }
				placeholder="Archive title"
				allowedFormats={ [] }
			/>
		</div>
		) }


	    { posts && posts.length === 0 && (
	        <div className="wp-block-stanza-archive__posts">
	            <p>{ __( 'No posts found for the current query.', 'stanza' ) }</p>
	        </div>
	    ) }

	    { posts && posts.length > 0 && (
	    	<>
	        <PatternComponent
	        	blocks={ blocks }
	            posts={ posts }
	            postType={ postType }
	        />
	        </>
	    )}
		</>
	);
}