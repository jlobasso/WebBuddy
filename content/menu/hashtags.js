const element = document.getElementsByClassName("barSubMenuWrapper")[0];
const wrapper = document.createElement("div");
wrapper.classList.add("menu-wrapper");
element.appendChild(wrapper);

export const clearMenu = () => {
    wrapper.innerHTML = "";
}

export const showHashtags = () => {

    const menuDefinition = "hashtag_pulpou_menu";

    if (!document.getElementById(menuDefinition)) return;

    const hashtags = ["#joicobrazil", "#joicoBR", "#joicoImportadosBR", "#joico_BR", "#joico_brazil"];    

    hashtags.forEach(e => {

        const div = document.createElement("div");
        div.classList.add("hashtag-menu");
        div.innerText = e;
        wrapper.appendChild(div);

    })

}