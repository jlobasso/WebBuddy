let activeSites = new Set();

chrome.runtime.onMessage.addListener(async function (message, sender, sendResponse) {

  if (message.target == "main-background") {

    switch (message.action) {

      case 'ASK_PROFILE':
        sendResponse(findSiteAvailible(sender.tab.url).script)
        Profile.getUserProfile();
        break;

      case 'REDIRECT_TAB':
        message.target = 'main-content';
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
  let matchSite = false;

  // we are not loged in
  if (!profile) {
    chrome.browserAction.setPopup({
      tabId: tabId,
      popup: 'popup/popup.html'
    });
    // chrome.browserAction.setIcon({tabId: tabId,path:{"16":"popup/images/get_pulpou16.png"}});
  }
  else {
    // check if the site is availible if any
    matchSite = findSiteAvailible(tab.url);
  }


  // we are in an availible site
  if ((changeInfo.status == 'complete' && matchSite)) {

    activeSites.add(tab.url);

    chrome.tabs.executeScript(tabId, { file: 'content/mainContent.js' }, () => {

      matchSite.availibleActions.forEach(action => {

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
  else {
    chrome.browserAction.setPopup({
      tabId: tabId,
      popup: ''
    });
    // chrome.browserAction.setIcon({tabId: tabId, path:{"16":"popup/images/pulpou_disabled.png"}});
  }

});


const findSiteAvailible = (siteURL) => {

  if (!Profile.getUserProfile()) return false;

  const sitesAvailibles = (Profile.getUserProfile().sites || []);

  return (sitesAvailibles
    .find(avs => avs.siteRegexp
      .find(s => {
        let regex = new RegExp(s, "g");
        return (regex.test(siteURL));
      }
      )) || false);


}
