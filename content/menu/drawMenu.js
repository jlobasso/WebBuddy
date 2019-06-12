const menuWrapper = document.getElementsByClassName("menuWrapper")[0];
const subMenuWrapper = document.getElementsByClassName("barSubMenuWrapper")[0];
const subMenuContent = document.getElementsByClassName("menu-subMenu");
const marker = document.getElementById("marker");

let defTmp = [];


export const drawMenu = (definitions) => {

    menuWrapper.innerHTML = "";
    defTmp = definitions;

    definitions.availibleActions.forEach(itemMenu => {
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


const barVisibility = {
    target: 'back',
    action: 'BAR_VISIBILITY',
    value: null
}



const showBar = (id) => {
    const menu = document.getElementById(id);
    const activePosition = menu.getBoundingClientRect().left - 11;
    marker.style.left = activePosition + "px";
    marker.style.display = "block";
    subMenuWrapper.style.display = "block";
    barVisibility.value = 'showBar';

    const activeIdContent = getActionElement('idMenu', id)[0].idData;

    [...subMenuContent].forEach(content => {
        if (content.id === activeIdContent) {
            content.style.display = 'block';
        }
        else {
            content.style.display = 'none';
        }
    });

    chrome.runtime.sendMessage(
        barVisibility,
        function (response) {
            console.log(response);
        }
    );
}

const hideBar = () => {
    marker.style.display = "none";
    subMenuWrapper.style.display = "none";
    barVisibility.value = 'hideBar';
    chrome.runtime.sendMessage(
        barVisibility,
        function (response) {
            console.log(response);
        }
    );
}


const getActionElement = (prop, value) => {
    
    return defTmp.availibleActions.reduce((a, c) => {
        if (prop in c && c[prop] === value) {
            a.push(c)
        }
        return a;
    }, [])
}


