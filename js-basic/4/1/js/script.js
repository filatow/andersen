function createDebounceFunction(cb, delay) {
  let timeoutID = null;

  return function runCallbackWithDelay() {
    if (timeoutID) {
      clearTimeout(timeoutID);
    }
    timeoutID = setTimeout(cb, delay);
  };
}

const log100 = () => console.log(100);
const debounceLog100 = createDebounceFunction(log100, 500);

debounceLog100(); // Первый запуск таймера, вывод в консоль ожидается через ~500ms

// Далее происходит перезапуск таймера приблизительно через каждые 1/3 секунды
setTimeout(debounceLog100, 333);
setTimeout(debounceLog100, 666);
setTimeout(debounceLog100, 1000);
setTimeout(debounceLog100, 1333);
setTimeout(debounceLog100, 1666);
setTimeout(debounceLog100, 2000);
setTimeout(debounceLog100, 2333);
setTimeout(debounceLog100, 2666);
/* последний перезапуск (через 3s с момента первого запуска таймера).
 * Вывод в консоль через заданное значение таймера (~500ms)
 */
setTimeout(debounceLog100, 3000);
