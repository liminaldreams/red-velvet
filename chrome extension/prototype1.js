
// create an XMLHttpRequest Object
var xml = new XMLHttpRequest();

// use tab events: onCreated, onActivated, ...etc.
// chrome.tabs.onActivated.addListener(function(activeInfo){
// 	activeInfo.tabId
// })

chrome.tabs.onCreated.addListener(function(tab) {
	xml.open("POST", tab.url, true);
	var time = Date.now();
	var t = time.toString();
	xml.send(t);
})

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
	if (tab.url != changeInfo.url) {
		xml.open("POST", changeInfo.url, true);
		var time = Date.now();
		var t = time.toString();
		xml.send(t);
	}
})

// test for popup, use Date.now() for UNIX time
chrome.tabs.getSelected(null, function(tab) {
    document.getElementById('currentLink').innerHTML = tab.url;
});


// get URL of current tab, time stamp of when tab is opened, time stamp of when going to a new
// tab, time stamp of when tab is closed

// get URL for when open and close plus time

// send info to server