import { defineCollection } from 'astro:content'
import { z } from 'astro/zod'
import { glob } from 'astro/loaders'

// One folder per major version of the SDK, then one per language: v1/fr/guide/server-and-web.md.
// A row of the preview: a setting with its value or hint, and its button.
const row = z.object({
  label: z.string(),
  value: z.string().optional(),
  hint: z.string().optional(),
  button: z.string(),
  // The value the step just changed: drawn in the text's colour, not grey.
  flash: z.boolean().optional(),
  primary: z.boolean().optional(),
  // What the row says once its button is clicked: the route's answer.
  answer: z.string().optional()
})

// A plugin in Serveur › Plugins, with its chip.
const plugin = z.object({
  name: z.string(),
  icon: z.string(),
  hint: z.string(),
  chip: z.string(),
  tone: z.enum(['success', 'warning'])
})

// One step of Premiers pas: its text and to-do list, the file it edits, and what Hodi shows.
const step = z.object({
  name: z.string(),
  text: z.string(),
  guide: z.string(),
  todo: z.array(z.string()),
  file: z.string(),
  lang: z.string(),
  // The line the step changes, marked in the code.
  edit: z.number(),
  code: z.string(),
  preview: z.object({
    title: z.string(),
    intro: z.string(),
    crumb: z.string(),
    rows: z.array(row).optional(),
    plugins: z.array(plugin).optional()
  }),
  log: z.string().optional()
})

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
    // Cards of the pages under this one, drawn between the intro and the text.
    cards: z.literal('children').optional(),
    // Premiers pas only: its steps, then the dialog that ends it.
    steps: z.array(step).optional(),
    finish: z
      .object({
        title: z.string(),
        intro: z.string(),
        recap: z.array(z.object({ name: z.string(), text: z.string() })),
        real: z.string(),
        realText: z.string()
      })
      .optional()
  })
})

export const collections = { docs }
