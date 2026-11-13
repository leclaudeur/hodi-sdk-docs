import { createHash } from 'node:crypto'
import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import type { Lang } from './i18n.ts'

// The components drawn by Hodi's own code (demo/build.sh writes src/demo/): their DOM at a computer's and a
// phone's width, the CSS they use, and the playground's bundle.

// From the project's folder: the build moves this module, never the files it reads.
const read = (name: string) => readFileSync(join(process.cwd(), 'src/demo', name))

// One set per language: the English pages show the components with Hodi's English texts.
export const renders = JSON.parse(read('renders.json').toString()) as Record<
  Lang,
  { d: Record<string, string>; p: Record<string, string> }
>

// Each file is served under a name that carries its hash, so the browser keeps it for a year.
const asset = (name: string) => {
  const body = read(name)
  const [base, extension] = name.split('.')
  const hash = createHash('sha256').update(body).digest('hex').slice(0, 10)
  return { file: `${base}.${hash}.${extension}`, url: `/assets/${base}.${hash}.${extension}`, body }
}

export const demoAssets = { app: asset('app.css'), playCss: asset('play.css'), playJs: asset('play.js') }

// The playground's other files, which play.js imports by their own names: their hash is already in them.
export const playChunks = readdirSync(join(process.cwd(), 'src/demo'))
  .filter(name => /^play-.+\.js$/.test(name))
  .map(name => ({ file: name, url: `/assets/${name}`, body: read(name) }))
