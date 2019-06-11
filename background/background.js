// 'use strict';

// chrome.runtime.onInstalled.addListener(function() {  

// chrome.storage.sync.set({color: '#3aa757'}, function() {
//     console.log('The color is green.');
// });


//     var rule = {
//         conditions: [
//             new chrome.declarativeContent.PageStateMatcher({
//             pageUrl: { hostEquals: 'www.instagram.com'}
//             })
//         ],
//         actions: [ new chrome.declarativeContent.ShowPageAction() ]
//     };



//     chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
//         chrome.declarativeContent.onPageChanged.addRules([rule]);
//     });

// });


chrome.runtime.onInstalled.addListener(function () {
  chrome.contextMenus.create({
    "id": "sampleContextMenu",
    "title": "Sample Context Menu",
    "contexts": ["selection"]
  });
});


chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.target == "back" && message.action === 'barVisibility') {
    message.target = 'mainContent';
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, message, function (response) {
        console.log("background sent message to main content");
        console.log(response);
      });
    });
    sendResponse("background noticed: " + message.value)
  }
})




/*EJEMPLO MENSAJE A TODOS LOS TABS*/
// chrome.tabs.query({}, function (tabs) {
//   var message = { foo: bar };
//   for (var i = 0; i < tabs.length; ++i) {
//     chrome.tabs.sendMessage(tabs[i].id, message);
//   }

// });


