self.addEventListener('install', function(event) {
    let urlsToCache = [
        '/',
        'js/main.js',
        'css/main.css',
        'imgs/icon.png',
        'https://fonts.gstatic.com/s/roboto/v15/2UX7WLTfW3W8TclTUvlFyQ.woff',
        'https://fonts.gstatic.com/s/roboto/v15/d-6IYplOFocCacKzxwXSOD8E0i7KZn-EPnyo3HZu7kw.woff'
    ];

    event.waitUntil(
        // TODO: open a cache named 'wittr-static-v1'
        // Add cache the urls from urlsToCache
        caches.open('damola-v1').then(function (cache) {
            return cache.addAll([
                'index.html',
                'css/main.css',
                'images/bg.jpg',
                'js/main.js',
                'js/index.js'
            ]);
        })
    );
});

self.addEventListener('fetch', function(event) {
    // Leave this blank for now.
    // We'll get to this in the next task.
    event.respondWith(
        caches.match(event.request).then(function (response) {
            return response || fetch(event.request);
        })
    );
});