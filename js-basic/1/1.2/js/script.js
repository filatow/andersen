function getCheckedNumber(number) {
  number = number ? Number(number) : NaN;
  if (isNaN(number) || (number % 1 !== 0)) {
    throw new Error('Некорректный ввод!');
  }

  return number;
}

function executeHomeTask() {
  try {
    let n1 = prompt('Введите первое целое число:');
    n1 = getCheckedNumber(n1);
    let n2 = prompt('Введите второе целое число:');
    n2 = getCheckedNumber(n2);
    console.log(`Ответ: ${n1 + n2}, ${n1 / n2}`);
  } catch (error) {
    console.log(error.message);
  }
}

executeHomeTask();
