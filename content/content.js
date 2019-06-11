const iframe = document.createElement('iframe');
iframe.src = chrome.extension.getURL('./content/pulpoNav.html');
const normalHeight = "100px";
const maxHeight = "190px";
iframe.id = "webBuddyByPulpou"
document.documentElement.appendChild(iframe);
const bodyStyle = document.body.style;

iframe.addEventListener("load", () => {    
    console.log("alguna vez carga")
    iframe.style.height = normalHeight;
    iframe.style.width = '101%';
    iframe.style.position = 'fixed';
    iframe.style.top = '0';
    iframe.style.left = '0';
    iframe.style.zIndex = '938089';
    iframe.style.margin = '0px';
    iframe.style.padding = '0px';
    iframe.style.border = 'none';
    bodyStyle.transform = 'translateY(' + normalHeight + ')';
});



chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {

    if (message.target == "mainContent" && message.action === 'barVisibility') {

        if (message.value === 'showBar') {
            iframe.style.height = maxHeight;
            bodyStyle.transform = 'translateY(' + maxHeight + ')';
        }
        if (message.value === 'hideBar') {
            iframe.style.height = normalHeight;
            bodyStyle.transform = 'translateY(' + normalHeight + ')';
        }

        sendResponse("Main content was noticed");
    }

});



