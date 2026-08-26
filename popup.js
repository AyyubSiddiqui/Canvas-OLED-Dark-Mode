// Canvas OLED Dark Mode — popup
// Author: Ayyub Siddiqui
// Version: 1.0.0
//
// Saves the on/off setting only. Does not reload the tab —
// the loader reads this setting on the next page load, so a
// manual reload is needed for a change to take effect.
 
const toggle = document.getElementById('toggle');
const statusLabel = document.getElementById('statusLabel');
const hint = document.getElementById('hint');
 
function render(enabled) {
    toggle.checked = enabled;
    statusLabel.textContent = 'Status: ' + (enabled ? 'On' : 'Off');
}
 
chrome.storage.local.get({ enabled: true }, (result) => {
    render(result.enabled);
});
 
toggle.addEventListener('change', () => {
    const enabled = toggle.checked;
 
    render(enabled);
 
    chrome.storage.local.set({ enabled }, () => {
        hint.textContent = 'Reload the page for this to take effect.';
    });
});