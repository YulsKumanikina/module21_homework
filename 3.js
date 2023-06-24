if (localStorage.getItem("newUser") === "false") {
    console.log(`Добрый день, ${localStorage.getItem("username")} Давно не виделись. В последний раз вы были у нас ${localStorage.getItem("date")}`);
} else {
    username = prompt("Введите имя");

    if (username) {
        localStorage.setItem("newUser", "false")
        localStorage.setItem("username", username)
    }
    
}

let options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timezone: 'UTC',
    hour: 'numeric',
    minute: 'numeric',
};

let dateLocale = new Date().toLocaleString("ru", options)

localStorage.setItem("date", dateLocale)