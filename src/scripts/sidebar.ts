const side = () => document.querySelector<HTMLElement>('.dev-wrap > .dev-side')

// The sidebar ends 24 px above the screen's bottom, or above the footer's line once it shows: every row can be
// reached, and its scroll never hands over to the page's.
export const fitSidebar = () => {
  const nav = side()
  const wrap = nav?.parentElement
  if (!nav || !wrap) return
  const fit = () => {
    const top = Math.max(97, wrap.getBoundingClientRect().top)
    const bottom = Math.min(innerHeight, wrap.getBoundingClientRect().bottom)
    nav.style.setProperty('--side-max', `${Math.max(120, bottom - 24 - top)}px`)
    nav.classList.toggle('more-up', nav.scrollTop > 2)
    nav.classList.toggle('more-down', nav.scrollTop + nav.clientHeight < nav.scrollHeight - 2)
  }
  addEventListener('scroll', fit, { passive: true })
  addEventListener('resize', fit)
  nav.addEventListener('scroll', fit, { passive: true })
  fit()
  nav.querySelector('[aria-current="page"]')?.scrollIntoView({ block: 'nearest' })
}

// The title on screen lights its row in the sidebar.
export const spyHeadings = () => {
  const links = [...document.querySelectorAll<HTMLAnchorElement>('.dev-wrap > .dev-side a[data-head]')]
  const titles = links.flatMap(link => {
    const title = document.getElementById(link.dataset.head ?? '')
    return title ? [{ link, title }] : []
  })
  if (titles.length === 0) return
  const light = () => {
    const passed = titles.filter(({ title }) => title.getBoundingClientRect().top < 140)
    const on = passed.at(-1)
    for (const { link } of titles) link.classList.toggle('on', link === on?.link)
  }
  addEventListener('scroll', light, { passive: true })
  light()
}
