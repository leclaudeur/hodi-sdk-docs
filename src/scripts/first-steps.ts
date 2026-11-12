// Premiers pas: the phone's Étape / Code / Aperçu switch, the editor's tabs, the preview's button and the end.

const main = document.querySelector<HTMLElement>('.tz-main')

// On a phone one pane shows at a time; the switch picks it.
const wirePanes = () => {
  const buttons = [...document.querySelectorAll<HTMLButtonElement>('.tz-seg [data-show]')]
  for (const button of buttons) {
    button.addEventListener('click', () => {
      for (const other of buttons) other.setAttribute('aria-checked', String(other === button))
      main?.classList.remove('show-step', 'show-code', 'show-prev')
      main?.classList.add(`show-${button.dataset.show ?? 'step'}`)
    })
  }
}

// The files of the steps already done can be read again.
const wireTabs = () => {
  const tabs = [...document.querySelectorAll<HTMLButtonElement>('.tz-tabs [role="tab"]')]
  for (const tab of tabs) {
    tab.addEventListener('click', () => {
      for (const other of tabs) {
        other.setAttribute('aria-selected', String(other === tab))
        const panel = document.getElementById(other.getAttribute('aria-controls') ?? '')
        if (panel) panel.hidden = other !== tab
      }
    })
  }
}

// « Dire bonjour » shows the route's answer, as the plugin would.
const wireAnswers = () => {
  for (const button of document.querySelectorAll<HTMLButtonElement>('[data-answers]')) {
    button.addEventListener('click', () => {
      const answer = button.closest('.s-row')?.querySelector<HTMLElement>('[data-answer]')
      if (!answer?.dataset.answer) return
      answer.textContent = answer.dataset.answer
      answer.classList.replace('h', 'flash')
    })
  }
}

const CONFETTI = ['--rust', '--topic-science', '--topic-travel', '--topic-belgium', '--topic-culture', '--ai']

// The end: confetti once, Escape goes back to the last step.
const wireEnd = () => {
  const end = document.querySelector<HTMLElement>('.tz-done')
  if (!end) return
  const rain = end.querySelector<HTMLElement>('.confetti')
  for (let index = 0; index < 80 && rain; index++) {
    const piece = document.createElement('span')
    piece.style.setProperty('--x', `${Math.random() * 100}%`)
    piece.style.setProperty('--color', `var(${CONFETTI[index % CONFETTI.length]})`)
    piece.style.setProperty('--delay', `${Math.round(Math.random() * 700)}ms`)
    piece.style.setProperty('--drift', `${Math.round((Math.random() - 0.5) * 240)}px`)
    piece.style.setProperty('--turn', `${Math.round(Math.random() * 720)}deg`)
    rain.append(piece)
  }
  // The dialog takes the focus, so Tab starts inside it, without a ring on a button nobody chose.
  end.querySelector<HTMLElement>('.dlg')?.focus()
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && end.dataset.close) location.href = end.dataset.close
  })
}

wirePanes()
wireTabs()
wireAnswers()
wireEnd()
