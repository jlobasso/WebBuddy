/* THIS SCRIPT IS EXECUTED ONCE FOR TAB*/
if (!window.contentScriptInjected) {
    var pulpouStatus = false;
    contentScriptInjected = true;
    const iframe = document.createElement('iframe');
    iframe.src = chrome.extension.getURL('./content/web-buddy-bar/pulpoNav.html');
    iframe.id = "webBuddyByPulpou"
    document.documentElement.appendChild(iframe);

    const normalHeight = 100;
    const maxHeight = 190;
    const bodyStyle = document.body.style;

    const firsHeight = (pulpouStatus) ? normalHeight : 0;

    iframe.addEventListener("load", () => {
        iframe.style.width = '101%';
        iframe.style.position = 'fixed';
        iframe.style.top = '0';
        iframe.style.left = '0';
        iframe.style.zIndex = '938089';
        iframe.style.margin = '0px';
        iframe.style.padding = '0px';
        iframe.style.border = 'none';
        moveMainIframeTo(firsHeight);
    });

    chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {

        if (message.target == "main-content") {

            switch (message.action) {

                case 'BAR_VISIBILITY':

                    if (message.value === 'hidePulpouBar') {
                        pulpouStatus = false;
                        moveMainIframeTo(0);
                    }
                    if (message.value === 'showPulpouBar') {
                        pulpouStatus = true;
                        moveMainIframeTo(normalHeight);
                    }
                    if (message.value === 'showBar') {
                        moveMainIframeTo(maxHeight);
                    }
                    if (message.value === 'hideBar') {
                        moveMainIframeTo(normalHeight);
                    }

                    if (message.value === 'showSubMenuData') {
                        const fullHeight = +maxHeight + message.data.height;
                        moveMainIframeTo(fullHeight);
                    }
                    break;

                case 'REDIRECT_TAB':
                    window.location = message.value;
                    break;

                case 'MAIN_BAR_STATE':
                    sendResponse(pulpouStatus);
                    break;

                case 'SESSION_AVAILABLE':
                    if(message.value){
                        console.log("hay que ver que hacer aca")
                    }
                    else{
                        moveMainIframeTo(0);
                        pulpouStatus = false;
                    }
                    break;

                default:
                    break;
            }

        }


    });

    const moveMainIframeTo = (height) => {
        iframe.style.height = height + 'px';
        bodyStyle.transform = 'translateY(' + height + 'px)';
    }

}







