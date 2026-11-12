import { defineCollection } from 'astro:content'
import { z } from 'astro/zod'
import { glob } from 'astro/loaders'

// One folder per major version of the SDK, then one per language: v1/fr/guide/server-and-web.md.
const docs = defineCollection({
  loader: glob({ base: './src/content', pattern: 'v*/*/**/*.md' }),
  schema: z.object({
    title: z.string(),
    // The search engines' summary and the link card's text: one or two sentences.
    description: z.string(),
    // The page's first paragraph, under its title.
    intro: z.string(),
    order: z.number(),
    // A lucide icon, as its kebab-case name.
    icon: z.string(),
    // A slot's colour (a Hodi topic) and the key of definePlugin() it fills.
    topic: z.string().optional(),
    key: z.string().optional(),
    // Cards of the pages under this one, drawn between the intro and the text; components ones show a render.
    cards: z.enum(['children', 'components']).optional(),
    // The component drawn on this page's card, by its key in src/demo/renders.json.
    preview: z.string().optional()
  })
})

export const collections = { docs }
