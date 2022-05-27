'use strict';
const nums = document.querySelectorAll('.calculator__num'),
      screen = document.querySelector('.calculator__screen'),
      clear = document.querySelector('.calculator__clear'),
      deleteBtn = document.querySelector('.calculator__delete'),
      addBtn = document.querySelector('#calculator__add'),
      subtractBtn = document.querySelector('#calculator__subtract'),
      multiplyBtn = document.querySelector('#calculator__multiply'),
      divideBtn = document.querySelector('#calculator__divide'),
      equalsBtn = document.querySelector('.calculator__equals'),
      dot = document.querySelector('.calculator__dot'),
      num1 = document.querySelector('#num1'),
      num2 = document.querySelector('#num2'),
      op = document.querySelector('#op'),
      result = document.querySelector('#result');

let value = 0;
let storage = 0;
let operator;

num1.innerHTML = '0';

function add(a, b) {
    if (Number.isInteger(a + b)) {
        return a + b;
    }
    return (a + b).toFixed(1);
}

function subtract(a, b) {
    if (Number.isInteger(a - b)) {
        return a - b;
    }
    return (a - b).toFixed(1);
}

function multiply(a, b) {
    if (Number.isInteger(a * b)) {
        return a * b;
    }
    return (a * b).toFixed(1);
}

function divide(a, b) {
    if (b === 0) {
        return 'No division by zero';
    }
    if (Number.isInteger(a / b)) {
        return a / b;
    }
    return (a / b).toFixed(1);
}

function operate(operator, a, b) {
    return operator(a, b);
}

function inputValue(e) {
    if (op.innerHTML != '' && num2.innerHTML.length <= 15) {
        num2.innerHTML += e.target.innerHTML;
        num2.innerHTML = num2.innerHTML.slice(0,13);
        value = +num2.innerHTML;
    }  else if (!num1.innerHTML.includes('.') && num1.innerHTML.includes('0')) {
        num1.innerHTML = e.target.innerHTML;
    } else if (num1.innerHTML.length <= 15) {
        num1.innerHTML += e.target.innerHTML;
        num1.innerHTML = num1.innerHTML.slice(0,13);
    }
}
function count () {
    if ((num1.innerHTML && num2.innerHTML && op.innerHTML)) {
        result.innerHTML = operate(operator, storage, value);
    }
}
function addResult() {
    if ((num1.innerHTML && num2.innerHTML && op.innerHTML)) {
        count();
        num1.innerHTML = result.innerHTML;
        num2.innerHTML = '';
    }
}

function deleteChar () {
    if (num2.innerHTML) {
        num2.innerHTML = num2.innerHTML.split('').slice(0, -1).join('');
    }  else if (op.innerHTML) {
        op.innerHTML = '';
    } else {
        num1.innerHTML = num1.innerHTML.split('').slice(0, -1).join('');
        if (!num1.innerHTML) num1.innerHTML = '0';
    }
}

function setOperator(e, operation) {
    if (num1.innerHTML) {
        addResult();
    }
    op.innerHTML = e.target.innerHTML;
    operator = operation;
    storage = +num1.innerHTML;
}

function setKeyOperator (sign, operation) {
    op.innerHTML = sign;
    operator = operation;
    storage = +num1.innerHTML;
}

function inputDot() {
    if (op.innerHTML === '') {
        if (!num1.innerHTML.includes('.')) num1.innerHTML += '.';
    } 
     else {
        if (!num2.innerHTML.includes('.') && num2.innerHTML !== '') num2.innerHTML += '.';
    } 
}

function clearScreen() {
    storage = 0;
    value = 0;
    num1.innerHTML = '0';
    num2.innerHTML = '';
    op.innerHTML = '';
    result.innerHTML = '';
}


function inputKeyValue(e) {
    const code = e.code.split('').slice(-1).join('');
    if (code >= 0 && code <= 9) {
        if (op.innerHTML != '') {
            num2.innerHTML += code;
            value = +num2.innerHTML;
        }  else if (!num1.innerHTML.includes('.') && num1.innerHTML.includes('0')) {
            num1.innerHTML = code;
        } else {
            num1.innerHTML += code;
        }
    }  
    num1.innerHTML = num1.innerHTML.slice(0,13);
    num2.innerHTML = num2.innerHTML.slice(0,13);


    switch (e.code) {
        case 'NumpadAdd': setKeyOperator('+', add);
        break;
        case 'NumpadSubtract': setKeyOperator('-', subtract);
        break;
        case 'NumpadMultiply': setKeyOperator('x', multiply);
        break;
        case 'NumpadDivide': setKeyOperator('/', divide);
        break;
        case 'Period': inputDot();
        break;
        case 'Equal': count();
        break;
        case 'Escape': clearScreen();
        break;
        case 'Backspace': deleteChar();
        break;
    }
}

document.addEventListener('keydown', (e) => inputKeyValue(e));
nums.forEach(num => num.addEventListener('click', (e) => inputValue(e))); 
clear.addEventListener('click', (e) => clearScreen());
deleteBtn.addEventListener('click', () => deleteChar());
equalsBtn.addEventListener('click', () => count());
dot.addEventListener('click', () => inputDot());
addBtn.addEventListener('click', (e) => setOperator(e, add));
subtractBtn.addEventListener('click', (e) => setOperator(e, subtract));
multiplyBtn.addEventListener('click', (e) => setOperator(e, multiply));
divideBtn.addEventListener('click', (e) => setOperator(e, divide));


