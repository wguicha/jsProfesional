const VERSION = "v1";

self.addEventListener('install', event =>{
    event.waitUntil(precache())
})


//Para buscar primero en cache los recursos subidos:
self.addEventListener('fetch', event =>{
    const request = event.request;
    //get
    if(request.method !== "GET"){
        return;
        //Esta parte no hace nada para que la ejecucion vaya a internet        
    }

    //Buscar en cache
    event.respondWith(cachedResponse(request));
  
    // actualizar el cache
    event.waitUntil(updateCache(request));
})


//Carga en cache los archivos indicados en el codigo
async function precache () {
    const cache = await caches.open(VERSION);
    return cache.addAll([
        '/',
        '/index.html',
        '/assets/index.js',
        '/assets/MediaPlayer.js',
        '/assets/plugins/AutoPlay.js',
        '/assets/plugins/AutoPause.js',
        '/assets/index.css',
        '/assets/BigBuckBunny_512kb.mp4',
    ]);
}

async function cachedResponse (request){
    const cache = await caches.open(VERSION);
    const response = await cache.match(request);
    return response || fetch(request);
}

async function updateCache (request){
    const cache = await caches.open(VERSION);
    const response = await fetch(request);
    return cache.put(request, response);

}
