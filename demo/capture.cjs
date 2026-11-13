const { chromium } = require('playwright')
const http = require('http'),
  fs = require('fs'),
  path = require('path')
// Draws demo/ (built into DEMO_OUT) at a computer's and a phone's width, and keeps each component's DOM.
const root = process.env.DEMO_OUT
const srv = http
  .createServer((q, r) => {
    let p = path.join(root, decodeURIComponent(q.url.split('?')[0]))
    if (!fs.existsSync(p) || fs.statSync(p).isDirectory()) {
      if (q.url.startsWith('/api')) {
        r.writeHead(404)
        return r.end('{}')
      }
      p = path.join(root, 'index.html')
    }
    const ext = path.extname(p)
    r.writeHead(200, {
      'content-type':
        {
          '.js': 'text/javascript',
          '.css': 'text/css',
          '.html': 'text/html',
          '.woff2': 'font/woff2',
          '.json': 'application/json'
        }[ext] || 'application/octet-stream'
    })
    fs.createReadStream(p).pipe(r)
  })
  .listen(4399)
;(async () => {
  const b = await chromium.launch()
  const out = { fr: {}, en: {} }
  // Hodi picks its language from the browser's: once in French, once in English.
  for (const [lang, locale] of [
    ['fr', 'fr-BE'],
    ['en', 'en-GB']
  ])
    for (const [k, w, touch] of [
      ['d', 1440, false],
      ['p', 390, true]
    ]) {
      const ctx = await b.newContext({
        viewport: { width: w, height: 900 },
        hasTouch: touch,
        isMobile: touch,
        locale
      })
      const pg = await ctx.newPage()
      pg.on('pageerror', e => console.error('ERR', e.message))
      await pg.goto('http://localhost:4399/')
      await pg.waitForTimeout(1500)
      out[lang][k] = await pg.evaluate(() => {
        const ex = {}
        document.querySelectorAll('[data-ex]').forEach(s => (ex[s.dataset.ex] = s.innerHTML))
        const t = document.querySelector('[data-sonner-toaster]')
        ex.toasts = t ? t.outerHTML : ''
        return ex
      })
      await pg.goto('http://localhost:4399/?confirm')
      await pg.waitForTimeout(1200)
      out[lang][k].asktoconfirm = await pg.evaluate(() => document.querySelector('[data-ex=asktoconfirm]').innerHTML)
      await ctx.close()
    }
  fs.writeFileSync(process.env.CAPTURE_OUT, JSON.stringify(out))
  console.log(Object.keys(out.fr.d).length, Object.keys(out.en.d).length)
  await b.close()
  srv.close()
})()
