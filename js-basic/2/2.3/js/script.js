const myIterable = {
  from: 10,
  to: 1,
};


myIterable[Symbol.iterator] = function() {
  if (this.from && this.to) {
    if (typeof(this.from) !== 'number') {
      throw new Error('Свойство "from" - не число');
    }
    if (typeof(this.to) !== 'number') {
      throw new Error('Свойство "to" - не число');
    }
    if (this.to < this.from) {
      throw new Error('"to" не может быть меньше "from"');
    }
  } else {
    throw new Error('Отсутствует свойство "from" или "to"');
  }

  return {
    current: this.from,
    last: this.to,

    next() {
      if (this.current <= this.last) {
        return {
          done: false,
          value: this.current++
        }
      } else {
        return {done: true}
      }
    }
  }
}

for (let num of myIterable) {
  console.log(num);
}