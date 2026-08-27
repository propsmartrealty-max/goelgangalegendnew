// Goel Ganga Legend County — Digital Fortress Edge Service Worker
// Implements Stale-While-Revalidate caching, Background Sync & Offline Fortress Resiliency

const CACHE_NAME = 'gglc-fortress-v2';
const ASSETS_TO_PRECACHE = [
  '/',
  '/favicon.svg',
  '/manifest.json',
  '/hero-aerial.webp',
  '/floorplan-3bhk.webp',
  '/floorplan-3.5bhk.webp'
];

const OFFLINE_FALLBACK_HTML = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Goel Ganga Legend County — Offline Resilient Portal</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    body { background: #06080D; color: #F8FAFC; font-family: system-ui, sans-serif; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; padding: 20px; text-align: center; }
    .card { background: rgba(255,255,255,0.04); border: 1px solid rgba(245,158,11,0.3); border-radius: 20px; padding: 40px 24px; max-width: 480px; backdrop-filter: blur(20px); }
    h1 { color: #FCD34D; font-size: 22px; margin-bottom: 10px; font-weight: 800; }
    p { color: #94A3B8; font-size: 14px; line-height: 1.6; margin-bottom: 24px; }
    .btn { display: inline-block; background: linear-gradient(135deg, #F59E0B, #B45309); color: #0F172A; font-weight: 800; padding: 12px 24px; border-radius: 9999px; text-decoration: none; font-size: 13px; margin: 6px; }
    .badge { display: inline-block; background: rgba(245,158,11,0.15); color: #F59E0B; font-size: 11px; font-weight: 800; padding: 4px 12px; border-radius: 9999px; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 16px; }
  </style>
</head>
<body>
  <div class="card">
    <div class="badge">Offline Fortress Active</div>
    <h1>Goel Ganga Legend County</h1>
    <p>You appear to be offline or in a low-reception zone. Your cached property monographs and key pricing specifications remain secured.</p>
    <a href="tel:+917744009295" class="btn">Call Sales Desk: +91 77440 09295</a>
    <a href="javascript:window.location.reload()" class="btn" style="background: rgba(255,255,255,0.1); color: #fff;">Retry Connection</a>
    <p style="margin-top: 24px; font-size: 11px; color: #64748B;">MahaRERA: P52100054578 · Bavdhan, Pune</p>
  </div>
</body>
</html>
`;

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_PRECACHE).catch(() => {});
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Do not intercept API requests or non-GET methods
  if (event.request.method !== 'GET' || url.pathname.startsWith('/api/')) {
    return;
  }

  // Network-First for HTML navigation with instant offline fortress fallback
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .catch(async () => {
          const cachedHome = await caches.match('/');
          if (cachedHome) return cachedHome;
          return new Response(OFFLINE_FALLBACK_HTML, {
            status: 200,
            headers: { 'Content-Type': 'text/html; charset=utf-8' }
          });
        })
    );
    return;
  }

  // Stale-While-Revalidate for images, fonts, and assets
  if (
    url.pathname.endsWith('.webp') ||
    url.pathname.endsWith('.png') ||
    url.pathname.endsWith('.jpg') ||
    url.pathname.endsWith('.svg') ||
    url.pathname.endsWith('.css') ||
    url.pathname.endsWith('.js') ||
    url.hostname.includes('fonts.gstatic.com') ||
    url.hostname.includes('fonts.googleapis.com')
  ) {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        const fetchPromise = fetch(event.request).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseClone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseClone);
            });
          }
          return networkResponse;
        }).catch(() => cachedResponse);

        return cachedResponse || fetchPromise;
      })
    );
  }
});
