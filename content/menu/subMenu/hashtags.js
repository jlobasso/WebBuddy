export const hashtags = (element, wrapper) => {

    element.data.forEach(e => {
        const div = document.createElement("div");
        div.classList.add("hashtag-menu");
        div.innerText = e.name;

        div.addEventListener("click",()=>{
            alert("CLICK EN HASHTAGS");
        })

        wrapper.appendChild(div);
    })

}