// Turns the capture and the playground's build into src/demo/: the renders, their CSS and the playground's files.
import { readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'

const [work, out] = process.argv.slice(2)
const capture = JSON.parse(readFileSync(`${work}/capture.json`, 'utf8'))
const shadow = readFileSync(new URL('./shadow.css', import.meta.url), 'utf8')

writeFileSync(`${out}/renders.json`, JSON.stringify({ fr: capture.fr, en: capture.en }))
writeFileSync(`${out}/app.css`, `${shadow}\n${capture.css}\n`)
// The page already has Hodi's fonts: the playground's own copies would only weigh.
const play = readFileSync(
  `${work}/play/${readdirSync(`${work}/play`).find(name => name.endsWith('.css'))}`,
  'utf8'
).replace(/@font-face\s*{[^}]*}/g, '')
writeFileSync(`${out}/play.css`, play)
writeFileSync(`${out}/play.js`, readFileSync(`${work}/play/play.js`))
// The bundle's other files keep the names it imports them by (their hash is already in them).
for (const name of readdirSync(out)) if (/^play-.+\.js$/.test(name)) rmSync(`${out}/${name}`)
for (const name of readdirSync(`${work}/play`))
  if (/^play-.+\.js$/.test(name)) writeFileSync(`${out}/${name}`, readFileSync(`${work}/play/${name}`))
