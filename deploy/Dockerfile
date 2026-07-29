# ============================================================
# Production image (used by Coolify).
# Philosophy: code lives in the image (immutable deploys — plugin, theme,
# and per-project code are COPYed in); only uploads persist on a volume.
# Rebuild to deploy; never edit code on the server.
#
# Coolify setup:
#   - Application from the (private) GitHub repo, Build Pack: Dockerfile,
#     Dockerfile location: deploy/Dockerfile
#   - Database: dedicated DB + user on the SHARED MySQL server (one server
#     for all projects, one database each) — see README.md; set WORDPRESS_DB_*
#   - Persistent volume: /var/www/html/wp-content/uploads
#   - Let Traefik terminate TLS; WordPress serves plain HTTP on :80
# ============================================================
FROM wordpress:php8.3-apache

# Framework plugin + theme(s). Per-project repos add their own theme here.
COPY stanza/        /usr/src/wordpress/wp-content/plugins/stanza/
COPY stanza-starter/ /usr/src/wordpress/wp-content/themes/stanza-starter/

# Sane production PHP defaults.
RUN { \
      echo 'upload_max_filesize = 64M'; \
      echo 'post_max_size = 64M'; \
      echo 'memory_limit = 256M'; \
      echo 'expose_php = Off'; \
    } > /usr/local/etc/php/conf.d/zz-app.ini

EXPOSE 80
