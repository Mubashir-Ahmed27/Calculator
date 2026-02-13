const current = document.getElementById("current");
const previous = document.getElementById("previous");
const buttons = document.querySelectorAll("button");

let currentValue = "";
let previousValue = "";
let operator = null;

buttons.forEach(btn => {
  btn.addEventListener("click", () => handleInput(btn.textContent));
});

function handleInput(value) {
  if (!isNaN(value) || value === ".") {
    appendNumber(value);
  } else if (value === "AC") {
    clearAll();
  } else if (value === "DEL") {
    deleteLast();
  } else if (value === "=") {
    calculate();
  } else {
    chooseOperator(value);
  }
  updateDisplay();
}

function appendNumber(num) {
  if (num === "." && currentValue.includes(".")) return;
  currentValue += num;
}

function chooseOperator(op) {
  if (currentValue === "") return;
  if (previousValue !== "") calculate();
  operator = op;
  previousValue = currentValue;
  currentValue = "";
}

function calculate() {
  let result;
  const prev = parseFloat(previousValue);
  const curr = parseFloat(currentValue);

  if (isNaN(prev) || isNaN(curr)) return;

  switch (operator) {
    case "+":
      result = prev + curr;
      break;
    case "−":
      result = prev - curr;
      break;
    case "×":
      result = prev * curr;
      break;
    case "÷":
      result = curr === 0 ? "Error" : prev / curr;
      break;
    case "%":
      result = prev % curr;
      break;
  }

  currentValue = result.toString();
  previousValue = "";
  operator = null;
}

function clearAll() {
  currentValue = "";
  previousValue = "";
  operator = null;
}

function deleteLast() {
  currentValue = currentValue.slice(0, -1);
}

function updateDisplay() {
  let displayValue = currentValue || "0";

  // If number is too long, convert to scientific notation
  if (displayValue.length > 10 && !isNaN(displayValue)) {
    displayValue = Number(displayValue).toExponential(5);
  }

  current.textContent = displayValue;
  previous.textContent = operator ? `${previousValue} ${operator}` : "";
}
