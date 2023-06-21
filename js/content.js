var replaceIntervalId;

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

$(document).ready(() => {
  replace();
});


// Handle a pull request link click case from the pull requests view.
var MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
if (MutationObserver) {
  var previousUrl = '';
  var options = {
    subtree: true,
    childList: true
  };
  var observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(e) {
      if (location.href !== previousUrl) {
        previousUrl = location.href;
        if (location.href.includes("/pull/")) {
          replace();
        }
      }
    });
  });

  observer.observe(document, options);
}