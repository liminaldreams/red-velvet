// array of IDs; even indices are tab.tabId, odd indices are server IDs
// store in memory current session tabId - IDs that server will be sending back
var ids = {};

// id of current tab
var currentID;

// create xmlhttprequest
var xml = new XMLHttpRequest();


// use tab events: onCreated, onActivated, ...etc.

// when the active tab in a window changes
chrome.tabs.onActivated.addListener(function(activeInfo){
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
	    	delete ids[tabId];
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
chrome.tabs.onCreated.addListener(function(tab) {
	chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
		if (changeInfo.status == "complete") {
			// create new post to database
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
			    	//console.log(parsed._id);
			    	ids[tab.id] = parsed._id;
			    	console.log(ids[tab.id]);
			        currentID = tab.id;
			    }
			}
			var parameters = JSON.stringify(data);
			xml.send(parameters);
		}
	})
});

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
	    	delete ids[tabId];
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

// onUpdated is fired constantly...how would i get it so that it only updates
// the server if the tab has completed loading?
// -> use changeInfo.status == 'complete'?
// also, should i add this listener to onCreated? so it gets the final url
// and not the inbetween urls?

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



//test for popup, use Date.now() for UNIX time
// chrome.tabs.getSelected(null, function(tab) {
//     document.getElementById('currentLink').innerHTML = tab.url;
//     document.getElementById('currentLink').innerHTML += " ";
//     document.getElementById('currentLink').innerHTML += Date.now();
// });


//test for GET on selecting tab
<<<<<<< HEAD
chrome.tabs.getSelected(null, function(tab) {
	// create xmlhttprequest
	var xml = new XMLHttpRequest();

	xml.open("GET", "http://red-velvet-proto.herokuapp.com/chromeext", true);
	xml.onreadystatechange = function () { //Call a function when the state changes.
	    if (xml.readyState == 4 && xml.status == 200) {
	    	console.log(xml.responseText);
	    	//document.getElementById('currentLink').innerText = tab.id;
	    }
	}
	xml.send();
});
=======
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
>>>>>>> e2e13df9b9152ed29bc25949bc5bb5cfc99b8bcc


// send info to server - http://red-velvet-proto.herokuapp.com/chromeext