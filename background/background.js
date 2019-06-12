let definitions = {
  availibleActions: [
    {
      name: '#HASHTAGS',
      importName: 'hashtags',
      idMenu: 'hashtag_pulpou_menu',
      idData: 'hashtag_sub_menu',
      data: ["#joicobrazil", "#joicoBR", "#joicoImportadosBR", "#joico_BR", "#joico_brazil"]
    },
    {
      name: 'SELLERS',
      importName: 'sellers',
      idMenu: 'sellers_pulpou_menu',
      idData: 'sellers_sub_menu',
      data: [{ name: 'WHITELIST', data: [] }, { name: 'BLACKLIST', data: [] }]

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

chrome.runtime.onInstalled.addListener(function () {
  definitions = definitions;
});




chrome.runtime.onMessage.addListener(async function (message, sender, sendResponse) {

  if (message.target == "back" && message.action === 'ASK_DEFINITIONS') {
    getDefinitions();
    sendResponse("DEFINITIONS ASKED BY CONTENT");
  }

  if (message.target == "back" && message.action === 'barVisibility') {
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




/*EJEMPLO MENSAJE A TODOS LOS TABS*/
// chrome.tabs.query({}, function (tabs) {
//   var message = { foo: bar };
//   for (var i = 0; i < tabs.length; ++i) {
//     chrome.tabs.sendMessage(tabs[i].id, message);
//   }

// });


