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
  let number = prompt('Введите целое число:');
  let base = prompt('Введите основание системы счисления (целое число):');

  for (each of [number, base]) {
    each = each ? Number(each) : NaN;
    if (isNaN(each) || (each % 1 !== 0)) {
      console.log('Некорректный ввод!');
      return;
    }
  }

  if (base < 2) {
    console.log('Некорректный ввод! Основание системы счисления не может быть меньше 2');
    return;
  }
  
  console.log(convertDecimalToAny(number, base));
}

executeHomeTask();
