<?php
defined( 'ABSPATH' ) || exit;
get_header();
?>

<main class="wp-block-group is-layout-flow">
	<div class="entry-content wp-block-post-content">
		<?php
		echo do_blocks(
			'<!-- wp:stanza/archive-filters /-->' .
			'<!-- wp:stanza/archive {"pagination":true} -->' .
			'<!-- wp:stanza/post-template /-->' .
			'<!-- /wp:stanza/archive -->'
		);
		?>
	</div>
</main>

<?php get_footer(); ?>
