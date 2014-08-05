// array of IDs; even indices are tab.tabId, odd indices are server IDs
// store in memory current session tabId - IDs that server will be sending back
var ids = {};

// id of current tab
var currentID;

// create xmlhttprequest
var xml = new XMLHttpRequest();

// 0 = windows open. 1 = all windows minimized
var closed = 0;


// use tab events: onCreated, onActivated, ...etc.

// when the active tab in a window changes
chrome.tabs.onActivated.addListener(function(activeInfo){
	// post end_time of previous currentID
	console.log("fired!");
	var oldData = {
		"end_time" : Date.now()
	};

	var db = "http://red-velvet-proto.herokuapp.com/chromeext/" + ids[currentID];
	xml.open("PUT", db, true);
	xml.setRequestHeader("Content-type", "application/json");
	xml.onreadystatechange = function () { //Call a function when the state changes.
	    if (xml.readyState == 4 && xml.status == 200) {
	    	console.log(db);
	    	delete ids[currentID];
	    }
	}
	var sendOld = JSON.stringify(oldData);
	xml.send(sendOld);

	// create new post to database and update currentID
	chrome.tabs.get(activeInfo.tabId, function(tab) {
		var data = {
			"url" : tab.url,
			"start_time" : Date.now(),
			"end_time" : 0
		};
    	//currentID = tab.id;

    	xml.open("POST", "http://red-velvet-proto.herokuapp.com/chromeext", true);
		xml.setRequestHeader("Content-type", "application/json");
		xml.onreadystatechange = function () { //Call a function when the state changes.
		    if (xml.readyState == 4 && xml.status == 200) {
		    	console.log(xml.responseText);
		    	var response = xml.responseText;
		    	var parsed = JSON.parse(response);
		        ids[activeInfo.tabId] = parsed._id;
				currentID = activeInfo.tabId;
		    }
		}
		var parameters = JSON.stringify(data);
		xml.send(parameters);
  	});
});

// when a new tab is created
// chrome.tabs.onCreated.addListener(function(tab) {
// 	chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
// 		if (changeInfo.status == "complete") {
// 			// create new post to database
// 			var data = {
// 				"url" : tab.url,
// 				"start_time" : Date.now(),
// 				"end_time" : 0
// 			};

// 			xml.open("POST", "http://red-velvet-proto.herokuapp.com/chromeext", true);
// 			xml.setRequestHeader("Content-type", "application/json");
// 			xml.onreadystatechange = function () { //Call a function when the state changes.
// 			    if (xml.readyState == 4 && xml.status == 200) {
// 			    	console.log(xml.responseText);
// 			    	var response = xml.responseText;
// 			    	var parsed = JSON.parse(response);
// 			    	//console.log(parsed._id);
// 			    	ids[tab.id] = parsed._id;
// 			    	console.log(ids[tab.id]);
// 			        currentID = tab.id;
// 			    }
// 			}
// 			var parameters = JSON.stringify(data);
// 			xml.send(parameters);
// 		}
// 	})
// });

// created tab isn't the active tab. have to fix that!

// when a tab is updated
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
	// if url changes, post end_time of previous currentID then update currentID
	// create new post to database

	// post end_time of previous currentID
	var oldData = {
		"end_time" : Date.now()
	};

	var db = "http://red-velvet-proto.herokuapp.com/chromeext/" + ids[currentID];
	xml.open("PUT", db, true);
	xml.setRequestHeader("Content-type", "application/json");
	xml.onreadystatechange = function () { //Call a function when the state changes.
	    if (xml.readyState == 4 && xml.status == 200) {
	    	console.log(db);
	    	delete ids[currentID];
	    }
	}
	var sendOld = JSON.stringify(oldData);
	xml.send(sendOld);
	
	// create new post to database and update currentID
	if (changeInfo.status == "complete") {
		var data = {
			"url" : tab.url,
			"start_time" : Date.now(),
			"end_time" : 0
		};

    	xml.open("POST", "http://red-velvet-proto.herokuapp.com/chromeext", true);
		xml.setRequestHeader("Content-type", "application/json");
		xml.onreadystatechange = function () { //Call a function when the state changes.
		    if (xml.readyState == 4 && xml.status == 200) {
		    	console.log(xml.responseText);
		    	var response = xml.responseText;
		    	var parsed = JSON.parse(response);
		        ids[tab.tabId] = parsed._id;
				currentID = tab.tabId;
		    }
		}
		var parameters = JSON.stringify(data);
		xml.send(parameters);
	}
});

