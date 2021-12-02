function convertDecimalToAny(number, base) {
  let outputDigits = [];

  while (number >= base) {
    outputDigits.push(number % base);
    number = Math.floor(number / base);
  }
  outputDigits.push(number);

  return outputDigits.reverse().join('');
}

function executeHomeTask() {
  let number = Number(prompt('Введите целое число:'));
  let base = Number(prompt('Введите целое число - основание системы счисления:'));

  for (each of [number, base]) {
    if (isNaN(each) || (each % 1 !== 0)) {
      console.log('Некорректный ввод!');
      return;
    }
  }
  
  console.log(convertDecimalToAny(number, base));
}

executeHomeTask();
