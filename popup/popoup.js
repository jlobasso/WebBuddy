const login = document.getElementById("submit");
const logout = document.getElementById("logout");
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
