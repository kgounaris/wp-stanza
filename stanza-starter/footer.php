	<footer class="site-footer">
		<nav class="site-footer__nav" aria-label="<?php esc_attr_e( 'Footer', 'stanza-starter' ); ?>">
			<?php
			wp_nav_menu( array(
				'theme_location' => 'footer',
				'container'      => false,
				'menu_class'     => 'footer-menu',
				'fallback_cb'    => false,
			) );
			?>
		</nav>
		<p class="site-footer__copyright">&copy; <?php echo esc_html( gmdate( 'Y' ) . ' ' . get_bloginfo( 'name' ) ); ?></p>
	</footer>

</div><!-- .wp-site-blocks -->

<?php wp_footer(); ?>
</body>
</html>
