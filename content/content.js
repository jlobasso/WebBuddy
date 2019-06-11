const iframe = document.createElement('iframe');
iframe.src = chrome.extension.getURL('./content/pulpoNav.html');
const normalHeight = "100px";
const maxHeight = "190px";
iframe.id = "webBuddyByPulpou"
iframe.style.height = normalHeight;
iframe.style.width = '101%';
iframe.style.position = 'fixed';
iframe.style.top = '0';
iframe.style.left = '0';
iframe.style.zIndex = '938089';
iframe.style.margin = '0px';
iframe.style.padding = '0px';
iframe.style.border = 'none';
document.documentElement.appendChild(iframe);
var bodyStyle = document.body.style;
var cssTransform = 'transform' in bodyStyle ? 'transform' : 'webkitTransform';
bodyStyle[cssTransform] = 'translateY(' + normalHeight + ')';


chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {

    if (message.target == "mainContent" && message.action === 'barVisibility') {

        if (message.value === 'showBar') {
            iframe.style.height = maxHeight;
            bodyStyle[cssTransform] = 'translateY(' + maxHeight + ')';
        }
        if (message.value === 'hideBar') {
            iframe.style.height = normalHeight;
            bodyStyle[cssTransform] = 'translateY(' + normalHeight + ')';
        }

        sendResponse("Main content was noticed");
    }

});



