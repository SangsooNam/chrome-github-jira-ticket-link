// Listen for tab updates (including URL changes from SPA navigation)
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.url && tab.url) {
    // Send URL change notification to content script
    chrome.tabs.sendMessage(tabId, {
      type: 'URL_CHANGED',
      url: changeInfo.url
    }).catch(error => {
      // Content script might not be ready yet, ignore the error
      console.log('Content script not ready:', error);
    });
  }
});

// Listen for when content script is ready
chrome.runtime.onMessage.addListener((message, sender) => {
  if (message.type === 'CONTENT_SCRIPT_READY') {
    // Send current URL to content script for initial check
    chrome.tabs.sendMessage(sender.tab.id, {
      type: 'URL_CHANGED',
      url: sender.tab.url
    }).catch(error => {
      console.log('Failed to send initial URL message:', error);
    });
  }
});