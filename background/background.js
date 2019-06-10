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


chrome.runtime.onInstalled.addListener(function() {
    chrome.contextMenus.create({
      "id": "sampleContextMenu",
      "title": "Sample Context Menu",
      "contexts": ["selection"]
    });
  });