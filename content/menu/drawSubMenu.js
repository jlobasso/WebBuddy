import { hashtags, images, reports, sellers } from './subMenu/index.js';

export const drawSubMenu = (definitions) => {

    definitions.availibleActions.forEach(element => {
        const wrapper = document.getElementById(element.idData);
        switch (element.importName) {
            case 'hashtags':
                hashtags(element, wrapper);
                break;
            case 'images':
                images();
                break;
            case 'reports':
                reports();
                break;
            case 'sellers':
                sellers(element, wrapper);
                break;

            default:
                break;
        }
    });

} 