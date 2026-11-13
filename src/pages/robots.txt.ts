import type { APIRoute } from 'astro'

// Everything may be listed; the sitemap says where the pages are.
export const GET: APIRoute = ({ site }) =>
  new Response(`User-agent: *\nAllow: /\n\nSitemap: ${new URL('/sitemap-index.xml', site).href}\n`)
