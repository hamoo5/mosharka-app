self.addEventListener('install', (e) => {
  self.skipWaiting(); // إجبار التحديث الجديد إنه يشتغل فوراً
  e.waitUntil(
    caches.open('mosharka-store-v2').then((cache) => cache.addAll([
      './index.html',
      './driver.html'
    ])),
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== 'mosharka-store-v2') {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});
