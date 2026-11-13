// What the preview of Premiers pas reads in each file: the same rules on the server, for the page as it starts, and in
// the editor, at each key the person types.
const readers: Record<string, (code: string) => string> = {
  'plugin.json': code => /"default"\s*:\s*"([^"\n]*)"/.exec(code)?.[1] ?? '',
  'server/index.ts': code => /text:\s*`\$\{greeting\}([^`\n]*)`/.exec(code)?.[1] ?? '',
  'web/index.tsx': code => (/<Button\b[^>]*\blook=["']primary["']/.test(code) ? 'primary' : ''),
  Terminal: code => /--code[ \t]+(\S*)/.exec(code)?.[1] ?? ''
}

export const readCode = (file: string, code: string) => readers[file]?.(code) ?? ''

// The step is done once the code says what the finished file says, whatever its spaces.
export const isDone = (file: string, code: string, finished: string) =>
  readCode(file, code).replace(/\s+/g, '') === readCode(file, finished).replace(/\s+/g, '')

interface Step {
  code: string
  edit: number
  start: string
  reveal?: number | undefined
}

// The file once the step is done, without a command's output, which only the terminal prints.
export const finishedOf = (step: Step) =>
  step.code
    .trimEnd()
    .split('\n')
    .slice(0, step.reveal ? step.reveal - 1 : undefined)
    .join('\n')

// That output: the lines from the one the step reveals.
export const outputOf = (step: Step) =>
  step.reveal
    ? step.code
        .trimEnd()
        .split('\n')
        .slice(step.reveal - 1)
        .join('\n')
    : ''

// The code as the step starts: its line as it was.
export const startOf = (step: Step) => {
  const lines = finishedOf(step).split('\n')
  const indent = /^\s*/.exec(lines[step.edit - 1] ?? '')?.[0] ?? ''
  lines[step.edit - 1] = `${indent}${step.start}`
  return lines.join('\n')
}

// What the live row shows for the code read: the setting's value, the route's answer after the setting, or the look.
export interface LiveRow {
  value?: string
  answer?: string
  primary?: boolean
}
export const liveRow = (file: string, read: string, greeting: string): LiveRow => {
  if (file === 'plugin.json') return { value: read }
  if (file === 'server/index.ts') return { answer: `${greeting}${read}` }
  if (file === 'web/index.tsx') return { primary: read === 'primary' }
  return {}
}
