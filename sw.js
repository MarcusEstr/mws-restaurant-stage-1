const applicationName = 'RestaurantReviews';
const cacheName = applicationName + "-v.1.0";

let cacheArray = [cacheName];

//Cache assets when Service Worker is installed on browser.
self.addEventListener('install', function(event) {
	event.waitUntil(
		//Provide listed files to browser for caching.
		caches.open(cacheName).then(function(cache) {
			return cache.addAll(
				//All site content that we want cached should be here:
				['/', '/restaurant.html', 
				'/css/styles.css', 
				'/js/main.js', '/js/restaurant_info.js', '/js/register-sw.js', '/js/dbhelper.js',
				'/img/1.jpg', '/img/2.jpg', '/img/3.jpg', '/img/4.jpg', '/img/5.jpg',
				'/img/6.jpg', '/img/7.jpg', '/img/8.jpg', '/img/9.jpg',
				'/data/restaurants.json', '/favicon.ico']
			);
		})
	);
});

//Delete a previous cache in browser, if one exists:
self.addEventListener('activate', function(event) {
	event.waitUntil(
		caches.keys().then(function(cacheNames) {
			return Promise.all(
				//Look and see if the cache name is the same as the current version (ie: v.1.0)
				cacheNames.filter(function(cacheName) { //Return cache...
					return cacheName.startsWith(applicationName) && !cacheArray.includes(cacheName);
				}).map(function(cacheName) { //... or delete the cache from browswer.
					return caches.delete(cacheName);
				})
			);
		})
	);
});


//To get browser to access cache when Offline, need to control the fetch request:
self.addEventListener('fetch', function(event) {
	event.respondWith(
		//Try to provide cached data.
		caches.match(event.request).then(function(response) {
			return response || fetch(event.request);
		})
	);
});