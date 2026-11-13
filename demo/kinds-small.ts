import { e, h, s } from './code.ts'
import { seg, str, text, toggle, words, type Kind } from './controls.ts'

// The small elements: their controls and their code.

export const chip: Kind = {
  controls: {
    children: text('label', words('Actif', 'Active')),
    'tone?': seg('tone', [['none', words('Neutre', 'Neutral')], 'success', 'warning', 'danger', 'accent'], 'success'),
    'size?': seg('size', ['capsule', 'row'])
  },
  code: state => ({
    body: [
      h(
        'Chip',
        [
          ['tone', state.tone !== 'none' && s(str(state, 'tone'))],
          ['size', state.size !== 'capsule' && s(str(state, 'size'))]
        ],
        str(state, 'label')
      )
    ]
  })
}

export const filterchip: Kind = {
  controls: {
    selected: toggle('selected', true),
    children: text('label', words('Tout', 'All')),
    'count?': toggle('count', true),
    'icon?': toggle('icon'),
    'disabled?': toggle('disabled')
  },
  code: state => ({
    lucide: state.icon === true ? ['Bell'] : [],
    body: [
      h(
        'FilterChip',
        [
          ['selected', e("filter === 'all'")],
          ['count', state.count === true && e('12')],
          ['icon', state.icon === true && e('Bell')],
          ['disabled', state.disabled === true],
          ['onClick', e("() => setFilter('all')")]
        ],
        str(state, 'label')
      )
    ]
  })
}

export const sourceavatar: Kind = {
  controls: {
    sourceName: text('name', 'Le Monde'),
    'size?': seg('size', ['18', '20', '22', '26', '44'], '44')
  },
  code: state => ({
    body: [
      h('SourceAvatar', [
        ['sourceId', e('article.sourceId')],
        ['sourceName', s(str(state, 'name'))],
        ['size', e(str(state, 'size'))]
      ])
    ]
  })
}

export const householdavatar: Kind = {
  controls: {
    name: text('name', words('Dupont', 'Smith')),
    size: seg('size', ['44', '64'], '64')
  },
  code: state => ({
    body: [
      h('HouseholdAvatar', [
        ['name', s(str(state, 'name'))],
        ['photo', e('household.photo')],
        ['size', e(str(state, 'size'))]
      ])
    ]
  })
}
