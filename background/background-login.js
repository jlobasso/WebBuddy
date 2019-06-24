

chrome.runtime.onInstalled.addListener(function () {
    var rule = {
        conditions: [
            new chrome.declarativeContent.PageStateMatcher({
                pageUrl: { hostEquals: 'www.instagram.com' }
            }),
            new chrome.declarativeContent.PageStateMatcher({
                pageUrl: { hostEquals: 'www.mercadolibre.com.ar' }
            })
        ],
        actions: [new chrome.declarativeContent.ShowPageAction()]

    };
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
        chrome.declarativeContent.onPageChanged.addRules([rule]);
    });
});

/*TODO: HACER EL LOGIN Y GUARDAR PROFILE EN LOCAL STORAGE*/
/*TODO: REVISAR SESSION? */


chrome.runtime.onMessage.addListener(async function (message, sender, sendResponse) {

    if (message.target === 'background-login') {

        switch (message.action) {
            case 'LOGIN':
                sendResponse('LOGIN ENVIADO')
                fetch('http://localhost:3000/get-menu')
                    .then(function (response) {
                        return response.json();
                    })

                    .then(function (myJson) {
                        console.log(myJson);
                    });

                break;

            default:
                break;
        }

    }

});