// when a tab is closed
chrome.tabs.onRemoved.addListener(function(tabId, removeInfo) {
	// find ID corresponding to tabID in ids, update end_time
	var data = {
		"end_time" : Date.now()
	};

	var db = "http://red-velvet-proto.herokuapp.com/chromeext/" + ids[tabId];
	xml.open("PUT", db, true);
	xml.setRequestHeader("Content-type", "application/json");
	xml.onreadystatechange = function () { //Call a function when the state changes.
	    if (xml.readyState == 4 && xml.status == 200) {
	    	console.log(db);
	    	delete ids[tabId];
	    }
	}
	var parameters = JSON.stringify(data);
	xml.send(parameters);
});

// check when all windows are minimized
chrome.windows.onFocusChanged.addListener(function(windowId) {
	if (windowId == -1) {
		// Assume minimized
		// post end_time of previous currentID
		var oldData = {
			"end_time" : Date.now()
		};

		var db = "http://red-velvet-proto.herokuapp.com/chromeext/" + ids[currentID];
		xml.open("PUT", db, true);
		xml.setRequestHeader("Content-type", "application/json");
		xml.onreadystatechange = function () { //Call a function when the state changes.
		    if (xml.readyState == 4 && xml.status == 200) {
		    	console.log(db);
		    	delete ids[currentID];
		    }
		}
		var sendOld = JSON.stringify(oldData);
		xml.send(sendOld);

		currentID = null;
		closed = 1;
		console.log(closed);
	}

	// reopen window after minimizing all
	if (closed == 1) {
		console.log("outside func");
		chrome.tabs.query({active: true, currentWindow: true}, function(array) {
			// only one tab should be active in the current window
			var activeTab = array[0];
			var data = {
				"url" : activeTab.url,
				"start_time" : Date.now(),
				"end_time" : 0
			};
			console.log("hi");
			console.log(active);

			xml.open("POST", "http://red-velvet-proto.herokuapp.com/chromeext", true);
			xml.setRequestHeader("Content-type", "application/json");
			xml.onreadystatechange = function () { //Call a function when the state changes.
			    if (xml.readyState == 4 && xml.status == 200) {
			    	console.log(xml.responseText);
			    	var response = xml.responseText;
			    	var parsed = JSON.parse(response);
			        ids[activeTab.tabId] = parsed._id;
					currentID = activeTab.tabId;
			    }
			}
			var parameters = JSON.stringify(data);
			xml.send(parameters);
			closed = 0;
		})
	}
});



//test for popup, use Date.now() for UNIX time
// chrome.tabs.getSelected(null, function(tab) {
//     document.getElementById('currentLink').innerHTML = tab.url;
//     document.getElementById('currentLink').innerHTML += " ";
//     document.getElementById('currentLink').innerHTML += Date.now();
// });


//test for GET on selecting tab
// chrome.tabs.getSelected(null, function(tab) {
// 	// create xmlhttprequest
// 	var xml = new XMLHttpRequest();

// 	xml.open("GET", "http://red-velvet-proto.herokuapp.com/chromeext", true);
// 	xml.onreadystatechange = function () { //Call a function when the state changes.
// 	    if (xml.readyState == 4 && xml.status == 200) {
// 	    	alert(ids[ids.length]);
// 	    	//document.getElementById('currentLink').innerText = tab.id;
// 	    }
// 	}
// 	xml.send();
// });


// send info to server - http://red-velvet-proto.herokuapp.com/chromeext