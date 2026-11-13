import { e, h, s } from './code.ts'
import { seg, str, text, toggle, words, type Kind } from './controls.ts'

// The fields: their controls and their code.

export const textfield: Kind = {
  wide: true,
  controls: {
    icon: seg('icon', ['Mail', 'Search', 'Hand']),
    'aria-label': text('label', 'E-mail'),
    'onClear?': toggle('clear'),
    placeholder: text('placeholder', words('toi@exemple.be', 'you@example.com'))
  },
  code: state => ({
    lucide: [str(state, 'icon')],
    body: [
      h('TextField', [
        ['icon', e(str(state, 'icon'))],
        ['aria-label', s(str(state, 'label'))],
        ['placeholder', state.placeholder !== '' && s(str(state, 'placeholder'))],
        ['value', e('email')],
        ['onChange', e('e => setEmail(e.target.value)')],
        ['onClear', state.clear === true && e("() => setEmail('')")]
      ])
    ]
  })
}

export const passwordfield: Kind = {
  wide: true,
  controls: {
    'aria-label': text('label', words('Mot de passe', 'Password')),
    'invalid?': toggle('invalid'),
    'lead?': toggle('ring', true),
    value: text('password', words('soleil', 'sunshine'))
  },
  code: state => ({
    body: [
      h('PasswordField', [
        ['aria-label', s(str(state, 'label'))],
        ['value', e('password')],
        ['onChange', e('e => setPassword(e.target.value)')],
        ['invalid', state.invalid === true],
        ['lead', state.ring === true && { el: h('PasswordRing', [['password', e('password')]]) }]
      ]),
      h('PasswordGauge', [['password', e('password')]])
    ]
  })
}

export const pinfield: Kind = {
  wide: true,
  controls: {
    label: text('label', 'Code'),
    length: seg('length', ['6', '8']),
    'state?': seg('state', ['idle', 'wrong', 'right']),
    'align?': seg('align', ['start', 'center']),
    'masked?': toggle('masked'),
    'disabled?': toggle('disabled')
  },
  code: state => ({
    body: [
      h('PinField', [
        ['label', s(str(state, 'label'))],
        ['length', e(str(state, 'length'))],
        ['value', e('code')],
        ['onChange', e('setCode')],
        ['onComplete', e('check')],
        ['state', state.state !== 'idle' && s(str(state, 'state'))],
        ['align', s(str(state, 'align'))],
        ['masked', state.masked === true],
        ['disabled', state.disabled === true]
      ])
    ]
  })
}

export const toggleKind: Kind = {
  controls: {
    checked: toggle('checked', true),
    label: text('label', words('Saluer le matin', 'Say hello in the morning')),
    'disabled?': toggle('disabled')
  },
  code: state => ({
    body: [
      h('Toggle', [
        ['checked', e('morning')],
        ['label', s(str(state, 'label'))],
        ['onChange', e('setMorning')],
        ['disabled', state.disabled === true]
      ])
    ]
  })
}

export const checkbox: Kind = {
  wide: true,
  controls: {
    checked: toggle('checked', true),
    children: text('label', words('Garder mes salutations', 'Keep my greetings')),
    'disabled?': toggle('disabled')
  },
  code: state => ({
    body: [
      h(
        'Checkbox',
        [
          ['checked', e('keep')],
          ['onChange', e('setKeep')],
          ['disabled', state.disabled === true]
        ],
        str(state, 'label')
      )
    ]
  })
}

export const agecheckbox: Kind = {
  wide: true,
  controls: { checked: toggle('checked') },
  code: () => ({
    body: [
      h('AgeCheckbox', [
        ['checked', e('adult')],
        ['onChange', e('setAdult')]
      ])
    ]
  })
}

const MOMENTS = [
  ['morning', words('Matin', 'Morning')],
  ['noon', words('Midi', 'Noon')],
  ['evening', words('Soir', 'Evening')]
] as const

export const momentsOf = (lang: 'fr' | 'en') =>
  MOMENTS.map(([value, label]) => ({ value, label: typeof label === 'string' ? label : label[lang] }))

export const segmented: Kind = {
  controls: {
    label: text('label', 'Moment'),
    value: seg('value', [...MOMENTS.map(([value, label]): [string, typeof label] => [value, label])]),
    'wide?': toggle('wide')
  },
  code: (state, lang) => ({
    body: [
      h('Segmented', [
        ['label', s(str(state, 'label'))],
        ['value', e('moment')],
        [
          'options',
          {
            a: momentsOf(lang).map(({ value, label }) => [
              ['value', s(value)],
              ['label', s(label)]
            ])
          }
        ],
        ['onChange', e('setMoment')],
        ['wide', state.wide === true]
      ])
    ]
  })
}
