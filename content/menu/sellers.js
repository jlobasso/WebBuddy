
export const showSellers = () => {

    const hashtags = ["#joicobrazil", "#joicoBR", "#joicoImportadosBR", "#joico_BR", "#joico_brazil"];    

    hashtags.forEach(e => {

        const div = document.createElement("div");
        div.classList.add("hashtag-menu");
        div.innerText = e;
        wrapper.appendChild(div);

    })

}