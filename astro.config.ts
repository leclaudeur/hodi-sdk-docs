import { rehypeHeadingIds } from '@astrojs/markdown-remark'
import sitemap from '@astrojs/sitemap'
import { defineConfig } from 'astro/config'
import { codeWindow } from './src/lib/code-window.ts'
import { rehypeDocs } from './src/lib/rehype-docs.ts'

// Pages that only send the browser on, older versions and Premiers pas past its first step (their canonical is
// another page): not listed.
const unlisted = /^\/(?:(?:fr|en)\/(?:guide\/)?)?$|^\/v\d+\/|^\/404|\/first-steps\/[^/]+\/$/

// Static pages only: nginx serves dist/ as plain files, nothing runs on the server.
export default defineConfig({
  // The site's public address, for canonical links and the sitemap; the image's build sets it.
  site: process.env.SITE_URL ?? 'http://localhost:4321',
  trailingSlash: 'always',
  build: { format: 'directory' },
  integrations: [sitemap({ filter: page => !unlisted.test(new URL(page).pathname) })],
  markdown: {
    // Quotes and apostrophes stay as written: the text decides its own typography.
    smartypants: false,
    shikiConfig: { theme: 'css-variables', transformers: [codeWindow()] },
    // Titles get their ids first, so their links can point at them.
    rehypePlugins: [rehypeHeadingIds, rehypeDocs]
  }
})
