import { e, h, s, type El } from './code.ts'
import { NONE, seg, str, text, toggle, tr, words, type Kind } from './controls.ts'

// A settings row, a long list's end, an Overview card, and the step pages: their controls and their code.

const rowAction = (state: Record<string, string | boolean>, lang: 'fr' | 'en') => {
  const w = tr(lang)
  if (state.action === 'one')
    return {
      o: [
        ['label', s(w('Changer', 'Change'))],
        ['icon', e('Pencil')],
        ['onClick', e('edit')]
      ] as [string, { s: string } | { e: string }][]
    }
  if (state.action === 'two')
    return {
      a: [
        [
          ['label', s(w('Exporter', 'Export'))],
          ['icon', e('Download')],
          ['onClick', e('exportAll')]
        ],
        [
          ['label', s(w('Vider', 'Clear'))],
          ['icon', e('Trash2')],
          ['look', s('danger')],
          ['onClick', e('clear')]
        ]
      ] as [string, { s: string } | { e: string }][][]
    }
  return undefined
}

export const settingrow: Kind = {
  wide: true,
  controls: {
    label: text('label', words('Texte', 'Text')),
    'value?': text('value', words('Salut', 'Hi')),
    'hint?': text('hint', ''),
    'action?': seg('action', [NONE, ['one', words('Un bouton', 'One button')], ['two', words('Deux', 'Two')]], 'one'),
    'choice?': toggle('choice'),
    'children?': toggle('toggle')
  },
  code: (state, lang) => {
    const choice = h('Segmented', [
      ['label', s('Moment')],
      ['value', e('moment')],
      ['options', e('MOMENTS')],
      ['onChange', e('setMoment')]
    ])
    const toggle = h('Toggle', [
      ['checked', e('on')],
      ['label', s(str(state, 'label'))],
      ['onChange', e('setOn')]
    ])
    const lucide = { one: ['Pencil'], two: ['Download', 'Trash2'] }[str(state, 'action')] ?? []
    const row = h(
      'SettingRow',
      [
        ['label', s(str(state, 'label'))],
        ['value', state.value !== '' && s(str(state, 'value'))],
        ['hint', state.hint !== '' && s(str(state, 'hint'))],
        ['action', rowAction(state, lang)],
        ['choice', state.choice === true && { el: choice }]
      ],
      ...(state.toggle === true ? [toggle] : [])
    )
    return { lucide, body: [h('SettingsCard', [], row)] }
  }
}

export const morerow: Kind = {
  wide: true,
  controls: {
    label: text('label', words('Voir les 4 autres', 'See the 4 others'))
  },
  code: (state, lang) => ({
    body: [
      h(
        'SettingsCard',
        [],
        h('SettingRow', [
          ['label', s('Anna')],
          ['value', s(tr(lang)('Salut !', 'Hi!'))]
        ]),
        h('MoreRow', [
          ['label', s(str(state, 'label'))],
          ['onClick', e('showAll')]
        ])
      )
    ]
  })
}

export const overviewcard: Kind = {
  wide: true,
  controls: {
    title: text('title', words('Bonjours', 'Hellos')),
    'count?': toggle('count', true),
    'aside?': toggle('aside', true),
    'children?': text('body', words("34 aujourd'hui", '34 today'))
  },
  code: (state, lang) => ({
    body: [
      h(
        'OverviewCard',
        [
          ['title', s(str(state, 'title'))],
          ['count', state.count === true && e('128')],
          ['aside', state.aside === true && { el: h('Chip', [['tone', s('success')]], tr(lang)('Actif', 'Active')) }]
        ],
        ...(state.body === '' ? [] : [h('p', [['className', s('mono')]], str(state, 'body'))])
      )
    ]
  })
}

const stepBody = (body: unknown, lang: 'fr' | 'en'): El[] => {
  if (body === 'field')
    return [
      h('TextField', [
        ['icon', e('Hand')],
        ['aria-label', s(tr(lang)('Prénom', 'First name'))],
        ['value', e('name')],
        ['onChange', e('e => setName(e.target.value)')]
      ])
    ]
  if (body === 'toggle')
    return [
      h('Toggle', [
        ['checked', e('on')],
        ['label', s(tr(lang)('Saluer le matin', 'Say hello in the morning'))],
        ['onChange', e('setOn')]
      ])
    ]
  return []
}

export const steppage: Kind = {
  controls: {
    title: text('title', words('Ton prénom', 'Your first name')),
    intro: text('intro', words('Hodi le met dans chaque salutation.', 'Hodi puts it in every greeting.')),
    'step?': toggle('progress', true),
    'onBack?': toggle('back', true),
    'start?': toggle('later'),
    'children?': seg(
      'body',
      [
        ['none', words('Rien', 'Nothing')],
        ['field', 'TextField'],
        ['toggle', 'Toggle']
      ],
      'field'
    )
  },
  code: (state, lang) => {
    const w = tr(lang)
    return {
      lucide: state.body === 'field' ? ['Hand'] : [],
      body: [
        h(
          'StepPage',
          [
            ['step', state.progress === true && e('2')],
            ['total', state.progress === true && e('3')],
            ['title', s(str(state, 'title'))],
            ['intro', s(str(state, 'intro'))],
            ['onSubmit', e('save')],
            ['onBack', state.back === true && e('back')],
            ['start', state.later === true && { el: h('Button', [['onClick', e('later')]], w('Plus tard', 'Later')) }],
            [
              'actions',
              {
                el: h(
                  'Button',
                  [
                    ['look', s('primary')],
                    ['type', s('submit')]
                  ],
                  w('Continuer', 'Continue')
                )
              }
            ]
          ],
          ...stepBody(state.body, lang)
        )
      ]
    }
  }
}

export const tilespage: Kind = {
  controls: {
    title: text('title', words('Quel foyer ?', 'Which household?')),
    'intro?': text('intro', words('Choisis le foyer à ouvrir.', 'Pick the household to open.')),
    'opening?': toggle('opening'),
    'error?': toggle('error'),
    'onBack?': toggle('back', true)
  },
  code: (state, lang) => ({
    body: [
      h('TilesPage', [
        ['title', s(str(state, 'title'))],
        ['intro', state.intro !== '' && s(str(state, 'intro'))],
        ['tiles', e('households.map(h => ({ key: h.id, label: h.name, onClick: () => open(h.id) }))')],
        ['opening', e('opening')],
        ['error', state.error === true && s(tr(lang)('Ce foyer ne répond pas.', 'This household does not answer.'))],
        ['onBack', state.back === true && e('back')]
      ])
    ]
  })
}

export const setupactions: Kind = {
  wide: true,
  controls: {
    children: text('label', words('Continuer', 'Continue')),
    'start?': toggle('later', true)
  },
  code: (state, lang) => ({
    body: [
      h(
        'SetupActions',
        [
          [
            'start',
            state.later === true && { el: h('Button', [['onClick', e('next')]], tr(lang)('Plus tard', 'Later')) }
          ]
        ],
        h(
          'Button',
          [
            ['look', s('primary')],
            ['type', s('submit')]
          ],
          str(state, 'label')
        )
      )
    ]
  })
}
