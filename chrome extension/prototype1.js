//chrome.alarms.create("run", {periodInMinutes: 1});

// create('name';, {
// 	when: Number,
// 	delayInMinutes: 3,
//  periodInMinutes: 1,
// });

// console.logCopy = console.log.bind(console);

// console.log = function(data) {
// 	var timestamp = '[' + Date.now() + ']';
// 	this.logCopy(timestamp, data);
// };

// console.log(timestamp);

chrome.tabs.getSelected(null, function(tab) {
    document.getElementById('currentLink').innerHTML = tab.url;
    //myFunction(tab.url);
});

// function myFunction(tablink) {
//   // do stuff here
//   console.log(tablink);
// }

// create object with alarmInfo? then call it in chrome.alarms.create("run", object.periodInMinutes);
// set it so .js file runs every minute for now

// get URL of current tab, time stamp of when tab is opened, time stamp of when going to a new
// tab, time stamp of when tab is closed

// get URL for when open and close plus time

// send info to server