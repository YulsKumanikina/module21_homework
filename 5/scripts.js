function changeUrl(url, id) {
    return url + `/users/${id}/todos`
}

async function sendRequest(url) {
    const response = await fetch(url);
    return response.json();
}

function refreshList(list, array) {
    while (list.querySelector('li')) {
        list.removeChild(document.querySelector('li'));
    }

    for (let i = 0; i < array.length; i++) {
        item = document.createElement('li');
        list.appendChild(item);

        itemTitle = document.createElement('span');
        itemTitle.textContent = array[i].title;
        item.appendChild(itemTitle);

        if (array[i].completed) {
            itemTitle.classList.add('completed');
        }
    }
}

const requestUrl = "https://jsonplaceholder.typicode.com";
const id = document.querySelector('.input-id');
const list = document.querySelector('.todo-list');

document.querySelector('.btn-request').addEventListener('click', async () => {
    try {
        const url = changeUrl(requestUrl, id.value);
        let result = await sendRequest(url);
        
        if (result.length <= 0) {
            throw new Error("Пользователь с указанным id не найден");
        }
        
        refreshList(list, result);
    } catch (error) {
        console.error(error);
    }
})