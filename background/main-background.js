let activeSites = new Set();

chrome.runtime.onMessage.addListener(async function (message, sender, sendResponse) {

  if (message.target == "main-background") {

    switch (message.action) {

      case 'ASK_PROFILE':
        sendResponse(findSiteAvailible(sender.tab.url).script)
        getUserProfile();
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

})

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {

  //Nos fijamos si esta logueado y/o si es valida la session

  //TODO: El login mismo se deberia encargar de quitar todo
  BackgroundLogIn.checkSession();

  const match = findSiteAvailible(tab.url);

  if (changeInfo.status == 'complete' && match) {

    activeSites.add(tab.url);

    chrome.tabs.executeScript(tabId, { file: 'content/mainContent.js' }, () => {


      profile.availibleActions.forEach(action => {

        chrome.tabs.executeScript(tabId, { file: `content/custom-site-scripts/${match.script}/${action.importName}.js` });
        chrome.tabs.insertCSS(tabId, { file: `content/custom-site-scripts/${match.script}/web-buddy-styles-${action.importName}.css` });

      })

    });

  }

});


const findSiteAvailible = (siteURL) => {

  const sitesAvailibles =  (Profile.getSitesAvailibles() || []);

  console.log(sitesAvailibles);

    return (sitesAvailibles
      .find(avs => avs.siteRegexp
        .find(s => {
          let regex = new RegExp(s, "g");
          return (regex.test(siteURL));
        }
        )) || false);  


}
