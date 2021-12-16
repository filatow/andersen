class Stack {
  constructor(max = 10) {
    if (!Number.isInteger(max) || max < 1) {
      throw new Error('Невалидное значение параметра');
    }

    Object.defineProperties(this, {
      max: {
        value: max,
      },
      count: {
        value: 0,
        writable: true,
      },
      storage: {
        value: {},
        enumerable: true,
      }
    })
  }

  push(elem) {
    if (this.count === this.max) {
      throw new Error('Стек заполнен. Не удалось добавить новый элемент');
    }

    this.storage[this.count] = elem;
    this.count++;
  }

  pop() {
    if (this.isEmpty()) {
      throw new Error('Стек пуст!');
    }

    this.count--;
    const result = this.storage[this.count];
    delete this.storage[this.count];
    return result;
  }

  peek() {
    if (this.isEmpty()) {
      return null;
    }

    return this.storage[this.count - 1];
  }

  isEmpty() {
    return !this.count;
  }
  toArray() {
    const resultArray = [];

    for (let i = 0; i < this.count; i++) {
      resultArray.push(this.storage[i]);
    }

    return resultArray;
  }
  [Symbol.toPrimitive]() {
    return String(this.toArray());
  }

  static fromIterable(iterable) {
    if (!iterable[Symbol.iterator]) {
      throw new Error('Переданное значение не является итерируемым');
    }

    const newStack = new Stack(iterable.length);

    for (let elem of iterable) {
      newStack.push(elem);
    }

    return newStack;
  }
}

const testStack = new Stack(3);
console.log(testStack.isEmpty()); // true
testStack.push('one');
console.log(testStack.isEmpty()); // false
testStack.push('two');
console.log(testStack.peek()); // two
console.log(testStack.pop()); // two
console.log(testStack.peek()); // one
testStack.push('two');
testStack.push('three');
console.log(testStack.toArray()); // ['one', 'two', 'three']
// testStack.push('four'); // Ошибка!
const newStackFromString = Stack.fromIterable('Iterable');
console.log(newStackFromString);
// newStackFromString.push('s') // Ошибка!
const newStackFromArray = Stack.fromIterable(['first', 'second', 'third', 'fourth', 'fifth']);
console.log(newStackFromArray);
