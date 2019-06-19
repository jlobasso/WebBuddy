import * as modules from "./subMenu/index.js";


export const drawSubMenu = (definitions, currentAvalibleSite) => {

    definitions.availibleActions.forEach(element => {
        const wrapper = document.getElementById(element.idData);
        try {
            modules.default[currentAvalibleSite][element.importName](element, wrapper);            
        } catch (error) {
            console.error(`drawSubMenu.js: Site or action does not exist -> site:${currentAvalibleSite}, action:${element.importName}`);
        }

    });

} 