var el = {};

function init() {
	el.pattern = $('#pattern');
  el.url = $('#url');	
	$('#save').click(clickSave);
  $('#reset').click(clickReset);
  el.pattern.keypress(function(e) {
    if (e.which == 13) {
      clickSave();
      return false;
    }
  })
}

function clickSave() {
	var obj = {
    pattern : el.pattern.val(),
    url : el.url.val()
  }
	setValues(obj);
  window.close();
}

function clickReset() {
  var obj = {
    pattern : "\\w+-\\d+",
    url : "https://atlassian.net/browse/"
  }
  setValues(obj); 
  initViews(); 
}

function initViews() {
  getValue(["pattern", "url"], function (values) {
    el.pattern.val(values.pattern);
    el.url.val(values.url);
  });
}

$(document).ready(function() {
	init();
	initViews();
});
