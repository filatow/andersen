class Calculator {
  #operations = {
    CLEAR: 'clear',
    SWAP_SIGN: 'swap-sign',
    SQUARE: 'square',
    SQUARE_ROOT: 'square-root',
    SUM: 'sum',
    DIFFERENCE: 'difference',
    MULTIPLY: 'multiply',
    DIVIDE: 'divide',
    EQUALS: 'equals',
  }
  
  #isInputDisabled = false;
  #valueOnDisplay = '';
  #operationInProgress = null;
  #firstOperandBuffer = null;

  constructor(calculator) {
    this.display = calculator.querySelector('.calculator-display');
    this.keyboard = calculator.querySelector('.calculator-keyboard');

    const keyboardButtonClickHandler = (evt) => {      
      const button = evt.target.closest('button');
      if (!button) return;

      const {calcSymbol: symbol, calcOperation: operation} = button.dataset;
      let operationResult;

      if (symbol) {
        if (this.#isInputDisabled) {
          return;
        };
        if (this.#operationInProgress) {
          if (this.#firstOperandBuffer) {
            this.inputSymbol(symbol);
          } else {
            this.#firstOperandBuffer = this.#valueOnDisplay;
            this.refreshDisplay(symbol);
          }
        } else {
          this.inputSymbol(symbol);
        }
      } else if (operation) {
        if (this.#isInputDisabled && operation !== this.#operations.CLEAR) {
          return;
        }
        switch (operation) {
          case this.#operations.CLEAR:
            operationResult = '';
            this.#operationInProgress = null;
            this.#firstOperandBuffer = null;
            this.#isInputDisabled = false;
            this.refreshDisplay(operationResult);
            break;
          case this.#operations.SWAP_SIGN:
            operationResult = String(-this.#valueOnDisplay);
            this.refreshDisplay(operationResult);
            break;
          case this.#operations.SQUARE:
            operationResult = this.#valueOnDisplay ** 2;
            this.refreshDisplay(this.formatResult(operationResult));
            break;
          case this.#operations.SQUARE_ROOT:
            if (this.#valueOnDisplay < 0) {
              operationResult = 'Invalid input';
              this.refreshDisplay(operationResult);
              this.#isInputDisabled = true;
            } else {
              operationResult = Math.sqrt(this.#valueOnDisplay);
              this.refreshDisplay(this.formatResult(operationResult));
            }
            break;
          case this.#operations.SUM:
          case this.#operations.DIFFERENCE:
          case this.#operations.MULTIPLY:
          case this.#operations.DIVIDE:
          case this.#operations.EQUALS:
            this.executePreviousBinaryOperation(operation);
            break;
        }
      }
    };

    this.keyboard.addEventListener('click', keyboardButtonClickHandler);
  }

  executePreviousBinaryOperation(nextOperation) {
    let operationResult;
    if (this.#operationInProgress) {
      switch (this.#operationInProgress) {
        case this.#operations.SUM:
          operationResult = Number(this.#firstOperandBuffer) + Number(this.#valueOnDisplay);
          break;
        case this.#operations.DIFFERENCE:
          operationResult = Number(this.#firstOperandBuffer) - Number(this.#valueOnDisplay);
          break;
        case this.#operations.MULTIPLY:
          operationResult = Number(this.#firstOperandBuffer) * Number(this.#valueOnDisplay);
          break;
        case this.#operations.DIVIDE:
          operationResult = Number(this.#firstOperandBuffer) / Number(this.#valueOnDisplay);
          break;
      }
      this.#firstOperandBuffer = null;
      this.refreshDisplay(this.formatResult(operationResult));
    }
    this.#operationInProgress = nextOperation !== this.#operations.EQUALS
      ? nextOperation : null;
  }

  inputSymbol(symbol) {
    if (symbol === '.' && this.#valueOnDisplay.includes('.')) {
      return;
    }

    const result = this.#valueOnDisplay + symbol;
    this.refreshDisplay(result);
  }

  formatResult(result) {
    if (Number.isInteger(result)) {
      return result;
    }
    return result.toFixed(8);
  }
  refreshDisplay(newValue) {
    this.#valueOnDisplay = newValue;
    this.display.value = this.#valueOnDisplay;
  }
}

const calculator = new Calculator(document.querySelector('.calculator'));
