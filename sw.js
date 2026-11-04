importScripts("all.js");

const { __60745ServiceWorker } = __60745LoadWorker();
const __60745 = new __60745ServiceWorker();

async function handleRequest(event) {
	await __60745.loadConfig();
	if (__60745.route(event)) {
		return __60745.fetch(event);
	}
	return fetch(event.request);
}

self.addEventListener("fetch", (event) => {
	event.respondWith(handleRequest(event));
});
