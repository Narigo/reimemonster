self.addEventListener("install", function(event) {
  event.waitUntil(
    caches.open("static-v1").then(function(cache) {
      return cache.addAll(["/", "/fallback.html", "/demo.js", "/demo-worker.js"]);
    })
  );
});

self.addEventListener("fetch", function(event) {
  event.respondWith(
    caches
      .match(event.request)
      .then(response => response || event.default())
      .catch(() => caches.match("/fallback.html"))
  );
});
