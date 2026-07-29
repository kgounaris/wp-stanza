export default function Edit({ attributes, setAttributes, clientId }) {
    return (
    	<nav class="wp-block-stanza-post-navigation">
			<a class="wp-block-stanza-post-navigation__link wp-block-stanza-post-navigation__link--previous">
				<span class="wp-block-stanza-post-navigation__label">Previous article</span>
			</a>
			<a class="wp-block-stanza-post-navigation__link wp-block-stanza-post-navigation__link--next">
				<span class="wp-block-stanza-post-navigation__label">Next article</span>
			</a>	
		</nav>
    );
}