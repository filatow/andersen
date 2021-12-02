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
  number = number ? Number(number) : NaN;

  let base = Number(prompt('Введите основание системы счисления (целое число):'));
  base = base ? Number(base) : NaN;

  for (each of [number, base]) {
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
