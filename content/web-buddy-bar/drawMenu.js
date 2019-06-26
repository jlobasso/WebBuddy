import { showBar, hideBar, updateProfile } from './commonActions.js';

const Submenu = {
    showBar:showBar,
    hideBar:hideBar
};

export const drawMenu = (profile, currentAvailableSite) => {

    const menuWrapper = document.getElementsByClassName("menuWrapper")[0];
    const subMenuWrapper = document.getElementsByClassName("barSubMenuWrapper")[0];

    menuWrapper.innerHTML = "";
    updateProfile(profile);

    profile.sites.forEach(site => {
        if (site.script === currentAvailableSite) {
            site.availableActions.forEach(itemMenu => {
                if (itemMenu.hasMenu) {
                    const item = document.createElement("div");
                    item.id = itemMenu.idMenu;
                    item.classList.add('itemMenu');
                    assignActions(item);
                    const radio = document.createElement("span");
                    radio.classList.add("radio-marker");
                    radio.classList.add("material-icons");
                    radio.innerText = 'radio_button_unchecked';
                    const name = document.createElement("span");
                    name.innerText = itemMenu.name;
                    item.appendChild(radio);
                    item.appendChild(name);
                    menuWrapper.appendChild(item);

                    const subMenu = document.createElement("div");
                    subMenu.id = itemMenu.idData;
                    // subMenu.style.display = 'none';
                    subMenu.classList.add("menu-subMenu");
                    subMenuWrapper.appendChild(subMenu);
                }
            })
        }
    })

}

const assignActions = (item) => {


    item.addEventListener("click", (e) => {

        const isActive = item.classList.contains("active");
        const itemsMenu = document.getElementsByClassName("itemMenu");
        const id = item.id;

        [...itemsMenu].forEach(itm => {
            const radio = itm.getElementsByClassName("radio-marker")[0];
            radio.innerText = 'radio_button_unchecked';
            itm.classList.remove("active");
        })
        if (!isActive) {
            item.classList.add("active");
            const radio = document.getElementById(id).getElementsByClassName("radio-marker")[0];
            if (radio.innerText === 'radio_button_checked') {
                radio.innerText = 'radio_button_unchecked';
            } else {
                radio.innerText = 'radio_button_checked'
            }
            Submenu.showBar(item.id);
        } else {
            Submenu.hideBar();
        }

    });

}