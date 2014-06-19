// array of IDs; even indices are tab.tabId, odd indices are server IDs
// store in memory current session tabId - IDs that server will be sending back
var ids = [];

var currentID;

// create xmlhttprequest
var xml = new XMLHttpRequest();


// use tab events: onCreated, onActivated, ...etc.

// when the active tab in a window changes
// chrome.tabs.onActivated.addListener(function(activeInfo){
// 	// post end_time of previous currentID then update currentID
	

// 	// create new post to database
// 	ids[ids.length] = activeInfo.tabId;
// 	// need to get tab url from server?
// })

// when a new tab is created
chrome.tabs.onCreated.addListener(function(tab) {
	// create new post to database
	var data = {
		"url" : tab.url,
		"start_time" : Date.now(),
		"end_time" :
	};
	ids[ids.length] = tab.id;

	xml.open("POST", tab.url, true);
	xmlhttp.setRequestHeader("Content-type", "application/json");
	xmlhttp.onreadystatechange = function () { //Call a function when the state changes.
	    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
	        ids[ids.length] = xmlhttp.responseText;
	    }
	}
	var parameters = JSON.stringify(data);
	xml.send(parameters);
})

// when a tab is updated
// chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
// 	// if url changes, post end_time of previous currentID then update currentID
// 	// create new post to database
// 	// else ignore
// 	if (currentID != changeInfo.url) {
		
// 		//posted data to server already
// 		currentID = changeInfo.url;

// 		// xml.open("POST", changeInfo.url, true);
// 		// var time = Date.now();
// 		// var t = time.toString();
// 		// xml.send(t);
// 	}
// })

// when a tab is closed
// chrome.tabs.onRemoved.addListener(function(tabId, removeInfo) {
// 	// find ID corresponding to tabID in ids, update end_time

// })


// test for popup, use Date.now() for UNIX time
chrome.tabs.getSelected(null, function(tab) {
    document.getElementById('currentLink').innerHTML = tab.url;
});



// send info to server - http://red-velvet-proto.herokuapp.com/chromeext