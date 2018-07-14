const REPOSITORY = "reimemonster";
const VERSION = "v2";
const URLS = [
	`./`,
  `/${REPOSITORY}/`,
  `/${REPOSITORY}/index.html`,
  `/${REPOSITORY}/fallback.html`,
  `/${REPOSITORY}/demo.js`,
  `/${REPOSITORY}/demo-worker.js`,
  "//fonts.googleapis.com/css?family=Inconsolata|Permanent+Marker"
];
const CACHE_NAME = `${REPOSITORY}-${VERSION}`;

self.addEventListener("install", function(event) {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(URLS)));
});

self.addEventListener("fetch", function(event) {
  console.log("SW Request:", event);
  event.respondWith(
    caches
      .match(event.request)
      .then(response => response || fetch(event.request))
      .catch(() => caches.match(`/${REPOSITORY}/fallback.html`))
  );
});
