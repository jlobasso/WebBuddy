export const sellers = (element, wrapper) => {

    const dataSubMenuWrapper = document.getElementsByClassName("dataSubMenuWrapper")[0];

    element.data.forEach(e => {
        const div = document.createElement("div");
        div.classList.add("seller-menu");
        div.innerText = e.name;

        const contentSubMenu = document.createElement("div");
        contentSubMenu.classList.add("content-sub-menu");
        contentSubMenu.id = e.name + "_" + e.type;
        contentSubMenu.innerText = e.data.toString();
        dataSubMenuWrapper.appendChild(contentSubMenu);

        div.addEventListener("click", () => {

            [...document.getElementsByClassName("seller-menu")].forEach(item => {
                item.classList.remove("active");
            });

            [...document.getElementsByClassName("content-sub-menu")].forEach(data=>{
                data.classList.remove("active");
            });

            contentSubMenu.classList.add("active");

            div.classList.add("active");
            dataSubMenuWrapper.style.display = 'block';
            chrome.runtime.sendMessage(
                {
                    target: 'back',
                    action: 'BAR_VISIBILITY',
                    value: 'showSubMenuData',
                    data: { height: dataSubMenuWrapper.offsetHeight }
                },
                function (response) {
                    console.log(response);
                }
            );
        })

        wrapper.appendChild(div);
    })
}