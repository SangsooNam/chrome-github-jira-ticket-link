var replaceIntervalId;

function replaceLink(pattern, url) {
  let title = $('span.js-issue-title');
  if (title.length) {
    let targetUrl = url.startsWith("http") ? url : "http://" + url;
    let re = new RegExp('(.*?)(' + pattern + ')(.*?)', 'i');
    let text = title.text().replace(re,"$1<a target='_blank' href='" + targetUrl + "$2'>$2</a>$3")
    title.html(text);
  }
}

function init() {
  getValues(function (patternValue, urlValue) {
    replaceLink(patternValue, urlValue);
  });
}

$(document).ready(init);
