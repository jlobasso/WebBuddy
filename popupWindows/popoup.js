'use strict';

document.addEventListener('DOMContentLoaded', function() {
  document.getElementById("submit").addEventListener("click", function() {
    
    chrome.runtime.sendMessage({ target: 'background-login', action: 'LOGIN'}, (res) => {
      console.log(res)
    });
    

  });
  
});

