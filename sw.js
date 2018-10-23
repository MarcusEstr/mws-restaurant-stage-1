const applicationName = 'RestaurantReviews';
const cacheName = applicationName + "-v.0.8";
const imageCache = applicationName + "-image";

let cacheArray = [cacheName, imageCache];

//Cache assets when Service Worker is installed on browser.
self.addEventListener('install', function(event) {

	event.waitUntil(

		caches.open(cacheName).then(function(cache) {

			return cache.addAll(
				//All site content that we want cached should be here:
				['/', '/restaurant.html', 
				'/css/styles.css', 
				'/js/main.js', '/js/restaurant_info.js', '/js/register-sw.js', '/js/dbhelper.js',
				'/data/restaurants.json']
			);

		})

	);

});

//Delete a previous cache in browser:
self.addEventListener('activate', function(event) {

	event.waitUntil(

		caches.keys().then(function(cacheNames) {

			return Promise.all(

				cacheNames.filter(function(cacheName) {

					return cacheName.startsWith(applicationName) && !cacheArray.includes(cacheName);

				}).map(function(cacheName) {
					return caches.delete(cacheName);
				})

			);

		})

	);

});