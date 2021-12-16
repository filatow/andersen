const myFilter = function(filterFunc) {
  const filteredArray = [];
  for (let elem of this) {
    if (filterFunc(elem)) {
      filteredArray.push(elem);
    }
  }

  return filteredArray;
}

Array.prototype.myFilter = myFilter;


const testArray = [1, 2, 3, 6, 7, 8, 9, 1, 6];
const result = testArray.myFilter((elem) => elem % 3 === 0);
console.log(result); // [3, 6, 9, 6]
