async function runOCR() {
    const fileInput = document.getElementById("fileInput");
    const output = document.getElementById("output");

    const file = fileInput.files[0];
    if (!file) {
        output.innerText = "Выберите файл!";
        return;
    }

    output.innerText = "Распознаю... Подождите...";

    try {
        const { createWorker } = Tesseract;

        const worker = await createWorker({
            workerPath: 'worker.min.js',
            langPath: './tessdata',
        });

        await worker.load();
        await worker.loadLanguage('rus');
        await worker.initialize('rus');

        const result = await worker.recognize(file);

        output.innerText = result.data.text;

        await worker.terminate();
    } catch (err) {
        output.innerText = "Ошибка: " + err;
        console.error(err);
    }
}
