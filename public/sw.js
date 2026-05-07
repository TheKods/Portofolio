// Service Worker for PWA functionality
const CACHE_NAME = "portfolio-v1.0.0";
const STATIC_CACHE = "portfolio-static-v1.0.0";
const DYNAMIC_CACHE = "portfolio-dynamic-v1.0.0";

// Assets to cache immediately
const STATIC_ASSETS = [
  "/",
  "/index.html",
  "/manifest.json",
  "/robots.txt",
  "/sitemap.xml",
  // CSS and JS bundles (these will be added by Vite)
  // Add your main CSS and JS files here when known
];

// API endpoints to cache
const API_ENDPOINTS = [
  "/api/contact",
  // Add other API endpoints as needed
];

// Install event - cache static assets
self.addEventListener("install", (event) => {
  console.log("Service Worker: Installing...");

  event.waitUntil(
    caches
      .open(STATIC_CACHE)
      .then((cache) => {
        console.log("Service Worker: Caching static assets");
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        return self.skipWaiting();
      }),
  );
});

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
  console.log("Service Worker: Activating...");

  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
              console.log("Service Worker: Deleting old cache:", cacheName);
              return caches.delete(cacheName);
            }
          }),
        );
      })
      .then(() => {
        return self.clients.claim();
      }),
  );
});

// Fetch event - serve from cache or network
self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== "GET") return;

  // Skip Chrome extension requests
  if (url.protocol === "chrome-extension:") return;

  // Handle API requests
  if (API_ENDPOINTS.some((endpoint) => url.pathname.startsWith(endpoint))) {
    event.respondWith(
      caches.open(DYNAMIC_CACHE).then((cache) => {
        return fetch(request)
          .then((response) => {
            // Cache successful responses
            if (response.status === 200) {
              cache.put(request, response.clone());
            }
            return response;
          })
          .catch(() => {
            // Return cached version if available
            return cache.match(request);
          });
      }),
    );
    return;
  }

  // Handle static assets and pages
  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }

      return fetch(request)
        .then((response) => {
          // Don't cache non-successful responses
          if (
            !response ||
            response.status !== 200 ||
            response.type !== "basic"
          ) {
            return response;
          }

          // Cache the response
          const responseToCache = response.clone();
          caches.open(DYNAMIC_CACHE).then((cache) => {
            cache.put(request, responseToCache);
          });

          return response;
        })
        .catch(() => {
          // Return offline fallback for navigation requests
          if (request.destination === "document") {
            return caches.match("/offline.html") || caches.match("/");
          }
        });
    }),
  );
});

// Background sync for contact form
self.addEventListener("sync", (event) => {
  console.log("Service Worker: Background sync triggered");

  if (event.tag === "contact-form-sync") {
    event.waitUntil(syncContactForm());
  }
});

// Push notifications
self.addEventListener("push", (event) => {
  console.log("Service Worker: Push received");

  const options = {
    body: event.data ? event.data.text() : "New update available!",
    icon: "/icon-192x192.png",
    badge: "/icon-192x192.png",
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1,
    },
    actions: [
      {
        action: "explore",
        title: "View",
        icon: "/icon-192x192.png",
      },
      {
        action: "close",
        title: "Close",
        icon: "/icon-192x192.png",
      },
    ],
  };

  event.waitUntil(
    self.registration.showNotification("Portfolio Update", options),
  );
});

// Notification click handler
self.addEventListener("notificationclick", (event) => {
  console.log("Service Worker: Notification clicked");

  event.notification.close();

  if (event.action === "explore") {
    event.waitUntil(clients.openWindow("/"));
  }
});

// Message handler for update prompts
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

// Helper function to sync contact form data
async function syncContactForm() {
  try {
    const cache = await caches.open(DYNAMIC_CACHE);
    const keys = await cache.keys();

    // Find contact form requests in cache
    const contactRequests = keys.filter((request) =>
      request.url.includes("/api/contact"),
    );

    // Retry sending each request
    for (const request of contactRequests) {
      try {
        const response = await fetch(request);
        if (response.ok) {
          // Remove from cache after successful send
          await cache.delete(request);
          console.log("Service Worker: Contact form synced successfully");
        }
      } catch (error) {
        console.log("Service Worker: Contact form sync failed:", error);
      }
    }
  } catch (error) {
    console.log("Service Worker: Sync error:", error);
  }
}

// Periodic background sync (if supported)
if ("periodicSync" in self.registration) {
  self.addEventListener("periodicsync", (event) => {
    if (event.tag === "content-sync") {
      event.waitUntil(syncContent());
    }
  });
}

// Helper function to sync content updates
async function syncContent() {
  try {
    // Check for content updates
    const response = await fetch("/api/content-updates");
    if (response.ok) {
      const updates = await response.json();

      // Update cache with new content
      const cache = await caches.open(DYNAMIC_CACHE);
      for (const update of updates) {
        await cache.put(update.url, new Response(JSON.stringify(update.data)));
      }

      // Notify clients about updates
      const clients = await self.clients.matchAll();
      clients.forEach((client) => {
        client.postMessage({
          type: "CONTENT_UPDATED",
          updates: updates,
        });
      });
    }
  } catch (error) {
    console.log("Service Worker: Content sync error:", error);
  }
}
