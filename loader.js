// Canvas OLED Dark Mode — loader
// Author: Ayyub Siddiqui
// Version: 1.0.0
//
// Runs in the isolated world (has access to chrome.storage,
// unlike content.js which runs in the page's MAIN world).
// Reads the on/off setting and injects content.js only if enabled.

chrome.storage.local.get({ enabled: true }, (result) => {
    if (!result.enabled) {
        return;
    }

    const script = document.createElement('script');

    script.src = chrome.runtime.getURL('content.js');

    (
        document.documentElement ||
        document.head ||
        document.body
    ).appendChild(script);

    script.addEventListener('load', () => script.remove());
});
