/**
 * Service worker main script.
 *
 * @type {ServiceWorkerGlobalScope} self
 * @type {Fl32_First_Front_Sw.config} self.config see 'pub/js/sw/config.hard.js'
 */
'use strict';

const API_STATIC_FILES = '/api/sw/init/files_to_cache';
const CACHE_STATIC = 'static-cache-v1';
const ROUTE_API = 'api';
const ROUTE_STATIC = 'static';
const ROUTE_WORKER = 'sw';

/**
 * Service worker flag to use cache to process fetch requests.
 *
 * @type {boolean}
 * @private
 */
let _cacheEnabled = true;

/**
 * Handler for 'install' event (cache static resources).
 *
 * @param {ExtendableEvent} evt
 */
function hndlEventInstall(evt) {
    /**
     * @returns {Promise<void>}
     */
    async function cacheStaticFiles() {
        // Get list of static files
        const req = new Request(API_STATIC_FILES);
        const resp = await self.fetch(req);
        const json = await resp.json();
        const files = json.urls;
        if (Array.isArray(files)) {
            // ... and load static files to the local cache
            const cacheStat = await caches.open(CACHE_STATIC);
            await cacheStat.addAll(files);
        }
    }

    //  wait until all static files will be cached
    evt.waitUntil(cacheStaticFiles());
}

/**
 * Send message to `index.html` to start bootstrap.
 */
function hndlEventActivate() {
    self.clients.claim();
}

/**
 *
 * @param {FetchEvent} evt
 */
function hndlEventFetch(evt) {
    /**
     * Analyze route's URL and return route type (api, service worker or static).
     * @param {Request} req
     * @returns {string}
     */
    function getRouteType(req) {
        if (
            req.url.match(/\/api\//) &&
            !req.url.match(/\/js\/app\/api\//)
        ) {
            return ROUTE_API;
        } else if (req.url.match(/\/sw\//)) {
            return ROUTE_WORKER;
        }
        return ROUTE_STATIC;
    }

    /**
     * @returns {Promise<Response>}
     */
    async function getFromCacheOrFetchAndCache() {
        try {
            const cache = await self.caches.open(CACHE_STATIC);
            const cachedResponse = await cache.match(evt.request);
            if (cachedResponse) {
                return cachedResponse;
            }
            // wait until resource will be fetched from server and stored in cache
            const resp = await fetch(evt.request);
            await cache.put(evt.request, resp.clone());
            return resp;
        } catch (e) {
            console.log('[SW] error:');
            console.dir(e);
        }
    }

    /**
     * Processor for service worker command.
     *
     * @param {FetchEvent} evt
     */
    async function processWorkerCommand(evt) {
        const url = evt.request.url;
        if (url.includes('/cache/disable')) {
            _cacheEnabled = false;
            console.log('[SW] Cache is disabled.');
        } else if (url.includes('/cache/enable')) {
            _cacheEnabled = true;
            console.log('[SW] Cache is enabled.');
        } else if (url.includes('/cache/clean')) {
            await self.caches.delete(CACHE_STATIC);
            console.log('[SW] Cache is cleaned.');
        }
        return new Response(JSON.stringify({status: 'OK'}), {
            headers: {'Content-Type': 'application/json'}
        });
    }

    const url = evt.request.url;
    const routeType = getRouteType(evt.request);
    if (routeType === ROUTE_API) {
        // just pass the request to server
    } else if (routeType === ROUTE_WORKER) {
        // perform any service routines with service worker
        evt.respondWith(processWorkerCommand(evt));
    } else {
        // get static resource by default
        if (_cacheEnabled) {
            console.log('[SW] Fetch \'%s\' as \'%s\' route.', url, routeType);
            evt.respondWith(getFromCacheOrFetchAndCache());
        } else {
            // return nothing to process fetch request natively (by browser)
        }
    }
}

// setup event handlers in service worker scope
self.addEventListener('install', hndlEventInstall);
self.addEventListener('activate', hndlEventActivate);
self.addEventListener('fetch', hndlEventFetch);
