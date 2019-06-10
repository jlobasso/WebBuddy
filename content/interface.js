const itemMenu = document.getElementsByClassName("itemMenu");
const subMenu = document.getElementsByClassName("barSubMenuWrapper")[0];

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
        }else{
            hideBar();
        }

    })

})

const showBar = (id) => {
    console.log(id);
    subMenu.style.visibility = "visible"
}

const hideBar = () => {
    subMenu.style.visibility = "hidden";
}