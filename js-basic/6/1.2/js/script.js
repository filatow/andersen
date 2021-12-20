{
  button.addEventListener('click', () => {
    Promise.resolve().then(() => console.log('Microtask 1'));
    console.log('Listener 1');
  });

  button.addEventListener('click', () => {
    Promise.resolve().then(() => console.log('Microtask 2'));
    console.log('Listener 2');
  });
  
  button.click();
}

/* Предполагал, что вывод будет аналогичным прошлому заданию. То есть таким:
  -> "Listener 1";
  -> "Microtask 1";
  -> "Listener 2";
  -> "Microtask 2";

  Но проверил и обнаружил, что вывод отличается:
  -> "Listener 1";
  -> "Listener 2";
  -> "Microtask 1";
  -> "Microtask 2";

  Достоверно сказать не могу, почему работает именно так.
  Предполагаю, что дело во внутренних оптимизациях браузерного движка,
  который для функции, имитирующей клик на элементе (button.click),
  объединил 2 обработчика события клика в одну макрозадачу.
  Таким образом, сначала сработают синхронные вызовы console.log:
  -> "Listener 1";
  -> "Listener 2";
  А затем придёт очередь микрозадач в порядке описания в коде:
  -> "Microtask 1";
  -> "Microtask 2";
*/