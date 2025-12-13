document.getElementById("fileInput").addEventListener("change", async function () {
    const file = this.files[0];
    if (!file) return;

    const output = document.getElementById("output");
    output.innerText = "Распознаю... Подождите...";

    try {
        const { createWorker } = Tesseract;

        // ВАЖНО: пути должны быть точными!!!
        const worker = await createWorker({
            workerPath: 'worker.min.js',          // лежит в корне
            corePath: 'tesseract-core.js',        // лежит в корне
            langPath: './tessdata',               // Папка где rus.traineddata
        });

        await worker.load();                     // загрузка worker.js
        await worker.loadLanguage('rus');        // загрузка языка
        await worker.initialize('rus');          // инициализация

        const result = await worker.recognize(file);

        console.log(result.data.text);
        output.innerText = result.data.text;

        await worker.terminate();
    } catch (err) {
        output.innerText = "Ошибка: " + err;
        console.error(err);
    }
});
