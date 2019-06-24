const logInForm = document.getElementsByClassName("log-in-form")[0];
const logedInWrapper = document.getElementsByClassName("loged-in")[0];
const info = logedInWrapper.getElementsByClassName("titles")[0];
const username = document.getElementById("username");
const password = document.getElementById("password");



//chequeamos si existe una session activa
chrome.runtime.sendMessage({
  target: 'background-login',
  action: 'CHECK_SESSION'
});


document.getElementById("submit").addEventListener("click", function () {

  chrome.runtime.sendMessage({
    target: 'background-login',
    action: 'LOGIN',
    username: username.value,
    password: password.value
  }, (res) => {
    console.log(res)
  });

});

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
          console.log(message);
          info.innerHTML = message.username;
        }

        break;

      default:
        break;
    }
  }

});
