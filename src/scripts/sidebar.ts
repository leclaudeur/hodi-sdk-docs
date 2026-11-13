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

// Where the page must be scrolled for each title to light its row. A title reaches the top band (140 px) when the
// page has room below it; the last ones often cannot, so they share the last stretch of scroll evenly instead.
const lightPoints = (titles: HTMLElement[]) => {
  const end = document.documentElement.scrollHeight - innerHeight
  const wanted = titles.map(title => title.getBoundingClientRect().top + scrollY - 140)
  const first = wanted.findIndex(at => at > end)
  if (first === -1) return wanted
  const from = Math.min(first > 0 ? (wanted[first - 1] ?? 0) : 0, end)
  const steps = titles.length - first
  return wanted.map((at, index) => (index < first ? at : from + ((end - from) * (index - first + 1)) / steps))
}

// The title on screen lights its row in the sidebar. A click on a row lights that row until the reader scrolls.
export const spyHeadings = () => {
  const links = [...document.querySelectorAll<HTMLAnchorElement>('.dev-wrap > .dev-side a[data-head]')]
  const titles = links.flatMap(link => {
    const title = document.getElementById(link.dataset.head ?? '')
    return title ? [{ link, title }] : []
  })
  if (titles.length === 0) return
  let picked: HTMLAnchorElement | null = null
  const light = () => {
    const points = lightPoints(titles.map(({ title }) => title))
    const passed = titles.filter((_, index) => (points[index] ?? 0) <= scrollY + 1)
    const on = picked ?? passed.at(-1)?.link
    for (const { link } of titles) link.classList.toggle('on', link === on)
  }
  for (const { link } of titles) link.addEventListener('click', () => (picked = link))
  const release = () => {
    picked = null
    light()
  }
  for (const event of ['wheel', 'touchstart', 'keydown']) addEventListener(event, release, { passive: true })
  addEventListener('scroll', light, { passive: true })
  addEventListener('resize', light)
  light()
}
