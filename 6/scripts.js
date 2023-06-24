const apiUrl = "https://picsum.photos/v2/list"

function pageLoaded() {
    const page = document.querySelector(".input-page");
    const limit = document.querySelector(".input-limit");
    const list = document.querySelector(".img-list");
    const btn = document.querySelector(".btn-request");

    function formatUrl() {
        let url = new URL(apiUrl);
        url.searchParams.set("page", page.value);
        url.searchParams.set("limit", limit.value);
        return url
    }

    async function sendRequest() {
        let response = await fetch(formatUrl());
        return response.json();
    }

    async function saveImg() {
        let request = await sendRequest();
        imgArr = [];

        for (let i = 0; i < request.length; i++) {
            imgArr.push(request[i]);
        }

        localStorage.setItem("images", JSON.stringify(imgArr));
    }


    function refreshList(del = true) {
        if (del) {
            while (list.querySelector("li")) {
                list.removeChild(document.querySelector("li"));
            }
        }
        
        let array = JSON.parse(localStorage.getItem("images"));
        for (let i = 0; i < array.length; i++) {
            let item = document.createElement("li");
            let img = document.createElement("img");

            img.style.width = `${array[i].width / 10}px`;
            img.style.height = `${array[i].height / 10}px`;
            img.style.backgroundImage = `url(${array[i].download_url})`;
            img.style.backgroundRepeat = "no-repeat";
            img.style.backgroundSize = "contain";
            img.style.backgroundPosition = "center";

            list.appendChild(item);
            item.appendChild(img);
        }
    }

    function validateInput() {
        let validated = false;
        const errorMessage = document.querySelector(".error-message");
        errorMessage.style.display = "none";
        
        try {
            pageOverflow = Number(page.value) < 1 || Number(page.value) > 10;
            limitOverflow = Number(limit.value) < 1 || Number(limit.value) > 10;
            pageIsNaN = isNaN(Number(page.value));
            limitIsNaN = isNaN(Number(limit.value));

            if ((pageOverflow && limitOverflow) || (pageIsNaN && limitIsNaN)) {
                throw new Error("Номер страницы и лимит вне диапазона от 1 до 10");
            }
            else if (pageOverflow || pageIsNaN) {
                throw new Error("Номер страницы вне диапазона от 1 до 10");
            }
            else if (limitOverflow || limitIsNaN) {
                throw new Error("Лимит вне диапазона от 1 до 10");
            }

            validated = true
        } catch (error) {
            errorMessage.style.display = "block";
            errorMessage.textContent = error.message;
            console.error(error);
        } finally {
            return validated
        }
    }

    window.onload = () => {
        refreshList(false);
    }

    btn.addEventListener("click", async () => {
        if (validateInput()) {
            await saveImg();
            refreshList();
        }
    })
}

document.addEventListener("DOMContentLoaded", () => {
    pageLoaded();
});