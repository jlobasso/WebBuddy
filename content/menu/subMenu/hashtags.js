export const hashtags = (element, wrapper) => {

    wrapper.innerHTML = "";

    element.data.forEach(e => {
        const div = document.createElement("div");
        div.classList.add("hashtag-menu");
        div.innerText = e.name;

        div.addEventListener("click",()=>{
            //TODO: ESTO SOLO FUNCIONA PARA INSTAGRAM, VER DE TRAELO DE DEFINITIONS
            //TODO: ENVIAR MENSAJE A CONTENT O MAIN CONTENT PARA QUE EL REDIRIJA.
            var hashtag = e.name.replace(/\#/g,"");
            window.location.href = `https://www.instagram.com/explore/tags/${hashtag}/`;
        })

        wrapper.appendChild(div);
    })

}