import { wirePlay } from './play-window.ts'
import { wireSearch } from './search.ts'
import { fitSidebar, spyHeadings } from './sidebar.ts'

const THEME_KEY = 'hodi-sdk-theme'

const store = (key: string, value: string) => {
  try {
    localStorage.setItem(key, value)
  } catch {
    // A private window or blocked storage: the choice lasts for this page only.
  }
}

// The theme in use: the one chosen, or the system's when nothing is.
const currentTheme = () =>
  document.documentElement.dataset.theme ?? (matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark')

const showTheme = () => {
  const theme = currentTheme()
  for (const pick of document.querySelectorAll<HTMLElement>('[data-theme-pick]')) {
    const on = String(pick.dataset.themePick === theme)
    pick.setAttribute(pick.getAttribute('role') === 'menuitemradio' ? 'aria-checked' : 'aria-pressed', on)
  }
}

const closeMenus = (except?: Element) => {
  for (const button of document.querySelectorAll('.menu-w > [aria-expanded="true"]')) {
    if (button.parentElement === except) continue
    button.setAttribute('aria-expanded', 'false')
    button.nextElementSibling?.classList.remove('open')
  }
}

// The app's Menu: opens under its button, closes on a pick, a click elsewhere or Escape.
const wireMenus = () => {
  for (const wrap of document.querySelectorAll('.menu-w')) {
    const button = wrap.querySelector('button[aria-haspopup="menu"]')
    button?.addEventListener('click', () => {
      const open = button.getAttribute('aria-expanded') !== 'true'
      closeMenus(wrap)
      button.setAttribute('aria-expanded', String(open))
      wrap.querySelector('.vm')?.classList.toggle('open', open)
    })
  }
  document.addEventListener('click', event => {
    if (!(event.target instanceof Element) || !event.target.closest('.menu-w')) closeMenus()
  })
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') closeMenus()
  })
}

const wireTheme = () => {
  for (const pick of document.querySelectorAll<HTMLElement>('[data-theme-pick]')) {
    pick.addEventListener('click', () => {
      const theme = pick.dataset.themePick ?? 'dark'
      document.documentElement.dataset.theme = theme
      store(THEME_KEY, theme)
      showTheme()
      closeMenus()
    })
  }
  showTheme()
}

// Phone and tablet: the burger opens the sheet under the bar; the scrim or Escape closes it.
const wireSheet = () => {
  const burger = document.querySelector('.burger')
  const sheet = document.getElementById('sheet')
  const toggle = (open: boolean) => {
    burger?.setAttribute('aria-expanded', String(open))
    sheet?.classList.toggle('open', open)
  }
  burger?.addEventListener('click', () => toggle(!sheet?.classList.contains('open')))
  document.querySelector('.sheet-scrim')?.addEventListener('click', () => toggle(false))
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') toggle(false)
  })
}

// A code window's Copier: the code without its window, then « Copié » for a moment.
const wireCopy = () => {
  for (const button of document.querySelectorAll<HTMLButtonElement>('button[data-copy]')) {
    const label = button.querySelector('.lb')
    const idle = label?.textContent ?? ''
    button.addEventListener('click', async () => {
      const code = button.closest('.term')?.querySelector('pre')?.textContent ?? ''
      await navigator.clipboard.writeText(code)
      button.classList.add('copied')
      if (label) label.textContent = button.dataset.done ?? idle
      setTimeout(() => {
        button.classList.remove('copied')
        if (label) label.textContent = idle
      }, 1600)
    })
  }
}

// The pages panel of tablets and phones: a native dialog, so Escape and focus come for free.
const wireTree = () => {
  const dialog = document.querySelector<HTMLDialogElement>('dialog.dev-tree')
  document.querySelector('.tree-open')?.addEventListener('click', () => dialog?.showModal())
  dialog?.querySelector('.close')?.addEventListener('click', () => dialog.close())
  dialog?.addEventListener('click', event => {
    if (event.target === dialog || (event.target instanceof Element && event.target.closest('a'))) dialog.close()
  })
}

wireMenus()
wireTheme()
wireSheet()
wireCopy()
wireTree()
wirePlay()
wireSearch()
fitSidebar()
spyHeadings()
