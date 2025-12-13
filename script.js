async function runOCR(){
 const file=document.getElementById('fileInput').files[0];
 if(!file){document.getElementById('output').innerText='Выберите файл';return;}
 document.getElementById('output').innerText='Распознаю...';
 const { createWorker } = Tesseract;
 const worker = await createWorker({
   workerPath: 'worker.min.js',
   langPath: './tessdata',
 });
 await worker.load();
 await worker.loadLanguage('rus');
 await worker.initialize('rus');
 const result=await worker.recognize(file);
 document.getElementById('output').innerText=result.data.text;
 await worker.terminate();
}