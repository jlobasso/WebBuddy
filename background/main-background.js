let activeSites = new Set();

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {

  if (message.target == "main-background") {

    switch (message.action) {

      case 'ASK_PROFILE':
       
        Profile.getUserProfile().then((profile)=>{
          //TODO: VER LA NECESIDAD DE ENVIAR EL PROFILE.
          chrome.tabs.sendMessage(sender.tab.id, {
            target: 'main-content',
            action: 'SEND_PROFILE',
            profile:profile 
          });
        });

        break;

      case 'REDIRECT_TAB':
        message.target = 'main-content';
        //TODO: NO ES NECESARIAMENTE LA ACTIVA, SINO EL SENDER
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
          chrome.tabs.sendMessage(tabs[0].id, message);
        });
        break;

      default:
        break;
    }

  }

  if (message.target === 'background-login') {

    switch (message.action) {
      case 'LOG_IN':

        BackgroundLogIn.logIn(message.username, message.password);

        sendResponse('LOGIN SENT');

        break;

      case 'LOG_OUT':

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

  return true;

})

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {

  // check session and profile
  BackgroundLogIn.checkSession();
  const matchSite = await BackgroundLogIn.findSiteAvailible(tab.url);

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