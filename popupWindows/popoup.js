'use strict';

document.addEventListener('DOMContentLoaded', function() {
  document.getElementById("btn-detect").addEventListener("click", function() {
    
    console.log('HOLAAAAAAAAAA')

  });
  
});

// // Called when the user clicks on the browser action.
// chrome.browserAction.onClicked.addListener(function(tab) {
//   // No tabs or host permissions needed!
//   console.log('Turning ' + tab.url + ' red!');
//   chrome.tabs.executeScript({
//     code: 'document.body.style.backgroundColor="red"'
//   });
// });



chrome.runtime.onMessage.addListener(function(message, callback) {
    if (message.data == "setAlarm") {
        chrome.alarms.create({delayInMinutes: 5})
      } else if (message.data == "runLogic") {
        chrome.tabs.executeScript({file: 'logic.js'});
      } else if (message.data == "changeColor") {
        chrome.tabs.executeScript(
            {code: 'document.body.style.backgroundColor="orange"'});
      };
});
