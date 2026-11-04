"use strict";

const form = document.getElementById("sj-form");
const address = document.getElementById("sj-address");
const searchEngine = document.getElementById("sj-search-engine");
const error = document.getElementById("sj-error");
const errorCode = document.getElementById("sj-error-code");


function logDebug(msg) {
	console.log(`[log] ${msg}`);
}


if (form) {
	form.onsubmit = function(e) {
		e.preventDefault();
		return false;
	};
}

const { __60745Controller } = __60745LoadController();

const __60745 = new __60745Controller({
    prefix: "/ela/",
    files: {
        wasm: "/s.wasm",
        all: "/all.js",
        sync: "/cloudstorage-sync.js"
    }
});

__60745.init();


let connection;
try {
	connection = new __83677.__83677Connection("/mux-worker.js", "service-worker");
} catch (e) {
	connection = new __83677.__83677Connection("/mux-worker.js");
}

form.addEventListener("submit", async (event) => {
	event.preventDefault();


	try {
		await registerSW();
	} catch (err) {
		console.warn("err:", err);
	}

	
	let url = address.value.trim();
	try {
		if (typeof search === "function") {
			url = search(address.value, searchEngine.value);
		} else {
			if (!url.startsWith("http://") && !url.startsWith("https://")) {
				if (url.includes(".") && !url.includes(" ")) {
					url = "https://" + url;
				} else {
					url = "https://duckduckgo.com/search?q=" + encodeURIComponent(url);
				}
			}
		}
	} catch (searchError) {
		console.error("error:", searchError);
		if (!url.startsWith("http://") && !url.startsWith("https://")) {
			url = "https://" + url;
		}
	}


	let wispUrl = "wss://wisp.mercurywork.shop/";
	try {
		await connection.__05086("/libcurl/index.mjs", [
			{ websocket: wispUrl },
		]);
	} catch (__05086Error) {
		console.error("error:", __05086Error);
	}

	
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
		console.error("failed to construct frame:", frameError);
	}
});

logDebug("initialized successfully");
