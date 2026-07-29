<?php
defined( 'ABSPATH' ) || exit;
get_header();
?>

<main class="wp-block-group is-layout-flow">
	<div class="entry-content wp-block-post-content">
		<h1><?php esc_html_e( 'Page not found', 'stanza-starter' ); ?></h1>
		<p><a href="<?php echo esc_url( home_url( '/' ) ); ?>"><?php esc_html_e( 'Back to the homepage', 'stanza-starter' ); ?></a></p>
	</div>
</main>

<?php get_footer(); ?>
