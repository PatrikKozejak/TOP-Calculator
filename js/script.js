let display = document.querySelector("#display");
let secondaryDisplay = document.querySelector("#secondaryDisplay");
let numButtons = document.querySelectorAll("[data-num]");
let operatorButtons = document.querySelectorAll("[data-operator]");
let equalsBtn = document.querySelector("#equalsBtn");
let clearBtn = document.querySelector(".btn-clear");

let firstOperand = display.textContent;
let secondOperand = null;
let operator = null;
let newLine = true;

const add = function (firstNum, secondNum) {
  return firstNum + secondNum;
};

const substract = function (firstNum, secondNum) {
  return firstNum - secondNum;
};

const multiply = function (firstNum, secondNum) {
  return firstNum * secondNum;
};

const divide = function (firstNum, secondNum) {
  return firstNum / secondNum;
};

const operate = function (operator, firstNum, secondNum) {
  a = Number(firstNum);
  b = Number(secondNum);
  switch (operator) {
    case "+":
      return add(a, b);
    case "-":
      return substract(a, b);
    case "*":
      return multiply(a, b);
    case "/":
      return divide(a, b);
  }
};
function roundResult(number) {
  return Math.round(number * 1000) / 1000;
}

function clear() {
  display.textContent = "0";
  firstOperand = display.textContent;
  secondaryDisplay.textContent = "";
  secondOperand = null;
  operator = null;
  newLine = true;
}

function evaluate() {
  if (display.textContent === "0" && operator === "/") {
    display.textContent = "ERROR";
    secondaryDisplay.textContent = "You can't divide by 0";
    firstOperand = display.textContent;
    secondOperand = null;
    operator = null;
    newLine = true;
    return;
  } else if (operator === null) {
    return;
  }

  secondOperand === null
    ? (secondOperand = display.textContent)
    : secondOperand;
  console.log(operator, firstOperand, secondOperand);
  display.textContent = roundResult(
    operate(operator, firstOperand, secondOperand)
  );
  secondaryDisplay.textContent = `${firstOperand} ${operator} ${secondOperand} =`;
  firstOperand = display.textContent;
  newLine = true;
  // operator = null;
}

function setOperation(operatorBtn) {
  if (operator === null) {
    firstOperand = display.textContent;
    operator = operatorBtn.getAttribute("data-operator");
    secondaryDisplay.textContent = `${firstOperand} ${operator} `;
    newLine = true;
  } else {
    // secondOperand = display.textContent;
    evaluate();
    secondaryDisplay.textContent = `${firstOperand} ${operator} `;
    operator = operatorBtn.getAttribute("data-operator");
    newLine = true;
  }
}

function appendNumber(number) {
  if (newLine) {
    display.textContent = number;
    newLine = false;
  } else {
    display.textContent += number;
  }
}

numButtons.forEach((button) => {
  button.addEventListener("click", () => {
    appendNumber(button.getAttribute("data-num"));
  });
});

operatorButtons.forEach((button) =>
  button.addEventListener("click", () => setOperation(button))
);

equalsBtn.addEventListener("click", evaluate);
clearBtn.addEventListener("click", clear);
