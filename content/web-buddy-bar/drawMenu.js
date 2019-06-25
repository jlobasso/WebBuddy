import { showBar, hideBar, updateProfile } from './commonActions.js';

export const drawMenu = (profile) => {

    const menuWrapper = document.getElementsByClassName("menuWrapper")[0];
    const subMenuWrapper = document.getElementsByClassName("barSubMenuWrapper")[0];

    menuWrapper.innerHTML = "";
    updateProfile(profile);

    profile.availableActions.forEach(itemMenu => {

        if (itemMenu.hasMenu) {
            const item = document.createElement("div");
            item.id = itemMenu.idMenu;
            item.classList.add('itemMenu');
            const radio = document.createElement("span");
            radio.classList.add("radioMarker");
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

    assignActions();

}

export const assignActions = () => {

    const itemMenu = document.getElementsByClassName("itemMenu");

    [...itemMenu].forEach(item => {

        item.addEventListener("click", (e) => {

            const isActive = item.classList.contains("active");

            [...itemMenu].forEach(itm => {
                const radio = itm.getElementsByClassName("radioMarker")[0];
                radio.innerText = 'radio_button_unchecked';
                itm.classList.remove("active");
            })
            if (!isActive) {
                item.classList.add("active");
                const radio = e.target.parentElement.getElementsByClassName("radioMarker")[0];
                if (radio.innerText === 'radio_button_checked') {
                    radio.innerText = 'radio_button_unchecked';
                } else {
                    radio.innerText = 'radio_button_checked'
                }
                showBar(item.id);
            } else {
                hideBar();
            }

        })

    })

}