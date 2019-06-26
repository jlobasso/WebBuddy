let activeSites = new Set();

chrome.runtime.onMessage.addListener(async function (message, sender, sendResponse) {

  if (message.target == "main-background") {

    switch (message.action) {

      case 'ASK_PROFILE':
        sendResponse(BackgroundLogIn.findSiteAvailible(sender.tab.url).script);
        chrome.tabs.sendMessage(sender.tab.id, {
          target: 'main-content',
          action: 'SEND_PROFILE',
          profile: Profile.getUserProfile()
        });
        break;

      case 'REDIRECT_TAB':
        message.target = 'main-content';
        //TODO: NO ES NECESARIAMENTE LA ACTIVA, SINO EL SENDER
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
          chrome.tabs.sendMessage(tabs[0].id, message);
        });

      default:
        break;
    }

  }

  if (message.target === 'background-login') {

    switch (message.action) {
      case 'LOGIN':

        BackgroundLogIn.logIn(message.username, message.password);

        sendResponse('LOGIN SENT');

        break;

      case 'LOGOUT':

        BackgroundLogIn.logOut();

        sendResponse('LOGOUT SENT');

        break;

      case 'CHECK_SESSION':

        BackgroundLogIn.checkSession();

        break;

      default:
        break;
    }

  }

})

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {

  // check session and profile
  BackgroundLogIn.checkSession();
  const profile = Profile.getUserProfile();
  const matchSite = (profile) ? BackgroundLogIn.findSiteAvailible(tab.url) : false;

  // available site
  if ((changeInfo.status == 'complete' && matchSite)) {

    activeSites.add(tab.url);

    chrome.tabs.executeScript(tabId, { file: 'content/mainContent.js' }, () => {

      matchSite.availableActions.forEach(action => {

        chrome.tabs.executeScript(tabId, { file: `content/custom-site-scripts/${matchSite.script}/${action.importName}.js` }, function () {
          if (chrome.extension.lastError) {
            console.warn(`We don't have ${action.importName}.js action defined`)
          }
        });

        chrome.tabs.insertCSS(tabId, { file: `content/custom-site-scripts/${matchSite.script}/web-buddy-styles-${action.importName}.css` }, function () {
          if (chrome.extension.lastError) {
            console.warn(`We don't have ${action.importName}.css styles defined`)
          }
        });

      })

    });

  }

});