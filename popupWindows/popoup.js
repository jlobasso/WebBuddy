'use strict';

document.addEventListener('DOMContentLoaded', function() {
  document.getElementById("btn-detect").addEventListener("click", function() {
    var inputText = document.getElementById("text").value;
    var title = chrome.i18n.getMessage("appDescription","description")
    alert(title);
    console.log(title)

  });
});