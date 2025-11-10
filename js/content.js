// Pull request URL pattern
const PR_URL_PATTERN = /\/pull\/\d+/;

function waitForElm(selector) {
  return new Promise(resolve => {
      if (document.querySelector(selector)) {
          return resolve(document.querySelector(selector));
      }

      const observer = new MutationObserver(mutations => {
          if (document.querySelector(selector)) {
              resolve(document.querySelector(selector));
              observer.disconnect();
          }
      });

      observer.observe(document.body, {
          childList: true,
          subtree: true
      });
  });
}

function replace() {
  getValues(function (pattern, url) {
    waitForElm('.gh-header-show .js-issue-title').then((elm) => {
      let targetUrl = url.startsWith("http") ? url : "http://" + url;
      let re = new RegExp('(' + pattern + ')', 'i');
      let text = $(elm).text().replace(re,"<a target='_blank' href='" + targetUrl + "$1'>$1</a>")
      $(elm).html(text);
    });
  });
}

// Initialize on page load
$(document).ready(() => {
  chrome.runtime.sendMessage({ type: 'CONTENT_SCRIPT_READY' });
});

// Listen for URL change messages from background script
chrome.runtime.onMessage.addListener((message) => {
  if (message.type === 'URL_CHANGED') {
    // Check if URL matches pull request pattern
    if (PR_URL_PATTERN.test(message.url)) {
      replace();
    }
  }
});