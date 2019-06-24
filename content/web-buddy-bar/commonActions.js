const marker = document.getElementById("marker");
const subMenuWrapper = document.getElementsByClassName("barSubMenuWrapper")[0];
const barVisibility = {
    target: 'background-web-buddy-bar',
    action: 'BAR_VISIBILITY',
    value: null,
    data: {}
}
let defTmp = [];

export const defaultMenu = ['settings-button'];
export const subMenuContent = document.getElementsByClassName("menu-subMenu");

export const updateProfile = (newProfile) => {
    defTmp = newProfile;
}

export const getActionElement = (prop, value) => {

    return defTmp.availibleActions.reduce((a, c) => {
        if (prop in c && c[prop] === value) {
            a.push(c)
        }
        return a;
    }, []);
}

export const showBar = (id) => {

    const menu = document.getElementById(id);

    const isACommonMenu = defaultMenu.includes(id);

    const activePosition = (isACommonMenu) ? menu.getBoundingClientRect().left + 12 : menu.getBoundingClientRect().left - 11;
    const activeIdContent = (!isACommonMenu) ?
        getActionElement('idMenu', id)[0].idData :
        "main_settings_sub_menu";


    marker.style.left = activePosition + "px";
    marker.style.display = "block";
    subMenuWrapper.style.display = "block";
    barVisibility.value = 'showBar';


    [...subMenuContent].forEach(content => {
        if (content.id === activeIdContent) {
            content.classList.add("active");
        }
        else {
            content.classList.remove("active");
        }
    });

    chrome.runtime.sendMessage(barVisibility);
}

export const hideBar = () => {
    marker.style.display = "none";
    subMenuWrapper.style.display = "none";
    barVisibility.value = 'hideBar';
    chrome.runtime.sendMessage(barVisibility);
}

export const setCommonActions = () => {

    const settings = document.getElementById("settings-button");
    const thumbDown = document.getElementById("thumb-down-button");
    const sendNotices = document.getElementById("send-notices-button");
    const settingItems = document.querySelectorAll(".settings-items .custom-control-input");

    settings.addEventListener("click", () => {

        const item = document.getElementById("main_settings_sub_menu");
        const itemMenu = document.getElementsByClassName("itemMenu");

        [...itemMenu].forEach(itm => {
            const radio = itm.getElementsByClassName("radioMarker")[0];
            radio.innerText = 'radio_button_unchecked';
            itm.classList.remove("active");
        })

        const active = item.classList.contains("active");

        if (active) {
            hideBar();
            item.classList.remove("active");
        } else {
            showBar("settings-button");
            item.classList.add("active");
        }


    });

    [...settingItems].forEach(setItem => {
        setItem.addEventListener("change", (e) => {
            console.log(setItem.id);
            console.log(setItem.checked);
            alert("CAMBIAMOS EL SWITCH");
        })
    })

    thumbDown.addEventListener("click", () => {
        alert("CLICK EN THUMB DOWN")
    });

    sendNotices.addEventListener("click", () => {
        alert("CLICK EN SEND NOTICE")
    });


}
