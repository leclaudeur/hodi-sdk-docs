import * as lucide from 'lucide'

type IconNode = [tag: string, attributes: Record<string, string | number>][]

const pascal = (name: string) => name.replace(/(^|-)(\w)/g, (_, _dash: string, c: string) => c.toUpperCase())

// Lucide no longer ships brands' logos: GitHub's mark, in lucide's own strokes (from lucide 0.4x).
const extra: Record<string, IconNode> = {
  github: [
    [
      'path',
      {
        d: 'M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4'
      }
    ],
    ['path', { d: 'M9 18c-4.51 2-5-2-7-2' }]
  ]
}

// A lucide icon's shapes, by its kebab-case name: what the Icon component and the code window draw.
export const iconNode = (name: string): IconNode => {
  const node = extra[name] ?? (lucide as unknown as Record<string, IconNode | undefined>)[pascal(name)]
  if (!node) throw new Error(`Unknown lucide icon: ${name}`)
  return node
}

// The same attributes as every lucide icon, at the size asked.
export const svgAttributes = (size: number) => ({
  xmlns: 'http://www.w3.org/2000/svg',
  width: size,
  height: size,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  'stroke-width': 2,
  'stroke-linecap': 'round' as const,
  'stroke-linejoin': 'round' as const,
  'aria-hidden': 'true' as const
})
