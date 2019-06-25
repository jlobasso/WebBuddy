/* THIS SCRIPT IS EXECUTED ONCE FOR TAB*/
if (!window.contentScriptInjected) {
    var mainBarState = false;
    contentScriptInjected = true;
    const iframe = document.createElement('iframe');
    iframe.src = chrome.extension.getURL('./content/web-buddy-bar/pulpoNav.html');
    iframe.id = "webBuddyByPulpou"
    document.documentElement.appendChild(iframe);

    const normalHeight = 100;
    const maxHeight = 190;
    const bodyStyle = document.body.style;

    const firsHeight = (mainBarState)?normalHeight:0;

    iframe.addEventListener("load", () => {
        iframe.style.height = firsHeight + 'px';
        iframe.style.width = '101%';
        iframe.style.position = 'fixed';
        iframe.style.top = '0';
        iframe.style.left = '0';
        iframe.style.zIndex = '938089';
        iframe.style.margin = '0px';
        iframe.style.padding = '0px';
        iframe.style.border = 'none';
        bodyStyle.transform = 'translateY(' + firsHeight + 'px )';
    });

    chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {

        if (message.target == "main-content") {

            switch (message.action) {

                case 'BAR_VISIBILITY':

                    if (message.value === 'hidePulpouBar') {
                        mainBarState = false;
                        iframe.style.backgroundColor = 'red';
                        iframe.style.height = 0 + 'px';
                        bodyStyle.transform = 'translateY(' + 0 + 'px)';
                    }
                    if (message.value === 'showPulpouBar') {
                        mainBarState = true;
                        iframe.style.height = normalHeight + 'px';
                        bodyStyle.transform = 'translateY(' + normalHeight + 'px)';
                    }
                    if (message.value === 'showBar') {
                        iframe.style.height = maxHeight + 'px';
                        bodyStyle.transform = 'translateY(' + maxHeight + 'px)';
                    }
                    if (message.value === 'hideBar') {
                        iframe.style.height = normalHeight + 'px';
                        bodyStyle.transform = 'translateY(' + normalHeight + 'px)';
                    }

                    if (message.value === 'showSubMenuData') {
                        const fullHeight = +maxHeight + message.data.height;
                        iframe.style.height = fullHeight + 'px';
                        bodyStyle.transform = 'translateY(' + fullHeight + 'px)';
                    }
                    break;

                case 'REDIRECT_TAB':
                    window.location = message.value;

                case 'MAIN_BAR_STATE':
                    sendResponse(mainBarState);

                default:
                    break;
            }

        }


    });

}







