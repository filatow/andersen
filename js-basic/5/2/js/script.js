class Calculator {
  constructor(...args) {
    if (args.length !== 2) {
      throw new Error('Параметров должно быть ровно 2');
    }
    if (!args.every(Calculator.isValidNumber)) {
      throw new Error('В одном из параметров передано невалидное число');
    }

    this.x = args[0];
    this.y = args[1];

    this.setX = this.setX.bind(this);
    this.setY = this.setY.bind(this);
  }

  setX(newValue) {
    if (Calculator.isValidNumber(newValue)) {
      this.x = newValue;
    } else {
      throw new Error('В параметре передано невалидное число');
    }
  };

  setY(newValue) {
    if (Calculator.isValidNumber(newValue)) {
      this.y = newValue;
    } else {
      throw new Error('В параметре передано невалидное число');
    }
  };

  logSum = () => {
    console.log(this.x + this.y);
  };

  logMul = () => {
    console.log(this.x * this.y);
  };

  logSub = () => {
    console.log(this.x - this.y);
  };

  logDiv = () => {
    if (this.y === 0) {
      throw new Error('Ошибка деления не ноль');
    }
    console.log(this.x / this.y);
  };

  static isValidNumber(num) {
    if (typeof num !== 'number' || [Infinity, -Infinity, NaN].includes(num)) {
      return false;
    }
    return true;
  }
}

const calculator = new Calculator(12, 3);
calculator.logSum(); // 15
calculator.logDiv(); // 4
calculator.setX(15);
calculator.logDiv(); // 5
const logCalculatorDiv = calculator.logDiv;
logCalculatorDiv(); // 5
calculator.setX(60);
calculator.setY(5);
calculator.logDiv(); // 12
logCalculatorDiv(); // 12
calculator.setY(20);
calculator.logSub(); // 40
logCalculatorDiv(); // 3
// calculator.setY(444n); // Ошибка!