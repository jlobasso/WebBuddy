import {setCommonActions} from './commonActions.js';
import { drawMenu } from './drawMenu.js'
import { drawSubMenu } from './drawSubMenu.js'

let profile = { availibleActions: [] };
let currentAvalibleSite = null;

setCommonActions();

/*SE SOLICITAN LAS DEFINICIONES AL BACKGROUD*/
chrome.runtime.sendMessage({ target: 'main-background', action: 'ASK_PROFILE' },(currentUrl)=>{
    currentAvalibleSite = currentUrl;
});

/*EL BACKGROUND ENVIA LAS DEFINICIONES*/
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.target === 'mainContent' && message.action === 'SEND_PROFILE') {
        if(JSON.stringify(profile) !== JSON.stringify(message.def)){
            profile =  message.def;           
            drawMenu(message.def);
            drawSubMenu(message.def, currentAvalibleSite);
        }
    }
});