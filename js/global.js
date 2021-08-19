var set = {
	pattern : "\\w+-\\d+",
  url : "https://atlassian.net/browse/"
};

function getValue(key, fn) {
	chrome.storage.sync.get(key, function(value) {
		fn(value);
	});
}

function setValue(key, value) {
	var obj = {}; obj[key] = value;
	setValues(obj);
}

function setValues(obj) {
	chrome.storage.sync.set(obj);
}