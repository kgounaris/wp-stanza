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

## Quick start

1. Install the plugin, activate the starter theme (the plugin no-ops without
   a `theme-blocks/stanza.json` in the active theme).
2. Rename the theme per project and fill `theme.json` + `stanza.json`.
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
