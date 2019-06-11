const availibleMenu = ['hashtags', 'sellers', 'reports', 'images'];

const barSubMenuWrapper = document.getElementsByClassName("barSubMenuWrapper")[0];


const initMenu = () => {

    availibleMenu.forEach((m => {
        const wrapper = document.createElement("div");
        wrapper.id = m + "_sub_menu";
        wrapper.style.display = 'none';
        wrapper.classList.add("menu-wrapper");
        barSubMenuWrapper.appendChild(wrapper);
    }));

}


