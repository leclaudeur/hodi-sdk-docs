// Google Analytics for the SDK site, only once the visitor agrees. vanilla-cookieconsent asks, remembers the answer,
// and wipes the _ga cookies on a refusal; this file only says what to ask and what to load.
const GA_ID = 'G-Y9F31LXMBX'

const TEXTS = {
  fr: {
    description:
      'Ce site compte ses visites avec Google Analytics, seulement si tu es d’accord. <a href="https://get-hodi.com/privacy">En savoir plus</a>',
    accept: 'Accepter',
    refuse: 'Refuser'
  },
  en: {
    description:
      'This site counts its visits with Google Analytics, only if you agree. <a href="https://get-hodi.com/en/privacy">Learn more</a>',
    accept: 'Accept',
    refuse: 'Refuse'
  }
}

type Gtag = (...args: unknown[]) => void
declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: Gtag
  }
}

// Google's own snippet pushes the arguments object itself, which gtag.js reads differently from an array.
function gtag(..._args: unknown[]) {
  window.dataLayer = window.dataLayer ?? []
  // eslint-disable-next-line prefer-rest-params -- gtag.js reads the arguments object, not an array
  window.dataLayer.push(arguments)
}

// Consent Mode v2: nothing for ads, ever; analytics follows the visitor's answer.
const setAnalytics = (granted: boolean) =>
  gtag('consent', 'update', { analytics_storage: granted ? 'granted' : 'denied' })

// The styles by their address: imported as CSS, the build would put them in every page's <head>, where they would hold
// up the first paint. Hodi's look for the banner comes after the library's own.
const addStyles = (href: string) =>
  new Promise(done => {
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = href
    link.onload = link.onerror = done
    document.head.append(link)
  })

const loadStyles = async () => {
  const [library, look] = await Promise.all([
    import('vanilla-cookieconsent/dist/cookieconsent.css?url'),
    import('../styles/consent.css?url')
  ])
  await addStyles(library.default)
  await addStyles(look.default)
}

let loaded = false
const loadAnalytics = () => {
  if (loaded) return setAnalytics(true)
  loaded = true
  window.gtag = gtag
  gtag('consent', 'default', {
    analytics_storage: 'granted',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied'
  })
  gtag('js', new Date())
  // The CNIL and the Belgian authority allow 13 months for an audience cookie: Google's default is 2 years.
  gtag('config', GA_ID, { cookie_expires: 13 * 30 * 24 * 60 * 60 })
  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`
  document.head.append(script)
}

const start = async (lang: 'fr' | 'en') => {
  const [cc] = await Promise.all([import('vanilla-cookieconsent'), loadStyles()])
  const follow = () => (cc.acceptedCategory('analytics') ? loadAnalytics() : loaded && setAnalytics(false))
  const t = TEXTS[lang]
  await cc.run({
    guiOptions: { consentModal: { layout: 'box', position: 'bottom right', equalWeightButtons: true } },
    categories: {
      necessary: { readOnly: true, enabled: true },
      analytics: { autoClear: { cookies: [{ name: /^_ga/ }] } }
    },
    onConsent: follow,
    onChange: follow,
    language: {
      default: lang,
      translations: {
        [lang]: {
          consentModal: { description: t.description, acceptAllBtn: t.accept, acceptNecessaryBtn: t.refuse },
          preferencesModal: { sections: [] }
        }
      }
    }
  })
  return cc
}

// The banner comes two seconds after the page has loaded: the visitor sees the page first, and its loading never shares
// the network with the library's. The footer's Cookies link opens the question again; without a script it leads to the
// privacy page.
const DELAY_MS = 2000

export const wireConsent = () => {
  const lang = document.documentElement.lang === 'en' ? 'en' : 'fr'
  const ready = new Promise<Awaited<ReturnType<typeof start>>>(resolve => {
    const go = () => setTimeout(() => void start(lang).then(resolve), DELAY_MS)
    if (document.readyState === 'complete') go()
    else addEventListener('load', go, { once: true })
  })
  for (const link of document.querySelectorAll('[data-consent-open]')) {
    link.addEventListener('click', event => {
      event.preventDefault()
      void ready.then(cc => cc.show(true))
    })
  }
}
