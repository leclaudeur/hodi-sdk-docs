import { e, h, s, type Call, type Obj } from './code.ts'
import { seg, str, text, toggle, tr, words, type Kind } from './controls.ts'

// Dialogs, messages and the small elements: their controls and their code.

export const dialog: Kind = {
  fixed: true,
  controls: {
    'title?': text('title', words('Nouvelle salutation', 'New greeting')),
    'intro?': text('intro', words('Elle remplace « Salut ».', 'It replaces “Hi”.')),
    'size?': seg('size', ['compact', 'wide']),
    'onBack?': toggle('back')
  },
  code: (state, lang) => {
    const w = tr(lang)
    return {
      lucide: ['Hand'],
      body: [
        h(
          'Dialog',
          [
            ['open', e('open')],
            ['onClose', e('close')],
            ['size', s(str(state, 'size'))],
            ['title', state.title !== '' && s(str(state, 'title'))],
            ['intro', state.intro !== '' && s(str(state, 'intro'))],
            ['onBack', state.back === true && e('back')]
          ],
          h('TextField', [
            ['icon', e('Hand')],
            ['aria-label', s(w('Salutation', 'Greeting'))],
            ['placeholder', s(w('Coucou', 'Hey'))]
          ]),
          h(
            'DialogActions',
            [],
            h('Button', [['onClick', e('close')]], w('Annuler', 'Cancel')),
            h(
              'Button',
              [
                ['look', s('primary')],
                ['onClick', e('save')]
              ],
              w('Enregistrer', 'Save')
            )
          )
        )
      ]
    }
  }
}

export const asktoconfirm: Kind = {
  fixed: true,
  controls: {
    title: text('title', words('Vider l’historique ?', 'Clear the history?')),
    message: text(
      'message',
      words(
        'Les 30 derniers bonjours de ce foyer seront effacés.',
        'The last 30 hellos of this household will be deleted.'
      )
    ),
    label: text('label', words('Vider', 'Clear')),
    'look?': seg('look', ['danger', 'primary'])
  },
  code: state => {
    const args: Obj = [
      ['title', s(str(state, 'title'))],
      ['message', s(str(state, 'message'))],
      ['label', s(str(state, 'label'))]
    ]
    if (state.look === 'primary') args.push(['look', s('primary')])
    args.push(['onConfirm', e("() => api('/history', { method: 'DELETE' })")])
    const call: Call = { call: 'askToConfirm', args: [{ o: args }] }
    return { uses: ['usePluginApi'], pre: ['const api = usePluginApi()'], body: [call] }
  }
}

export const toasts: Kind = {
  fixed: true,
  controls: {
    showDone: text('message', words('Salutation enregistrée', 'Greeting saved')),
    showSaved: toggle('saved'),
    showError: toggle('error')
  },
  code: state => {
    if (state.error === true) return { body: [{ call: 'showError', args: [s(str(state, 'message'))] }] }
    if (state.saved === true) return { body: [{ call: 'showSaved', args: [] }] }
    return { body: [{ call: 'showDone', args: [s(str(state, 'message'))] }] }
  }
}

export const statusline: Kind = {
  controls: {
    tone: seg('tone', ['info', 'error']),
    children: text('message', words('Enregistré il y a 2 min.', 'Saved 2 min ago.'))
  },
  code: state => ({ body: [h('StatusLine', [['tone', s(str(state, 'tone'))]], str(state, 'message'))] })
}

export const notice: Kind = {
  wide: true,
  controls: {
    title: text('title', words('Nouvelle version', 'New version')),
    children: text(
      'body',
      words('Hello world 0.2 dit bonjour en néerlandais.', 'Hello world 0.2 says hello in Dutch.')
    ),
    'tone?': seg('tone', ['info', 'warning', 'error']),
    'action?': toggle('action', true)
  },
  code: (state, lang) => ({
    lucide: state.action === true ? ['ExternalLink', 'Info'] : ['Info'],
    body: [
      h(
        'Notice',
        [
          ['title', s(str(state, 'title'))],
          ['icon', e('Info')],
          ['tone', state.tone !== 'info' && s(str(state, 'tone'))],
          [
            'action',
            state.action === true && {
              o: [
                ['label', s(tr(lang)('Voir', 'See'))],
                ['icon', e('ExternalLink')],
                ['href', e('links.plugins')]
              ]
            }
          ]
        ],
        str(state, 'body')
      )
    ]
  })
}

export const emptystate: Kind = {
  wide: true,
  controls: {
    title: text('title', words('Aucun bonjour', 'No hellos')),
    'children?': text(
      'body',
      words('Les salutations du foyer arrivent ici.', 'The household’s greetings arrive here.')
    ),
    'actions?': toggle('actions'),
    'tone?': seg('tone', ['default', 'danger']),
    'compact?': toggle('compact', true)
  },
  code: (state, lang) => ({
    lucide: ['Inbox'],
    body: [
      h(
        'EmptyState',
        [
          ['icon', { el: h('Inbox', [['size', e('28')]]) }],
          ['title', s(str(state, 'title'))],
          ['tone', state.tone !== 'default' && s(str(state, 'tone'))],
          ['compact', state.compact === true],
          [
            'actions',
            state.actions === true && { el: h('Button', [['onClick', e('add')]], tr(lang)('Ajouter', 'Add')) }
          ]
        ],
        ...(state.body === '' ? [] : [str(state, 'body')])
      )
    ]
  })
}
