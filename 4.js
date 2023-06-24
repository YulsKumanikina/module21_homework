const myPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        randNum = Math.round(Math.random() * 100);
        if (randNum >= 50) {
            resolve(randNum)
        } else {
            reject(randNum)
        }
    }, 3000)
})

myPromise
    .then(randNum => {
        console.log(`Завершено успешно. Сгенерированное число — ${randNum}`)
    })
    .catch(randNum => {
        console.log(`Завершено с ошибкой. Сгенерированное число — ${randNum}`)
    })
