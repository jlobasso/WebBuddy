import {setCommonActions} from './menu/commonActions.js';
import { drawMenu } from './menu/drawMenu.js'
import { drawSubMenu } from './menu/drawSubMenu.js'

let definitions = { availibleActions: [] };
let currentAvalibleSite = null;

setCommonActions();

/*SE SOLICITAN LAS DEFINICIONES AL BACKGROUD*/
chrome.runtime.sendMessage({ target: 'back', action: 'ASK_DEFINITIONS' },(currentUrl)=>{
    currentAvalibleSite = currentUrl;
});

/*EL BACKGROUND ENVIA LAS DEFINICIONES*/
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.target === 'mainContent' && message.action === 'SEND_DEFINITIONS') {
        if(JSON.stringify(definitions) !== JSON.stringify(message.def)){
            definitions =  message.def;           
            drawMenu(message.def);
            drawSubMenu(message.def, currentAvalibleSite);
        }
    }
});