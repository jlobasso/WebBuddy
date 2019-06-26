import * as modules from "./subMenu/index.js";


export const drawSubMenu = (profile, currentAvailableSite) => {

    profile.sites.forEach(site => {
        if (site.script === currentAvailableSite) {

            site.availableActions.forEach(element => {
                if (element.hasMenu) {
                    const wrapper = document.getElementById(element.idData);
                    try {
                        modules.default[currentAvailableSite][element.importName](element, wrapper);
                    } catch (error) {
                        console.error(`drawSubMenu.js: Site or action does not exist -> site:${currentAvailableSite}, action:${element.importName}`);
                    }
                }

            });
        }
    });
}