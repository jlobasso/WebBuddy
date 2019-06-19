'use strict';

document.addEventListener('DOMContentLoaded', function() {
  document.getElementById("submit").addEventListener("click", function() {
    
    chrome.runtime.sendMessage({ target: 'backOauth', action: 'LOGIN'}, (res) => {
      console.log(res)
    });
    

  });
  
});

