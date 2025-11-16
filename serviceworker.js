// A simple service worker for caching the site
const CACHE_NAME = 'medhasya-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/about.html',
  '/courses.html',
  '/faculty.html',
  '/gallery.html',
  '/contact.html',
  '/css/style.css',
  'https://cdn.tailwindcss.com'
];

// Install event: Open cache and add all core files
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch event: Serve from cache if available, otherwise fetch from network
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response; // Serve from cache
        }
        return fetch(event.request); // Fetch from network
      }
    )
  );
});

