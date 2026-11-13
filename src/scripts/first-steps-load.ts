// The editor is the page's heaviest part: it loads when the person reaches for the code, so the page shows at once.
const panel = document.querySelector<HTMLElement>('.tz-file[data-editor]')
const next = document.querySelector<HTMLElement>('[data-next]')
const solution = document.querySelector<HTMLElement>('[data-solution]')

let loading: Promise<unknown> | undefined
const load = () => {
  loading ??= import('./first-steps-editor.ts')
}

// A step typed in before comes back as it was left, done or not.
const typedBefore = () => {
  try {
    return sessionStorage.getItem(`hodi-first-steps:${location.pathname}`) !== null
  } catch {
    return false
  }
}

if (panel) {
  // Until the step is done, the way on waits; the answer is one click away for anyone stuck.
  next?.setAttribute('aria-disabled', 'true')
  next?.classList.add('locked')
  next?.addEventListener('click', event => {
    if (next.getAttribute('aria-disabled') === 'true') event.preventDefault()
  })
  solution?.removeAttribute('hidden')
  solution?.addEventListener('click', () => {
    panel.dataset.solve = ''
    load()
  })
  panel.addEventListener('pointerdown', event => {
    panel.dataset.at = `${event.clientX},${event.clientY}`
    load()
  })
  panel.addEventListener('pointerenter', load)
  panel.addEventListener('focusin', load)
  if (typedBefore()) addEventListener('load', load, { once: true })
}
