import { e, h, s } from './code.ts'
import { NONE, seg, str, text, toggle, tr, words, type Kind } from './controls.ts'

// Buttons, and the settings pages: their controls and their code.

const icon = (name: string) => (name === 'none' ? undefined : e(name))

export const button: Kind = {
  controls: {
    children: text('label', words('Enregistrer', 'Save')),
    'look?': seg('look', ['neutral', 'primary', 'danger', 'ai'], 'primary'),
    'icon?': seg('icon', [NONE, 'Check', 'Download', 'Trash2', 'Plus'], 'Check'),
    'busy?': toggle('busy'),
    'compact?': toggle('compact'),
    'wide?': toggle('wide')
  },
  code: state => ({
    lucide: state.icon === 'none' ? [] : [str(state, 'icon')],
    body: [
      h(
        'Button',
        [
          ['look', state.look !== 'neutral' && s(str(state, 'look'))],
          ['icon', icon(str(state, 'icon'))],
          ['compact', state.compact === true],
          ['busy', state.busy === true],
          ['wide', state.wide === true],
          ['onClick', e('save')]
        ],
        str(state, 'label')
      )
    ]
  })
}

export const roundbutton: Kind = {
  controls: {
    icon: seg('icon', ['Pencil', 'Trash2', 'Plus', 'Bookmark']),
    label: text('label', words('Modifier', 'Edit')),
    'size?': seg('size', ['28', '34', '38', '44'], '44'),
    'variant?': seg('variant', ['default', 'on', 'danger', 'primary', 'ai']),
    'filled?': toggle('filled')
  },
  code: state => ({
    lucide: [str(state, 'icon')],
    body: [
      h('RoundButton', [
        ['icon', e(str(state, 'icon'))],
        ['label', s(str(state, 'label'))],
        ['size', e(str(state, 'size'))],
        ['variant', state.variant !== 'default' && s(str(state, 'variant'))],
        ['filled', state.filled === true],
        ['onClick', e('edit')]
      ])
    ]
  })
}

export const aibutton: Kind = {
  controls: {
    children: text('label', words('Résumer', 'Summarise')),
    'compact?': toggle('compact'),
    'wide?': toggle('wide'),
    'disabled?': toggle('disabled')
  },
  code: state => ({
    body: [
      h(
        'AiButton',
        [
          ['action', s('summary')],
          ['input', { o: [['id', e('article.id')]] }],
          ['onAnswer', e('answer => setSummary(String(answer))')],
          ['compact', state.compact === true],
          ['wide', state.wide === true],
          ['disabled', state.disabled === true]
        ],
        str(state, 'label')
      )
    ]
  })
}

export const readerbutton: Kind = {
  controls: {
    children: text('label', words('Signaler', 'Report')),
    'icon?': seg('icon', [NONE, 'Flag', 'Check', 'Bookmark'], 'Flag'),
    'done?': toggle('done')
  },
  code: state => ({
    lucide: state.icon === 'none' ? [] : [str(state, 'icon')],
    body: [
      h(
        'ReaderButton',
        [
          ['icon', state.icon !== 'none' && { el: h(str(state, 'icon'), [['size', e('12')]]) }],
          ['onClick', e('report')],
          ['done', state.done === true]
        ],
        str(state, 'label')
      )
    ]
  })
}

const changeAction = (lang: 'fr' | 'en') => ({
  o: [
    ['label', s(tr(lang)('Changer', 'Change'))],
    ['icon', e('Pencil')],
    ['onClick', e('edit')]
  ] as [string, { s: string } | { e: string }][]
})

export const sectionpage: Kind = {
  wide: true,
  controls: {
    title: text('title', 'Hello world'),
    layout: seg('layout', ['desktop', 'phone']),
    'intro?': text(
      'intro',
      words('Une salutation, chaque fois que tu ouvres Hodi.', 'A greeting, every time you open Hodi.')
    ),
    'aside?': toggle('aside')
  },
  code: (state, lang) => ({
    lucide: ['Pencil'],
    body: [
      h(
        'SectionPage',
        [
          ['title', s(str(state, 'title'))],
          ['intro', state.intro !== '' && s(str(state, 'intro'))],
          ['layout', s(str(state, 'layout'))],
          ['aside', state.aside === true && { el: h('Chip', [['tone', s('success')]], tr(lang)('Actif', 'Active')) }]
        ],
        h(
          'SettingsCard',
          [],
          h('SettingRow', [
            ['label', s(tr(lang)('Salutation', 'Greeting'))],
            ['value', s(tr(lang)('Salut', 'Hi'))],
            ['action', changeAction(lang)]
          ])
        )
      )
    ]
  })
}

export const settingscard: Kind = {
  wide: true,
  controls: { 'label?': text('label', words('Salutation', 'Greeting')) },
  code: (state, lang) => ({
    lucide: ['Pencil'],
    body: [
      h(
        'SettingsCard',
        [['label', state.label !== '' && s(str(state, 'label'))]],
        h('SettingRow', [
          ['label', s(tr(lang)('Texte', 'Text'))],
          ['value', s(tr(lang)('Salut', 'Hi'))],
          ['action', changeAction(lang)]
        ])
      )
    ]
  })
}
