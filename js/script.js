let display = document.querySelector("#display");
let secondaryDisplay = document.querySelector("#secondaryDisplay");
let numButtons = document.querySelectorAll("[data-num]");
let pointButton = document.querySelector("[data-point]");
let operatorButtons = document.querySelectorAll("[data-operator]");
let equalsBtn = document.querySelector("#equalsBtn");
let clearBtn = document.querySelector(".btn-clear");
let backspaceBtn = document.querySelector("#backspace");

let firstOperand = display.textContent;
let secondOperand = null;
let operator = null;
let evaluated = false;
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
  evaluated = false;
}

function deleteNumber() {
  if (display.textContent !== "0" && display.textContent.length > 0) {
    display.textContent = display.textContent.slice(0, -1);
    if (display.textContent.length === 0) {
      display.textContent = "0";
      newLine = true;
    }
  }
}

function evaluate() {
  if (display.textContent === "0" && operator === "/") {
    display.textContent = "ERROR";
    secondaryDisplay.textContent = "You can't divide by 0";
    firstOperand = "0";
    secondOperand = null;
    operator = null;
    newLine = true;
    return;
  } else if (operator === null) {
    return;
  }
  secondOperand = display.textContent;
  display.textContent = roundResult(
    operate(operator, firstOperand, secondOperand)
  );
  secondaryDisplay.textContent = `${firstOperand} ${operator} ${secondOperand} =`;
  firstOperand = display.textContent;
  lastOperator = operator;
  newLine = true;
  evaluated = true;
}

function setOperation(operatorBtn) {
  if (operator === null) {
    firstOperand = display.textContent;
  } else {
    if (evaluated === true) {
      evaluated = false;
      firstOperand = display.textContent;
    } else {
      evaluate();
    }
  }
  operator = operatorBtn;
  secondaryDisplay.textContent = `${firstOperand} ${operator} `;
  newLine = true;
}

function appendNumber(number) {
  if (
    (newLine && number !== ".") ||
    (display.textContent === "0" && number === "0")
  ) {
    display.textContent = number;
  } else {
    display.textContent += number;
  }
  newLine = false;
}

numButtons.forEach((button) => {
  button.addEventListener("click", () => {
    appendNumber(button.getAttribute("data-num"));
  });
});

operatorButtons.forEach((button) =>
  button.addEventListener("click", () =>
    setOperation(button.getAttribute("data-operator"))
  )
);

pointButton.addEventListener("click", () => {
  if (display.textContent.indexOf(".") === -1) {
    appendNumber(".");
  }
});

equalsBtn.addEventListener("click", evaluate);
clearBtn.addEventListener("click", clear);
backspaceBtn.addEventListener("click", deleteNumber);

window.addEventListener("keydown", (event) => {
  const keyName = event.key;

  if (keyName <= "9" && keyName >= "0") {
    appendNumber(keyName);
  } else if (
    keyName === "/" ||
    keyName === "*" ||
    keyName === "+" ||
    keyName === "-"
  ) {
    setOperation(keyName);
  } else if (keyName === "=" || keyName === "Enter") {
    evaluate();
  } else if (keyName === ".") {
    if (display.textContent.indexOf(".") === -1) {
      appendNumber(".");
    }
  } else if (keyName === "Backspace" || keyName === "Delete") {
    deleteNumber();
  }
});
