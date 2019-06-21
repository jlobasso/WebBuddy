export const hashtags = (element, wrapper) => {

    wrapper.innerHTML = "";

    element.data.forEach(e => {
        const div = document.createElement("div");
        div.classList.add("hashtag-menu");
        div.innerText = e.name;

        div.addEventListener("click", () => {

            const hashtag = e.name.replace(/\#/g, "");
            const redirect = `https://www.instagram.com/explore/tags/${hashtag}/`;

            chrome.runtime.sendMessage({
                target: 'back',
                action: 'REDIRECT_TAB',
                value: redirect
            });

        })

        wrapper.appendChild(div);
    })

}