// Service worker. Shell: cache-first, versioned cache. data.enc: network-first, cache fallback.
// No skipWaiting: a new version waits and takes over the next time the app is opened.
const VERSION = 'a42b851c0d'
const SHELL = ["./","./assets/index-8lfmPWZS.css","./assets/index-DmSvJ7Ao.js","./icons/icon-192.png","./icons/icon-512.png","./icons/icon-maskable-512.png","./index.html","./manifest.webmanifest"]
const SHELL_CACHE = 'seojae-g-shell-' + VERSION
const DATA_CACHE = 'seojae-g-data'
const base = self.registration.scope

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(SHELL_CACHE).then((c) =>
      c.addAll(SHELL.map((u) => new Request(new URL(u, base).href, { cache: 'reload' }))),
    ),
  )
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      for (const k of await caches.keys()) {
        if (k.startsWith('seojae-g-shell-') && k !== SHELL_CACHE) await caches.delete(k)
      }
      await self.clients.claim()
    })(),
  )
})

async function networkFirst(req) {
  const cache = await caches.open(DATA_CACHE)
  const key = new URL('data.enc', base).href
  try {
    const ctl = new AbortController()
    const timer = setTimeout(() => ctl.abort(), 6000)
    const res = await fetch(new Request(key, { cache: 'no-cache' }), { signal: ctl.signal })
    clearTimeout(timer)
    if (res.ok) {
      await cache.put(key, res.clone())
      return res
    }
    throw new Error('bad status')
  } catch (e) {
    const hit = await cache.match(key)
    if (hit) return hit
    return Response.error()
  }
}

self.addEventListener('fetch', (event) => {
  const req = event.request
  if (req.method !== 'GET') return
  const url = new URL(req.url)
  if (url.origin !== location.origin) return
  if (url.pathname.endsWith('/data.enc')) {
    event.respondWith(networkFirst(req))
    return
  }
  event.respondWith(
    (async () => {
      const cache = await caches.open(SHELL_CACHE)
      if (req.mode === 'navigate') {
        const hit = await cache.match(new URL('index.html', base).href)
        if (hit) return hit
        return fetch(req)
      }
      const hit = await cache.match(req, { ignoreSearch: true })
      if (hit) return hit
      return fetch(req)
    })(),
  )
})
