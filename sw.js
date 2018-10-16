/*
    Resource: https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers
*/


//Install Step

self.addEventListener('install', event => {
    event.waitUntil(
      caches.open('v1').then( cache => {
        return cache.addAll([
         
    '/css/styles.css',
    '/js/main.js',
    '/index.html',
    '/restaurant.html',
    '/img/1.jpg',
    '/img/2.jpg',
    '/img/3.jpg',
    '/img/4.jpg',
    '/img/5.jpg',
    '/img/6.jpg',
    '/img/7.jpg',
    '/img/8.jpg',
    '/img/9.jpg',
    '/img/10.jpg',
    '/js/dbhelper.js',
    'data/restaurants.json',
    '/js/restaurant_info.js',

        ]);
      })
    );
  });

  // Fetch Event
  self.addEventListener('fetch', event => {
    event.respondWith(
      caches.match(event.request).then( resp => {
        return resp || fetch(event.request).then(response => {
          return caches.open('v1').then( cache => {
            cache.put(event.request, response.clone());
            return response;
          });  
        });
      })
    );
  });

  //Activate step

  self.addEventListener('activate', event => {
    let cacheWhitelist = ['v2'];
  
    event.waitUntil(
      caches.keys().then( keyList => {
        return Promise.all(keyList.map( key => {
          if (cacheWhitelist.indexOf(key) === -1) {
            return caches.delete(key);
          }
        }));
      })
    );
  });