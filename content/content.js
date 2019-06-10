const iframe = document.createElement('iframe');
iframe.src = chrome.extension.getURL('./content/pulpoNav.html');
const height = "190px";
iframe.style.height = height;
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
bodyStyle[cssTransform] = 'translateY(' + height + ')';
console.log(chrome.i18n.getMessage("pulpoNavHashtags"))



