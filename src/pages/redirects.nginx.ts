import type { APIRoute } from 'astro'
import { latest, orderOf } from '../lib/docs.ts'

// The addresses with no page of their own answer a real 301 from nginx: search engines then index the page they lead
// to, where a page that redirects in JavaScript is only an empty page. The Dockerfile moves this file into nginx.
export const GET: APIRoute = () => {
  const fr = orderOf(latest, 'fr')[0]?.url ?? '/fr/'
  const en = orderOf(latest, 'en')[0]?.url ?? fr
  const to = (path: string, url: string) => `location = ${path} { return 301 ${url}; }`
  const lines = [
    // The root: English for a browser that doesn't ask for French, as $sdk_lang in nginx.conf decides.
    `location = / { if ($sdk_lang = fr) { return 301 ${fr}; } return 301 ${en}; }`,
    to('/fr/', fr),
    to('/fr/guide/', fr),
    to('/en/', en),
    to('/en/guide/', en)
  ]
  return new Response(`${lines.join('\n')}\n`)
}
