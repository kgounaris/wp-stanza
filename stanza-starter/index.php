<?php
defined( 'ABSPATH' ) || exit;
get_header();
?>

<main class="wp-block-group is-layout-flow">
	<div class="entry-content wp-block-post-content">
	<?php
	if ( is_home() ) {
		// The posts page renders its own block content.
		$posts_page_id = (int) get_option( 'page_for_posts' );
		$posts_page    = $posts_page_id ? get_post( $posts_page_id ) : null;

		if ( $posts_page ) {
			echo apply_filters( 'the_content', $posts_page->post_content );
		}
	} else {
		while ( have_posts() ) {
			the_post();
			the_content();
		}
	}
	?>
	</div>
</main>

<?php get_footer(); ?>
