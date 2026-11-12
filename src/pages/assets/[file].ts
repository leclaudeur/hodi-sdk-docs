import type { APIRoute, GetStaticPaths } from 'astro'
import { demoAssets } from '../../lib/demo.ts'

// The renders' CSS and the playground's files, written into dist/assets/ under their hashed names.
export const getStaticPaths = (() =>
  Object.values(demoAssets).map(asset => ({
    params: { file: asset.file },
    props: { body: asset.body }
  }))) satisfies GetStaticPaths

const types: Record<string, string> = { css: 'text/css', js: 'text/javascript' }

export const GET: APIRoute = ({ props, params }) =>
  new Response(new Uint8Array(props.body as Buffer), {
    headers: { 'Content-Type': types[String(params.file).split('.').pop() ?? ''] ?? 'text/plain' }
  })
