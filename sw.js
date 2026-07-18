const CACHE_NAME = 'premium-watch-v1';
const ASSETS = [
  'index.html',
  'manifest.json',
  'icon-192.png',
  'icon-512.png'
];

// Install Service Worker and cache essential files
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// Activate Service Worker
self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

// Fetch Network Requests (Enables basic offline capability)
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request);
    })
  );
});