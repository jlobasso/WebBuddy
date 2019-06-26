import { setCommonActions } from './commonActions.js';
import { drawMenu } from './drawMenu.js'
import { drawSubMenu } from './drawSubMenu.js'

let profile = null;
let currentAvailableSite = null;
let Menu = {
    setCommonActions: setCommonActions,
    drawMenu: drawMenu,
    drawSubMenu: drawSubMenu
};


/*ASK DEFINITIONS TO BACKGROUD*/
chrome.runtime.sendMessage({ target: 'main-background', action: 'ASK_PROFILE' }, (currentUrl) => {
    currentAvailableSite = currentUrl;
    Menu.setCommonActions(currentAvailableSite);
});

/*BACKGROUND SEND DEFINITIONS*/
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {

    if (message.target === 'main-content') {
        switch (message.action) {
            case 'SEND_PROFILE':
                if (JSON.stringify(profile) !== JSON.stringify(message.profile)) {
                    profile = message.profile;
                    Menu.drawMenu(message.profile, currentAvailableSite);
                    Menu.drawSubMenu(message.profile, currentAvailableSite);
                }
                break;

            default:
                break;
        }
    }
});