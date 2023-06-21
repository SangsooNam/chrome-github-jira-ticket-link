var replaceIntervalId;

function replaceLink(pattern, url) {
  let title = $('.gh-header-show .js-issue-title');
  if (title.length) {
    let targetUrl = url.startsWith("http") ? url : "http://" + url;
    let re = new RegExp('(' + pattern + ')', 'i');
    let text = title.text().replace(re,"<a target='_blank' href='" + targetUrl + "$1'>$1</a>")
    title.html(text);
  }
}

function replace() {
  getValues(function (patternValue, urlValue) {
    replaceLink(patternValue, urlValue);
  });
}

$(document).ready(replace);


var MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
if (MutationObserver) {
  var options = {
    subtree: false,
    attributes: true
  };
  var observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(e) {
      if (e.attributeName == 'class') {
        replace();
      }
    });
  });

  // Observe async loading. e.g. Navigate tabs, Click a pull request from pull requests view
  $('.progress-pjax-loader').each(function() {
    observer.observe(this, options);
  });  
}