self.addEventListener('install', (e) => {
  self.skipWaiting(); // إجبار المتصفح إنه يجيب التحديث الجديد فوراً
  e.waitUntil(
    caches.open('mosharka-store-v3').then((cache) => cache.addAll([
      './index.html',
      './driver.html',
      './login.html'
    ])),
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== 'mosharka-store-v3') {
            return caches.delete(cacheName); // مسح أي كاش قديم
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
