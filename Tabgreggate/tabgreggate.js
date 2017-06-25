function openBackgroundPage() {
    chrome.tabs.create({ url: chrome.extension.getURL('tabulator.html') });
}