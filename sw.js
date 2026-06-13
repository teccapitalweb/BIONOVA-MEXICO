/* BioNova VIP · Service Worker
   Objetivo: permitir instalación como app y carga más rápida.
   Estrategia: network-first con respaldo en caché (mismo origen).
   Firebase / Firestore / CDNs (otro origen) SIEMPRE van a la red. */
const CACHE = 'bionova-vip-v2';
const SHELL = [
  './',
  './vip-panel.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './apple-touch-icon.png'
];

self.addEventListener('install', (e) => {
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(SHELL).catch(() => {})));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  let url;
  try { url = new URL(req.url); } catch (_) { return; }
  // Solo gestionamos mismo origen; el resto (Firebase, gstatic, CDNs) pasa directo a la red.
  if (url.origin !== self.location.origin) return;

  e.respondWith(
    fetch(req)
      .then((res) => {
        const copy = res.clone();
        caches.open(CACHE).then((c) => c.put(req, copy)).catch(() => {});
        return res;
      })
      .catch(() => caches.match(req).then((r) => r || caches.match('./vip-panel.html')))
  );
});
