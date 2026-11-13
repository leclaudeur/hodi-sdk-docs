import type { APIRoute, GetStaticPaths } from 'astro'
import { demoAssets } from '../../lib/demo.ts'

// The renders' and the playground's .css files under their hashed names. The extension sits in this file's name so
// that the dev server, which adds a slash to every other address, serves them as files too.
export const getStaticPaths = (() =>
  Object.values(demoAssets)
    .filter(asset => asset.file.endsWith('.css'))
    .map(asset => ({
      params: { name: asset.file.slice(0, -'.css'.length) },
      props: { body: asset.body }
    }))) satisfies GetStaticPaths

export const GET: APIRoute = ({ props }) =>
  new Response(new Uint8Array(props.body as Buffer), { headers: { 'Content-Type': 'text/css' } })
