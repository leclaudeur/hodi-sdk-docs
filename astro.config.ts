import { rehypeHeadingIds } from '@astrojs/markdown-remark'
import sitemap from '@astrojs/sitemap'
import { defineConfig } from 'astro/config'
import { codeWindow } from './src/lib/code-window.ts'
import { rehypeDocs } from './src/lib/rehype-docs.ts'
import { rehypeFields } from './src/lib/rehype-fields.ts'
import { rehypeNotice } from './src/lib/rehype-notice.ts'
import { demoAssets, rendersHash } from './src/lib/demo.ts'
import { rehypeRenders } from './src/lib/rehype-renders.ts'
import { rehypeTokens } from './src/lib/rehype-tokens.ts'

// Pages that only send the browser on, older versions and Premiers pas past its first step (their canonical is
// another page): not listed.
const unlisted = /^\/(?:(?:fr|en)\/(?:guide\/)?)?$|^\/v\d+\/|^\/(?:en\/)?404|\/getting-started\/[^/]+\/$/

// Static pages only: nginx serves dist/ as plain files, nothing runs on the server.
export default defineConfig({
  // The site's one public address, for canonical links, hreflang and the sitemap.
  site: 'https://sdk.get-hodi.com',
  trailingSlash: 'always',
  build: { format: 'directory' },
  integrations: [sitemap({ filter: page => !unlisted.test(new URL(page).pathname) })],
  markdown: {
    // Quotes and apostrophes stay as written: the text decides its own typography.
    smartypants: false,
    shikiConfig: { theme: 'css-variables', transformers: [codeWindow()] },
    // Titles get their ids first, so their links can point at them.
    // The renders' file names go in the config: Astro keeps the pages it rendered until its config changes, and a
    // page kept with an old name would draw its components without their styles.
    rehypePlugins: [
      rehypeHeadingIds,
      rehypeFields,
      rehypeNotice,
      [rehypeRenders, { files: [...Object.values(demoAssets).map(asset => asset.file), rendersHash] }],
      rehypeDocs,
      rehypeTokens
    ]
  }
})
