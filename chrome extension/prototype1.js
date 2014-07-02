// function printTabID(Tab tab) {
// 	var tabURL = tab.url;
// 	document.getElementById('output').innerHTML += (tabURL);
// }

// chrome.tabs.onCreated.addListener(printTabID(self));
// chrome.tabs.onUpdated.addListener(printTabID(self));


// chrome.tabs.getCurrent(function(tab) {
// 	console.log(tab.url);
// });

chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
    console.log(tabs[0].url);
});

// create object with alarmInfo? then call it in chrome.alarms.create("run", object.periodInMinutes);
// set it so .js file runs every minute for now

// get URL of current tab, time stamp of when tab is opened, time stamp of when going to a new
// tab, time stamp of when tab is closed

// get URL for when open and close plus time

// send info to server