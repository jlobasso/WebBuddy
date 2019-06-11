let definitions = {
  availibleActions: [
    {
      hashtags: {
        name: 'hashtag',
        idMenu: 'hashtag_pulpou_menu',
        idData: 'hashtag_sub_menu',
        data: ["#joicobrazil", "#joicoBR", "#joicoImportadosBR", "#joico_BR", "#joico_brazil"]
      }
    },
    {
      sellers: {
        name: 'sellers',
        idMenu: 'sellers_pulpou_menu',
        idData: 'sellers_sub_menu',
        data: []
      }
    },
    {
      reports: {
        name: 'reports',
        idMenu: 'reports_pulpou_menu',
        idData: 'reports_sub_menu',
        data: []
      }
    },
    {
      images: {
        name: 'images',
        idMenu: 'images_pulpou_menu',
        idData: 'images_sub_menu',
        data: []
      }
    }
  ]
}

const getDefinitions = async () => {
  const def = await new Promise(function (resolve, reject) {
    setTimeout(() => resolve(definitions), 2000);
  });

  // const message = { target: 'mainContent', action: 'GOT_DEFINITIONS', def };

  // chrome.tabs.query({}, function (tabs) {
  //   tabs.forEach(tab => {
  //     chrome.tabs.sendMessage(tab.id, message, function (response) {
  //       console.log("DEFINITION_SENT");
  //       console.log(def);
  //     });
  //   });
  // });

  return def;
}

chrome.runtime.onInstalled.addListener(function () {
  definitions = definitions;
});




chrome.runtime.onMessage.addListener(async function (message, sender, sendResponse) {

  if (message.target == "back" && message.action === 'GET_DEFINITIONS') {
    const def = await getDefinitions();
    sendResponse(def);
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


