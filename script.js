// selectors

const numberButtons = document.querySelectorAll("[data-number]");
const deleteButton = document.querySelector("[data-delete]");
const equalsButton = document.querySelector("[data-equals]");
const operationNumbers = document.querySelectorAll("[data-operation]");
const clearClassButton = document.querySelector("[data-clear]");
const prevOperandText = document.querySelector("[data-previous-operand]");
const currOperandText = document.querySelector("[data-current-operand]");

class Calculator {
  constructor(prevOperandText, currOperandText) {
    this.prevOperandText = prevOperandText;
    this.currOperandText = currOperandText;
    this.clear();
  }

  clear() {
    this.prevOperand = "";
    this.currOperand = "";
    this.operation = undefined;
  }

  delete() {
    this.currOperand = this.currOperand.toString().slice(0, -1);
  }

  appendNumber(number) {
    if (number === "." && this.currOperand.includes(".")) return;
    this.currOperand = this.currOperand.toString() + number.toString();
  }

  chooseOperation(operation) {
    if (this.currOperand === "") return;
    if (this.prevOperand !== "") {
      this.compute();
    }
    this.operation = operation;
    this.prevOperand = this.currOperand;
    this.currOperand = "";
  }

  compute() {
    let computation;
    const prev = parseFloat(this.prevOperand);
    const current = parseFloat(this.currOperand);
    if (isNaN(prev) || isNaN(current)) return;
    switch (this.operation) {
      case "+":
        computation = prev + current;
        break;
      case "-":
        computation = prev - current;
        break;
      case "*":
        computation = prev * current;
        break;
      case "/":
        computation = prev / current;
        break;
      default:
        return;
    }
    this.currOperand = computation;
    this.operation = undefined;
    this.prevOperand = "";
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split(".")[0]);
    const decimalDigits = stringNumber.split(".")[1];
    let integerDisplay;
    if (isNaN(integerDigits)) {
      integerDisplay = "";
    } else {
      integerDisplay = integerDigits.toLocaleString("en", {
        maximumFractionDigits: 0,
      });
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay;
    }
  }

  updateDisplay() {
    this.currOperandText.innerText = this.getDisplayNumber(this.currOperand);
    if (this.operation != null) {
      this.prevOperandText.innerText = `${this.getDisplayNumber(
        this.prevOperand
      )} ${this.operation}`;
    } else {
      this.prevOperandText.innerText = this.prevOperand;
    }
  }
}

const calculator = new Calculator(prevOperandText, currOperandText);

numberButtons.forEach((button) => {
  button.addEventListener("click", function () {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});

operationNumbers.forEach((button) => {
  button.addEventListener("click", function () {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  });
});

equalsButton.addEventListener("click", (button) => {
  calculator.compute();
  calculator.updateDisplay();
});

clearClassButton.addEventListener("click", (button) => {
  calculator.clear();
  calculator.updateDisplay();
});

deleteButton.addEventListener("click", (button) => {
  calculator.delete();
  calculator.updateDisplay();
});
