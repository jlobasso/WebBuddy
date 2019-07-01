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

//CHECK IF SESSION IS AVAILABLE
chrome.runtime.sendMessage({
  target: 'background-login',
  action: 'CHECK_SESSION'
});

//ASK THE ACTIVE TAB THE STATE OF THAT TAB
chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  tabs.forEach((tab, i) => {
    chrome.tabs.sendMessage(tab.id, {
      target: 'main-content',
      action: 'MAIN_BAR_STATE'
    }, function (mainBarStatus) {
      pulpouBarVisivility.checked = mainBarStatus;
      pulpouBarVisivilityLabel.innerText = (!mainBarStatus) ? "Activate Pulpou" : "Deactivate Pulpou";
    });
  });
});


login.addEventListener("click", function () {

  chrome.runtime.sendMessage({
    target: 'background-login',
    action: 'LOG_IN',
    username: username.value,
    password: password.value
  }, (res) => {
    //TODO: HACER UN LOADER HASTA QUE HAYA ALGUN RESULTADO DEL LOGIN.
    console.log(res)
  });

});

logout.addEventListener("click", function () {

  chrome.runtime.sendMessage({
    target: 'background-login',
    action: 'LOG_OUT'
  }, (res) => {
    console.log(res)
  });

});

(pulpouBarVisivility && pulpouBarVisivility.addEventListener("click", function () {


  const status = (pulpouBarVisivility.checked || false) ? 'showPulpouBar' : 'hidePulpouBar';

  pulpouBarVisivilityLabel.innerText = (!pulpouBarVisivility.checked) ? "Activate Pulpou" : "Deactivate Pulpou";

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
      case 'SESSION_AVAILABLE':

        if (message.value) {
          logInForm.classList.add("hide");
          logedInWrapper.classList.remove("hide");
          info.innerHTML = `User: ${message.username}`;
        }
        else {
          logInForm.classList.remove("hide");
          logedInWrapper.classList.add("hide");
        }

        break;

      default:
        break;
    }
  }

});
