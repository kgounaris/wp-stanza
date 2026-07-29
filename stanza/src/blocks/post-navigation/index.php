<?php
defined( 'ABSPATH' ) || exit;

/**
 * stanza/post-navigation — previous/next links plus a link back to the
 * posts page.
 */
register_block_type(
	STANZA_PATH . 'build/blocks/post-navigation',
	array(
		'render_callback' => function ( $attributes, $content, $block ) {
			$previous_post = get_previous_post();
			$next_post     = get_next_post();

			if ( ! $previous_post && ! $next_post ) {
				return '';
			}

			ob_start();
			?>
			<nav class="wp-block-stanza-post-navigation" aria-label="<?php esc_attr_e( 'Post navigation', 'stanza' ); ?>">

				<?php if ( $previous_post ) : ?>
					<a class="wp-block-stanza-post-navigation__link wp-block-stanza-post-navigation__link--previous" href="<?php echo esc_url( get_permalink( $previous_post ) ); ?>">
						<span class="wp-block-stanza-post-navigation__label"><?php esc_html_e( 'Previous article', 'stanza' ); ?></span>
					</a>
				<?php endif; ?>

				<?php if ( $next_post ) : ?>
					<a class="wp-block-stanza-post-navigation__link wp-block-stanza-post-navigation__link--next" href="<?php echo esc_url( get_permalink( $next_post ) ); ?>">
						<span class="wp-block-stanza-post-navigation__label"><?php esc_html_e( 'Next article', 'stanza' ); ?></span>
					</a>
				<?php endif; ?>

				<?php $posts_page_id = (int) get_option( 'page_for_posts' ); ?>
				<?php if ( $posts_page_id ) : ?>
					<a class="wp-block-stanza-post-navigation__link wp-block-stanza-post-navigation__link--posts-page" href="<?php echo esc_url( get_permalink( $posts_page_id ) ); ?>"><?php echo esc_html( get_the_title( $posts_page_id ) ); ?></a>
				<?php endif; ?>

			</nav>
			<?php
			return ob_get_clean();
		},
	)
);
