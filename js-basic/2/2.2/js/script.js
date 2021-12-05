function selectFromInterval(originalArray, border1, border2) {
  function checkArray(arr) {
    if (Array.isArray(arr)) {
      arr.forEach((elem) => {
        if (typeof(elem) === 'number') {
          return;
        }
        throw new Error('Массив содержит нечисловые значения');
      });

      return;
    }
    
    throw new Error('Первый параметр должен быть массивом');
  }

  function checkBorders(border1, border2) {
    if (typeof(border1) !== 'number') {
      throw new Error('Первая граница интервала не является валидным числом');
    }
    if (typeof(border2) !== 'number') {
      throw new Error('Вторая граница интервала не является валидным числом');
    }
  }

  checkArray(originalArray);
  checkBorders(border1, border2);

  let [startIndex, endIndex] = border1 < border2
    ? [border1 - 1, border2]
    : [border2 - 1, border1];
  [startIndex, endIndex] = [startIndex, endIndex].map((value) => value < 0 ? 0 : value);
  
  return originalArray.slice(startIndex, endIndex);
}