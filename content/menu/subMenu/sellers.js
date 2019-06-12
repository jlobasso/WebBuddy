export const sellers = (element, wrapper) => {    

    element.data.forEach(e => {
        const div = document.createElement("div");
        div.classList.add("seller-menu");
        div.innerText = e.name;

        div.addEventListener("click",()=>{
            alert("CLICK EN TAB DE SELLERS");
        })

        wrapper.appendChild(div);
    })
}