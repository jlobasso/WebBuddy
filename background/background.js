let profile = {
  availibleActions: [
    {
      name: '#HASHTAGS',
      importName: 'hashtags',
      idMenu: 'hashtag_pulpou_menu',
      idData: 'hashtag_sub_menu',
      data: [
        {
          name: '#joicobrazil',
          type: null,
          data: []
        },
        {
          name: '#autosaescala',
          type: null,
          data: []
        },
        {
          name: '#theflash',
          type: null,
          data: []
        },
        {
          name: '#spacexploration',
          type: null,
          data: []
        }
      ]
    },
    {
      name: 'SELLERS',
      importName: 'sellers',
      idMenu: 'sellers_pulpou_menu',
      idData: 'sellers_sub_menu',
      data: [{
        name: 'WHITELIST',
        type: 'table',
        data: [1, 2, 3, 4, 5]
      },
      {
        name: 'BLACKLIST',
        type: 'table',
        data: ["uno", "dos", "tres", "cuatro", "cinco"]
      }]

    },
    {
      name: 'REPORTS',
      importName: 'reports',
      idMenu: 'reports_pulpou_menu',
      idData: 'reports_sub_menu',
      data: []

    },
    {
      name: 'IMAGES',
      importName: 'images',
      idMenu: 'images_pulpou_menu',
      idData: 'images_sub_menu',
      data: []
    }
  ]
};

const sitesAvailibles = [{
  siteRegexp: ['http.:\/\/www.instagram.com.*\/*'],
  script: 'instagram'
},
{
  siteRegexp: ['http.:\/\/stackoverflow.com\/.*'],
  script: 'stackoverflow'
},
{
  siteRegexp: ['http.:\/\/www\.mercadoli[b|v]re\.com.*'],
  script: 'mercadolibre'
}];

let activeSites = new Set();


chrome.runtime.onInstalled.addListener(function () {
  profile = profile;
});

const getProfile = async () => {
  const def = await new Promise(function (resolve, reject) {
    setTimeout(() => resolve(profile), 2000);
  });

  const message = { target: 'mainContent', action: 'SEND_PROFILE', def };

  chrome.tabs.query({ url: [...activeSites.values()] }, function (tabs) {
    console.log("TABS TO NOTICE " + tabs.length)
    tabs.forEach((tab, i) => {
      chrome.tabs.sendMessage(tab.id, message);
    });
  });

  return def;
}

chrome.runtime.onMessage.addListener(async function (message, sender, sendResponse) {

  if (message.target == "back" && message.action === 'ASK_PROFILE') {
    sendResponse(findSiteAvailible(sender.tab.url).script)
    getProfile();
  }

  if (message.target == "back" && message.action === 'BAR_VISIBILITY') {
    message.target = 'mainContent';
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, message);
    });
  }

  if (message.target == "back" && message.action === 'HASHTAG_ADDED') {

    profile.availibleActions.forEach(a => {
      if (a.importName === 'hashtags') {
        //TODO: FALTA AGREGAR SITE
        sendResponse(a.data.some(h => h.name === message.value));
      }
    })

  }

  if (message.target == "back" && message.action === 'ADD_HASHTAG') {

    profile.availibleActions.forEach(a => {
      if (a.importName === 'hashtags') {
        //TODO: FALTA AGREGAR SITE
        a.data.push({
          name: message.value,
          type: null,
          data: []
        });
        sendResponse(true);
        getProfile();
      }
    })

  }

  if (message.target == "back" && message.action === 'REDIRECT_TAB') {
    message.target = 'mainContent';
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, message);
    });
  }

})

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {

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

  return (sitesAvailibles
    .find(avs => avs.siteRegexp
      .find(s => {
        let regex = new RegExp(s, "g");
        return (regex.test(siteURL));
      }
      )) || false);

}
