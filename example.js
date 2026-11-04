"use strict";

const form = document.getElementById("sj-form");
const address = document.getElementById("sj-address");
const searchEngine = document.getElementById("sj-search-engine");
const error = document.getElementById("sj-error");
const errorCode = document.getElementById("sj-error-code");

// Quiet logger function for console observation
function logDebug(msg) {
	console.log(`[Proxy Log] ${msg}`);
}

// HARD STOP FOR FORM RELOADS: Prevents the browser from accidentally hard-refreshing on enter
if (form) {
	form.onsubmit = function(e) {
		e.preventDefault();
		return false;
	};
}

const { __60745Controller } = __60745LoadController();

const __60745 = new __60745Controller({
	files: {
		wasm: "/scram/__60745.wasm.wasm",
		all: "/scram/__60745.all.js",
		sync: "/scram/__60745.sync.js",
	},
});

__60745.init();

// Initialize __83677 network controller with explicit multi-threaded worker pipeline
let connection;
try {
	connection = new __83677.__83677Connection("/__83677/worker.js", "service-worker");
} catch (e) {
	connection = new __83677.__83677Connection("/__83677/worker.js");
}

form.addEventListener("submit", async (event) => {
	event.preventDefault();

	// 1. Register local service worker cache layer
	try {
		await registerSW();
	} catch (err) {
		console.warn("Service worker registration skipped:", err);
	}

	// 2. Format search engine rules or raw strings into absolute destination paths
	let url = address.value.trim();
	try {
		if (typeof search === "function") {
			url = search(address.value, searchEngine.value);
		} else {
			if (!url.startsWith("http://") && !url.startsWith("https://")) {
				if (url.includes(".") && !url.includes(" ")) {
					url = "https://" + url;
				} else {
					url = "https://google.com" + encodeURIComponent(url);
				}
			}
		}
	} catch (searchError) {
		console.error("Input resolution crash, falling back to string parsing:", searchError);
		if (!url.startsWith("http://") && !url.startsWith("https://")) {
			url = "https://" + url;
		}
	}

	// 3. Connect proxy transport architecture to your unblocked static Wisp connection
	let wispUrl = "wss://wisp.mercurywork.shop/";
	try {
		await connection.setTransport("/libcurl/index.mjs", [
			{ websocket: wispUrl },
		]);
	} catch (transportError) {
		console.error("Network transport layer connection failed:", transportError);
	}

	// 4. Mount and execute your secure sandbox viewing frame
	try {
		const oldFrame = document.getElementById("sj-frame");
		if (oldFrame) oldFrame.remove();

		const frame = __60745.createFrame();
		frame.frame.id = "sj-frame";
		frame.frame.style = "position:fixed;top:0;left:0;width:100%;height:100%;border:none;z-index:99999;background:white;";
		
		document.body.appendChild(frame.frame);
		frame.go(url);
		logDebug("S");
	} catch (frameError) {
		if (error && errorCode) {
			error.textContent = "g";
			errorCode.textContent = frameError.toString();
		}
		console.error("Viewport layer failed to construct frame:", frameError);
	}
});

logDebug("Production script initialized successfully.");
