# Deploying with Coolify

The image bakes the plugin and theme in (immutable deploys); WordPress core
comes from the official `wordpress` image, which copies itself — and the
baked `wp-content` — into the web root on first run.

## Steps

1. **Application** — new Coolify application from the GitHub repo (private is
   fine, Coolify uses its GitHub App). Build Pack: **Dockerfile**, location
   `deploy/Dockerfile`.
2. **Database** — projects do NOT ship their own DB service; they use the
   shared MySQL server already running on Coolify. Per project, create a
   dedicated database and a least-privilege user on that server:

   ```sql
   CREATE DATABASE proj_name CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci;
   CREATE USER 'proj_name'@'%' IDENTIFIED BY '<generated password>';
   GRANT ALL PRIVILEGES ON proj_name.* TO 'proj_name'@'%';
   ```

   Then set on the app:
   - `WORDPRESS_DB_HOST` — the shared server's *internal* hostname:port from
     its Coolify page (the app must be on the same Coolify network/destination)
   - `WORDPRESS_DB_NAME` / `WORDPRESS_DB_USER` / `WORDPRESS_DB_PASSWORD` —
     the per-project credentials from above
   - behind Traefik's TLS termination, also set:

     ```
     WORDPRESS_CONFIG_EXTRA=if (isset($_SERVER['HTTP_X_FORWARDED_PROTO']) && $_SERVER['HTTP_X_FORWARDED_PROTO'] === 'https') { $_SERVER['HTTPS'] = 'on'; }
     ```
3. **Storage** — persistent volume mounted at
   `/var/www/html/wp-content/uploads`.
4. **Domain/TLS** — set the FQDN in Coolify; Traefik terminates TLS. The
   image forwards `X-Forwarded-Proto`, so set both site URLs to `https://…`.
5. First deploy → visit the site → WordPress installer, or install headlessly:

   ```bash
   docker exec <container> wp core install --allow-root \
     --url=https://example.com --title="Site" \
     --admin_user=... --admin_password=... --admin_email=...
   docker exec <container> wp theme activate stanza-starter --allow-root
   docker exec <container> wp plugin activate stanza --allow-root
   ```

## Updating code

Push to the repo → Coolify rebuilds and redeploys. Note the official image
only syncs `wp-content` from the baked copy **when a directory does not
already exist** in the web root — with only `uploads/` on a volume this is
exactly the wanted behaviour (plugin/theme dirs refresh with the image; core
updates come with the base image tag).

## Per-project repos

Client projects copy this pattern: their repo holds the client theme plus
this Dockerfile with an extra `COPY <client-theme>/ …/wp-content/themes/…`
line, and pins the framework by copying `stanza/` from a tagged checkout
(git submodule, subtree, or a release zip — pick one per project and stay
with it).
