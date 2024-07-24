const display = document.getElementById('display');
const buttons = document.querySelectorAll('.button');

let firstOperand = null;
let secondOperand = null;
let currentOperator = null;
let shouldResetDisplay = false;

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const action = button.dataset.action;

        if (button.classList.contains('number')) {
            inputNumber(action);
        } else if (button.classList.contains('operator')) {
            handleOperator(action);
        } else if (action === 'clear') {
            resetCalculator();
        } else if (action === 'sign') {
            toggleSign();
        } else if (action === 'percent') {
            convertToPercent();
        } else if (action === 'decimal') {
            inputDecimal();
        }
    });
});

function inputNumber(number) {
    if (display.textContent === '0' || shouldResetDisplay) {
        display.textContent = number;
        shouldResetDisplay = false;
    } else {
        display.textContent += number;
    }
}

function handleOperator(nextOperator) {
    const inputValue = parseFloat(display.textContent);

    if (currentOperator && shouldResetDisplay) {
        currentOperator = nextOperator;
        return;
    }

    if (firstOperand === null) {
        firstOperand = inputValue;
    } else if (currentOperator) {
        const result = calculate(firstOperand, inputValue, currentOperator);
        display.textContent = `${parseFloat(result.toFixed(7))}`;
        firstOperand = result;
    }

    shouldResetDisplay = true;
    currentOperator = nextOperator;
}

function calculate(firstOperand, secondOperand, operator) {
    if (operator === 'add') {
        return firstOperand + secondOperand;
    } else if (operator === 'subtract') {
        return firstOperand - secondOperand;
    } else if (operator === 'multiply') {
        return firstOperand * secondOperand;
    } else if (operator === 'divide') {
        return firstOperand / secondOperand;
    }

    return secondOperand;
}

function resetCalculator() {
    display.textContent = '0';
    firstOperand = null;
    secondOperand = null;
    currentOperator = null;
    shouldResetDisplay = false;
}

function toggleSign() {
    display.textContent = (parseFloat(display.textContent) * -1).toString();
}

function convertToPercent() {
    display.textContent = (parseFloat(display.textContent) / 100).toString();
}

function inputDecimal() {
    if (shouldResetDisplay) {
        display.textContent = '0';
        shouldResetDisplay = false;
    }

    if (!display.textContent.includes('.')) {
        display.textContent += '.';
    }
}
