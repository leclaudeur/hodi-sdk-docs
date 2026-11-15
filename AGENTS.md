# AGENTS.md

Instructions for AI coding agents working on the Hodi SDK website. Read `README.md` first: it explains the folders,
the front matter, the versions and the deployment.

- The site is static: Astro writes HTML into `dist/`, nginx serves it. Add JavaScript only for what HTML and CSS
  cannot do, as a small script in `src/scripts/`. No framework in a page unless it draws a real component.
- The look is Hodi's: its tokens in `src/styles/tokens.css` (copied from hodi's `web/src/styles/tokens.css`,
  never edited here), its fonts, its menus (the app's Menu under the profile switcher) and its sidebar. Never
  hard-code a colour; accent text uses `--rust`.
- The pages are in `src/content/v<major>/<lang>/`. French is the reference. It never speaks to the reader, neither « tu »
  nor « vous »: « les styles passent par une classe », not « passe par une classe ». Only a plugin's own texts in the
  examples say « tu », as Hodi does. Only the text is French: addresses, file names, code, comments, identifiers and
  commits are in English.
- The interface's own words (Copier, the menus, the sidebar's groups) are in `src/i18n/fr.json` and `en.json`, every
  key in both.
- Never edit an older major's folder except to fix an error: a new major copies the folder.
- Code blocks in Markdown keep one entry per line for any object or array with more than one entry; Prettier does not
  touch them.
- SEO and speed are part of the work: every page has its title, description and canonical link, and Lighthouse stays
  at 100 for performance, best practices and SEO.
- TypeScript strict, ES modules, imports with the `.ts` extension. Prettier decides formatting (no semicolons, single
  quotes, 120 columns): run `npm run format`. At most 300 lines per file and 80 per function, cognitive complexity
  under 15. Comments say why in one or two plain sentences, above the line they concern.
- Check a visual change in a real browser at 1440 × 900, 820 × 1180 and 390 × 844, in the dark and light themes.
- Before a pull request: `npm run typecheck`, `npm run lint`, `npm run format:check` and `npm run build` must pass.
- Commits and pull request titles follow Conventional Commits. Never put a session link in a commit, a pull request or
  a comment. Only Antho merges.
