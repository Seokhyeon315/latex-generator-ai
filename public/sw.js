// Minimal service worker to prevent 404 errors
// This is a basic service worker that doesn't cache anything but prevents browser errors

self.addEventListener('install', (event) => {
  // Skip waiting to activate immediately
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  // Claim all clients immediately
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
  // Let all requests go through normally (no caching)
  // This is a no-op service worker
}); 