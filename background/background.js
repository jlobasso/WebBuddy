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
}

chrome.runtime.onInstalled.addListener(function () {
  definitions = definitions;
});

const getDefinitions = async () => {
  const def = await new Promise(function (resolve, reject) {
    setTimeout(() => resolve(definitions), 2000);
  });

  const message = { target: 'mainContent', action: 'SEND_DEFINITIONS', def };

  chrome.tabs.query({}, function (tabs) {
    tabs.forEach(tab => {
      chrome.tabs.sendMessage(tab.id, message, function (response) {
        console.log("DEFINITION SENT");
      });
    });
  });

  return def;
}

chrome.runtime.onMessage.addListener(async function (message, sender, sendResponse) {

  if (message.target == "back" && message.action === 'ASK_DEFINITIONS') {
    getDefinitions();
    sendResponse("DEFINITIONS ASKED BY CONTENT");
  }

  if (message.target == "back" && message.action === 'BAR_VISIBILITY') {
    message.target = 'mainContent';
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, message, function (response) {
        console.log("background sent message to main content");
        console.log(response);
      });
    });
    sendResponse("background noticed: " + message.value)
  }
})

const sitesAvailibles = [{
  site: ['https://www.instagram.com', 'http://www.instagram.com'],
  script: 'instagram'
},
{
  site: ['https://stackoverflow.com'],
  script: 'stackoverflow'
},
{
  site: ['https://www.mercadolibre.com.ar/', 'https://www.mercadolivre.com'],
  script: 'mercadolibre'
}];

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {

  const match = (sitesAvailibles
    .find(avs => avs.site
      .find(s => tab.url.includes(s))) || false);


  if (changeInfo.status == 'complete' && match) {

    chrome.tabs.executeScript(tabId, { file: 'content/mainContent.js' }, () => {
      chrome.tabs.executeScript(tabId, { file: `content/customSitesScripts/${match.script}/content.js` }, () => {
        console.log("AGREGAMOS SCRIPT ESPECIFICO");
      });
    });

  }

});


