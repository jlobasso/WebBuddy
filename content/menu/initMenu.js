
const menuWrapper = document.getElementsByClassName("menuWrapper")[0];
const subMenuWrapper = document.getElementsByClassName("barSubMenuWrapper")[0];


export const initMenu = (definitions) => {



    definitions.def.availibleActions.forEach(itemMenu => {
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
        subMenu.style.display = 'none';
        subMenu.classList.add("menu-subMenu");
        subMenuWrapper.appendChild(subMenu);

    })

}


