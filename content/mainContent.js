const iframe = document.createElement('iframe');
iframe.src = chrome.extension.getURL('./content/pulpoNav.html');
const normalHeight = 100;
const maxHeight = 190;
iframe.id = "webBuddyByPulpou"
document.documentElement.appendChild(iframe);
const bodyStyle = document.body.style;

iframe.addEventListener("load", () => {
    iframe.style.height = normalHeight+'px';
    iframe.style.width = '101%';
    iframe.style.position = 'fixed';
    iframe.style.top = '0';
    iframe.style.left = '0';
    iframe.style.zIndex = '938089';
    iframe.style.margin = '0px';
    iframe.style.padding = '0px';
    iframe.style.border = 'none';
    bodyStyle.transform = 'translateY(' + normalHeight +'px )';
});



chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {

    if (message.target == "mainContent" && message.action === 'BAR_VISIBILITY') {

        if (message.value === 'showBar') {
            iframe.style.height = maxHeight +'px';
            bodyStyle.transform = 'translateY(' + maxHeight +'px)';
        }
        if (message.value === 'hideBar') {
            iframe.style.height = normalHeight +'px';
            bodyStyle.transform = 'translateY(' + normalHeight +'px)';
        }

        if (message.value === 'showSubMenuData') {
            const fullHeight = +maxHeight + message.data.height;
            iframe.style.height = fullHeight+'px';
            bodyStyle.transform = 'translateY(' + fullHeight +'px)';
        }
    }

});



