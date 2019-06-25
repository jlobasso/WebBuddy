const login = document.getElementById("submit");
const logout = document.getElementById("logout");
const logInForm = document.getElementsByClassName("log-in-form")[0];
const logedInWrapper = document.getElementsByClassName("loged-in")[0];
const info = logedInWrapper.getElementsByClassName("titles")[0];
const username = document.getElementById("username");
const password = document.getElementById("password");
const notAvailibleSite = document.getElementsByClassName("site-not-available")[0];
const pulpouBarVisivility = document.getElementById("pulpou-bar-switch");
const pulpouBarVisivilityLabel = document.getElementsByClassName("custom-control-label")[0];



//chequeamos si existe una session activa
chrome.runtime.sendMessage({
  target: 'background-login',
  action: 'CHECK_SESSION'
});

chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  tabs.forEach((tab, i) => {
    chrome.tabs.sendMessage(tab.id, {
      target: 'main-content',
      action: 'MAIN_BAR_STATE'
    }, function (mainBarStatus) {
      pulpouBarVisivility.checked = mainBarStatus;
      pulpouBarVisivilityLabel.innerText = (!mainBarStatus)? "Activate Pulpou" : "Deactivate Pulpou";
    });
  });
});


login.addEventListener("click", function () {

  chrome.runtime.sendMessage({
    target: 'background-login',
    action: 'LOGIN',
    username: username.value,
    password: password.value
  }, (res) => {
    console.log(res)
  });

});

logout.addEventListener("click", function () {

  chrome.runtime.sendMessage({
    target: 'background-login',
    action: 'LOGOUT'
  }, (res) => {
    console.log(res)
  });

});

(pulpouBarVisivility && pulpouBarVisivility.addEventListener("click", function () {


  const status = (pulpouBarVisivility.checked || false) ? 'showPulpouBar' : 'hidePulpouBar';

  pulpouBarVisivilityLabel.innerText = (!pulpouBarVisivility.checked)? "Activate Pulpou" : "Deactivate Pulpou";

  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    tabs.forEach((tab, i) => {
      chrome.tabs.sendMessage(tab.id, {
        target: 'main-content',
        action: 'BAR_VISIBILITY',
        value: status
      });
    });
  });

}))


chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {

  if (message.target === 'popup') {
    switch (message.action) {
      case 'LOGIN':

        if (message.value === 'show') {
          logInForm.classList.remove("hide");
          logedInWrapper.classList.add("hide");
        }

        if (message.value === 'hide') {
          logInForm.classList.add("hide");
          logedInWrapper.classList.remove("hide");
          info.innerHTML = `User: ${message.username}`;
        }

        break;

      default:
        break;
    }
  }

});
