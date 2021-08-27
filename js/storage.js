const DEFAULT_VALUES = {
	pattern : "\\w+-\\d+",
  url : "https://atlassian.net/browse/"
};

function getValues(fn) {
	chrome.storage.sync.get(['pattern', 'url'], function(value) {
		const patternValue = value['pattern'] || DEFAULT_VALUES['pattern']
		const urlValue = value['url'] || DEFAULT_VALUES['url']
		fn(patternValue, urlValue);
	});
}

function setValues(patternValue, urlValue) {
	chrome.storage.sync.set({
		pattern : patternValue,
	  url : urlValue
	});
}

function clearValues() {
	chrome.storage.sync.clear();
}
