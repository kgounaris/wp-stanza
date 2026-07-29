<?php
defined( 'ABSPATH' ) || exit;
get_header();
the_post();
?>

<main class="wp-block-group is-layout-flow">
	<div class="entry-content wp-block-post-content">

		<article <?php post_class(); ?>>
			<header class="entry-header">
				<p class="entry-meta">
					<?php echo esc_html( get_the_date() ); ?> — <?php the_author(); ?>
				</p>
				<h1 class="wp-block-post-title"><?php the_title(); ?></h1>
				<?php if ( has_post_thumbnail() ) : ?>
					<figure class="wp-block-stanza-media has-16-9-aspect-ratio"><?php the_post_thumbnail( 'large' ); ?></figure>
				<?php endif; ?>
			</header>

			<div class="wp-block-stanza-free-text is-layout-flow">
				<?php the_content(); ?>
			</div>

			<?php echo do_blocks( '<!-- wp:stanza/post-share /--><!-- wp:stanza/post-navigation /-->' ); ?>
		</article>

	</div>
</main>

<?php get_footer(); ?>
