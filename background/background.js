let definitions = {
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
          name: '#joicoBR',
          type: null,
          data: []
        },
        {
          name: '#joicoImportadosBR',
          type: null,
          data: []
        },
        {
          name: '#joico_BR',
          type: null,
          data: []
        },
        {
          name: '#joico_brazil',
          type: null,
          data: []
        }]
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
  definitions = definitions;
});

const getDefinitions = async () => {
  const def = await new Promise(function (resolve, reject) {
    setTimeout(() => resolve(definitions), 2000);
  });

  const message = { target: 'mainContent', action: 'SEND_DEFINITIONS', def };

  chrome.tabs.query({ url: [...activeSites.values()] }, function (tabs) {
    console.log("TABS TO NOTICE " + tabs.length)
    tabs.forEach((tab, i) => {
      chrome.tabs.sendMessage(tab.id, message);
    });
  });

  return def;
}

chrome.runtime.onMessage.addListener(async function (message, sender, sendResponse) {

  if (message.target == "back" && message.action === 'ASK_DEFINITIONS') {
    getDefinitions();
  }

  if (message.target == "back" && message.action === 'BAR_VISIBILITY') {
    message.target = 'mainContent';
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, message);
    });
  }

  if (message.target == "back" && message.action === 'HASHTAG_ADDED') {

    definitions.availibleActions.forEach(a => {
      if (a.importName === 'hashtags') {
        //TODO: FALTA AGREGAR SITE
        sendResponse(a.data.some(h => h.name === message.value));
      }
    })

  }

  if (message.target == "back" && message.action === 'ADD_HASHTAG') {

    definitions.availibleActions.forEach(a => {
      if (a.importName === 'hashtags') {
        //TODO: FALTA AGREGAR SITE
        a.data.push({
          name: message.value,
          type: null,
          data: []
        });
        sendResponse(true);
        getDefinitions();
      }
    })

  }

})

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {

  const match = (sitesAvailibles
    .find(avs => avs.siteRegexp
      .find(s => {
        let regex = new RegExp(s, "g");
        return regex.test(tab.url);
      }
      )) || false);


  if (changeInfo.status == 'complete' && match) {

    activeSites.add(tab.url);

    chrome.tabs.executeScript(tabId, { file: 'content/mainContent.js' }, () => {
      chrome.tabs.executeScript(tabId, { file: `content/customSitesScripts/${match.script}/content.js` });
      chrome.tabs.insertCSS(tabId, { file: `content/customSitesScripts/${match.script}/webBuddyStyles.css` });
    });

  }

});


