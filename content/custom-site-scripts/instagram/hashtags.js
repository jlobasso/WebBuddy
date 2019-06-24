/************* DO NOT USE CONST HERE **********/
/*THIS CONTENT AND VARS COULD BE OVERWRITTEN THROUGH EXECUTION*/


if (!window.contentScriptInjected) {
    contentScriptInjected = true;
    hashtagText = null;
}

var HASHTAG_QUERY_SELECTOR = "._7UhW9.fKFbl.yUEEX.KV-D4.uL8Hv"
var iframe = document.getElementById("webBuddyByPulpou");


var hashtagElement = null;

hashtagElement = document.querySelectorAll(HASHTAG_QUERY_SELECTOR);


if (hashtagElement.length) {

    hashtagText = hashtagElement[0].innerText;
    var hashTagPosition = hashtagElement[0].getBoundingClientRect();
    var iframeHeight = document.getElementById("webBuddyByPulpou").getBoundingClientRect().height;
    var htop = hashTagPosition.top - iframeHeight;
    var hleft = hashTagPosition.left + hashTagPosition.width;

    hashtagElements = document.querySelectorAll(".web-budy-hashtag-tool-tip");
    (hashtagElements.length) ? hashtagElements.forEach(e => e.remove()) : null;


    var hashtagToolTip = document.createElement("div");
    hashtagToolTip.innerHTML = "<div class='web-budy-hashtag-simbol'>#</div><span class='web-budy-hashtag-text'></span>";
    hashtagToolTip.classList.add("web-budy-hashtag-tool-tip");
    hashtagToolTip.classList.add("web-budy-visible");
    hashtagToolTip.style.top = htop + "px";
    hashtagToolTip.style.left = hleft + "px";
    hashtagElement[0].appendChild(hashtagToolTip);
    
    
    chrome.runtime.sendMessage({ target: 'background-web-buddy-bar', action: 'HASHTAG_ADDED', site: 'instagram', value: hashtagText }, (isHashtagAdded) => {
        
        var textElement = hashtagToolTip.getElementsByClassName("web-budy-hashtag-text")[0];
        if (!isHashtagAdded) {
            hashtagToolTip.classList.add("web-budy-add-hashtag");
            textElement.innerText = "ADD HASHTAG";
            hashtagToolTip.addEventListener("click",addHashTag);
        } else {
            hashtagToolTip.classList.add("web-budy-hashtag-added");
            textElement.innerText = "HASHTAG ADDED";
            hashtagToolTip.removeEventListener('click', addHashTag);
        }
    });

    iframe.addEventListener("load", () => {

        hashtagText = hashtagElement[0].innerText;
        var hashTagPosition = hashtagElement[0].getBoundingClientRect();
        var iframeHeight = document.getElementById("webBuddyByPulpou").getBoundingClientRect().height;
        var htop = hashTagPosition.top - iframeHeight;
        var hleft = hashTagPosition.left + hashTagPosition.width;
        hashtagToolTip.style.top = htop + "px";
        hashtagToolTip.style.left = hleft + "px";

    })

}


var addHashTag = () => {

    //TODO: HACER ESTO MEJOR
    hashtagText = "#"+hashtagText.split("#")[1];

    chrome.runtime.sendMessage({ target: 'background-web-buddy-bar', action: 'ADD_HASHTAG', site: 'instagram', value: hashtagText }, (isHashtagAdded) => {


        var textElement = hashtagToolTip.getElementsByClassName("web-budy-hashtag-text")[0];
        if (!isHashtagAdded) {
            hashtagToolTip.classList.add("web-budy-add-hashtag");
            textElement.innerText = "ADD HASHTAG";
            hashtagToolTip.addEventListener("click",addHashTag);
        } else {
            hashtagToolTip.classList.add("web-budy-hashtag-added");
            textElement.innerText = "HASHTAG ADDED";
            hashtagToolTip.removeEventListener('click', addHashTag);
        }
    });
}
