var el = {};

function init() {
	el.pattern = $('#pattern');
  el.url = $('#url');
	$('#save').click(clickSave);
  $('#reset').click(clickReset);
	el.url.keypress(keypressSave)
  el.pattern.keypress(keypressSave)
	updateViews();
}

function keypressSave(e) {
	if (e.which == 13) {
		clickSave();
		return false;
	}
}

function clickSave() {
	setValues(el.pattern.val(), el.url.val());
  window.close();
}

function clickReset() {
  clearValues();
  updateViews();
}

function updateViews() {
  getValues(function (patternValue, urlValue) {
    el.pattern.val(patternValue);
    el.url.val(urlValue);
  });
}

$(document).ready(function() {
	init();
});
