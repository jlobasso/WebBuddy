import { initMenu } from './menu/initMenu.js'


const itemMenu = document.getElementsByClassName("itemMenu");
const subMenu = document.getElementsByClassName("barSubMenuWrapper")[0];
const marker = document.getElementById("marker");

/*SE SOLICITAN LAS DEFINICIONES AL BACKGROUD*/
chrome.runtime.sendMessage(
    { target: 'back', action: 'ASK_DEFINITIONS' },
    function (response) {
        console.log(response);
    }
);

/*EL BACKGROUND ENVIA LAS DEFINICIONES*/
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.target === 'mainContent' && message.action === 'SEND_DEFINITIONS') {
        // console.log(message)
        initMenu(message);
        assignActions();
    }
});


const assignActions = () => {

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


const barVisibility = {
    target: 'back',
    action: 'barVisibility',
    value: null
}

const showBar = (id) => {
    const menu = document.getElementById(id);
    const activePosition = menu.getBoundingClientRect().left - 11;
    marker.style.left = activePosition + "px";
    marker.style.display = "block";
    subMenu.style.display = "block";
    barVisibility.value = 'showBar';
    chrome.runtime.sendMessage(
        barVisibility,
        function (response) {
            console.log(response);
        }
    );
}

const hideBar = () => {
    marker.style.display = "none";
    subMenu.style.display = "none";
    barVisibility.value = 'hideBar';
    chrome.runtime.sendMessage(
        barVisibility,
        function (response) {
            console.log(response);
        }
    );
}


