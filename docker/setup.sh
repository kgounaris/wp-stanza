#!/bin/sh
# One-shot local setup: install core, activate Stanza + starter theme.
# Idempotent — safe to re-run.
set -e

cd /var/www/html

echo "Waiting for WordPress core files..."
i=0
until [ -f wp-includes/version.php ]; do
    i=$((i+1)); [ $i -gt 60 ] && { echo "core files never appeared"; exit 1; }
    sleep 2
done

if ! wp core is-installed 2>/dev/null; then
    echo "Installing WordPress at ${WP_URL}..."
    wp core install \
        --url="${WP_URL}" \
        --title="${WP_TITLE}" \
        --admin_user="${WP_ADMIN_USER}" \
        --admin_password="${WP_ADMIN_PASSWORD}" \
        --admin_email="${WP_ADMIN_EMAIL}" \
        --skip-email
fi

wp theme activate stanza-starter
wp plugin activate stanza
wp rewrite structure '/%postname%/' --hard

# A page to look at, set as the front page.
if ! wp post list --post_type=page --name=home --field=ID | grep -q .; then
    HOME_ID=$(wp post create --post_type=page --post_status=publish --post_title='Home' \
        --post_content='<!-- wp:stanza/free-text --><div class="wp-block-stanza-free-text wp-block is-layout-flow"><div class="is-layout-flow"><!-- wp:paragraph --><p>Stanza is running.</p><!-- /wp:paragraph --></div></div><!-- /wp:stanza/free-text -->' \
        --porcelain)
    wp option update show_on_front page
    wp option update page_on_front "${HOME_ID}"
fi

echo ""
echo "Ready: ${WP_URL}  (${WP_ADMIN_USER} / ${WP_ADMIN_PASSWORD})"
wp plugin list --fields=name,status
wp theme list --fields=name,status
