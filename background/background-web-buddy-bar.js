chrome.runtime.onMessage.addListener(async function (message, sender, sendResponse) {

    if (message.target == "background-web-buddy-bar") {

        switch (message.action) {

            case 'BAR_VISIBILITY':
                message.target = 'main-content';
                chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                    chrome.tabs.sendMessage(tabs[0].id, message);
                });
                break;

            case 'HASHTAG_ADDED':
                profile.availableActions.forEach(a => {
                    if (a.importName === 'hashtags') {
                        //TODO: FALTA AGREGAR SITE
                        sendResponse(a.data.some(h => h.name === message.value));
                    }
                });
                break;

            case 'ADD_HASHTAG':
                profile.availableActions.forEach(a => {
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
                });
                break;

            default:
                break;
        }
    }
})