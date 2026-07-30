# Stanza — WordPress block framework + starter theme

A Gutenberg block system for building design-system-driven WordPress sites:

- **[`stanza/`](stanza/)** — the framework plugin: ~25 generic block
  primitives (media, hero-text, teaser, slider, archive, post-template, …)
  built on the standard `wp-scripts` / `block.json` toolchain. Blocks are
  intentionally unopinionated; each theme decides what exists and how it
  composes.
- **[`stanza-starter/`](stanza-starter/)** — a minimal classic theme showing
  the contract: `theme.json` v3 tokens plus `theme-blocks/stanza.json`, the
  single configuration file that enables blocks, sets attribute defaults and
  options, and declares **composer blocks** — page sections defined as
  InnerBlocks templates over the primitives, registered dynamically as
  `stanza/composer-<name>`.

## How it fits together

```
theme-blocks/stanza.json   which blocks exist, their defaults/options,
                           composer section definitions, breakpoints
theme.json                 design tokens (palette, fluid type, spacing)
plugin                     generic primitives + editor curation
window.Stanza              the same config, exposed to editor JS
```

The editor is deliberately constrained: only whitelisted blocks, preset
colors and type sizes only, locked default templates where sections demand
it. Editors compose and write; the design system holds.

## Quick start (local dev, Docker)

```bash
docker compose up -d
docker compose run --rm cli /setup.sh
# -> http://localhost:8081 (admin / admin)
```

WordPress (php8.3-apache) + MySQL 8 — matching the production database
engine. Plugin and starter theme are bind-mounted, so code edits show on
refresh. The setup script installs core, activates both, sets permalinks and
a front page; it's idempotent, re-run it any time.

**Verify the environment** after changes:

```bash
docker compose run --rm cli /smoke.sh
```

(checks install, active plugin/theme, registered blocks, front page render,
wp-admin redirect, no PHP fatals, no notices leaking into HTML).

**Per-project themes** mount via a gitignored `docker-compose.override.yml` —
client themes live in their own repos, never in this one:

```yaml
services:
  wordpress:
    volumes:
      - ../my-client/wp-theme/my-client:/var/www/html/wp-content/themes/my-client
  cli:
    volumes:
      - ../my-client/wp-theme/my-client:/var/www/html/wp-content/themes/my-client
```

**Good to know:**
- PHP upload limits are raised to 128M via `docker/uploads.ini` (the stock
  image's 2M rejects plugin zips and media — wp-admin misreports it as
  "The link you followed has expired").
- `WP_DEBUG` logs to `wp-content/debug.log` instead of printing (printed
  notices corrupt HTTP headers and break wp-admin). Tail it with
  `docker compose exec wordpress tail -f wp-content/debug.log`.
- Database engine parity: the `mysql:8` tag tracks 8.4 LTS — pin `mysql:8.0`
  in the compose file if your production server runs 8.0.x.
- WP-CLI for anything else: `docker compose run --rm cli wp <command>`.

## Deploy

Coolify-ready: `deploy/Dockerfile` bakes plugin + theme into the official
WordPress image (immutable deploys, only `uploads/` on a volume). See
[deploy/README.md](deploy/README.md).

## Working on the framework

1. The plugin no-ops without a `theme-blocks/stanza.json` in the active theme.
2. Rename the starter theme per project and fill `theme.json` + `stanza.json`.
3. Develop blocks with `npm start`, ship with
   `npm run build && npm run build:editor`.
4. When breakpoints change: `wp stanza sync-scss`, then rebuild sass.

Per-site settings such as the Google Maps API key live in `stanza.json`
(`settings["google-maps-api-key"]`) — never in code.

## Status

Shared as-is: this is an internal framework made public. Issues and PRs are
welcome, but there is no support promise.

## License

GPL-2.0-or-later.
