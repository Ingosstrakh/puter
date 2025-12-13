async function runOCR() {
    const file = document.getElementById("fileInput").files[0];
    const output = document.getElementById("output");
    output.textContent = "Распознаю...";

    const worker = await Tesseract.createWorker({
        workerPath: "worker.min.js",
        langPath: "./",
    });

    await worker.load();
    await worker.loadLanguage("rus");
    await worker.initialize("rus");

    const { data } = await worker.recognize(file);

    output.textContent = data.text;
    await worker.terminate();
}
