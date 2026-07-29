# Stanza Starter

Starter theme for the [Stanza](../stanza) framework. Classic theme
(header.php/footer.php) + theme.json v3 tokens + `theme-blocks/stanza.json`
as the block-system configuration.

## Per-project setup

1. Rename the theme: folder, `style.css` header, `stanza-starter` text domain,
   `settings.theme` in `theme-blocks/stanza.json`.
2. Fill `theme.json`: real palette (role-named slugs: base/contrast/primary/…),
   font families (self-hosted files in `assets/fonts/` + `fontFace`
   declarations), and the fluid type scale.
3. Declare the project's sections as composer blocks in
   `theme-blocks/stanza.json` (`blocks."stanza/composer".registerBlocks`
   + one config entry per `stanza/composer-<name>` with its InnerBlocks
   template).
4. When breakpoints change, run `wp stanza sync-scss` and rebuild sass.

## Rules (learned the hard way — don't regress)

- **No raw script-injection fields.** Tracking snippets go through a
  capability-gated options page or a dedicated plugin — never `echo` an ACF
  field into `<head>`/`<body>`.
- **Escape at output**: `esc_html` / `esc_attr` / `esc_url` on every dynamic
  value in templates.
- **No environment-specific values in committed content or config**: no
  localhost URLs, no hardcoded attachment IDs, no API keys (the Maps key
  lives in stanza.json per site, restricted by referrer).
- **One text domain** — the theme's own, everywhere.
- **No client residue**: fonts, names, and config from other projects never
  ride along. Grep before you ship.
- Style via theme.json presets first; `render_block` string surgery is a
  last resort and must be scoped to a block name and documented.
