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
      operators = '+ - x /',
      num1 = document.querySelector('#num1'),
      num2 = document.querySelector('#num2'),
      op = document.querySelector('#op'),
      result = document.querySelector('#result');

let value = 0;
let storage = 0;
let operator;

num1.innerHTML = '0';

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    if (Number.isInteger(a * b)) {
        return a * b;
    }
    return (a * b).toFixed(3);
}

function divide(a, b) {
    if (Number.isInteger(a / b)) {
        return a / b;
    }
    return (a / b).toFixed(3);
}

function operate(operator, a, b) {
    return operator(a, b);
}

function inputValue(e) {
    if (op.innerHTML != '') {
        num2.innerHTML += e.target.innerHTML;
        value = +num2.innerHTML;
    }  else if (!num1.innerHTML.includes('.') && num1.innerHTML.includes('0')) {
        num1.innerHTML = e.target.innerHTML;
    } else {
        num1.innerHTML += e.target.innerHTML;
    }
}
function count () {
    result.innerHTML = operate(operator, storage, value);
}
function addNewValue() {
    if (op.innerHTML !== '') {
        count();
        num1.innerHTML = result.innerHTML;
        num2.innerHTML = '';
    }
}

nums.forEach(num => {
    num.addEventListener('click', (e) => inputValue(e));
}); 

clear.addEventListener('click', (e) => {
    storage = 0;
    value = 0;
    num1.innerHTML = '0';
    num2.innerHTML = '';
    op.innerHTML = '';
    result.innerHTML = '';
});
deleteBtn.addEventListener('click', (e) => {
    if (num2.innerHTML) {
        num2.innerHTML = num2.innerHTML.split('').slice(0, -1).join('');
    }  else if (op.innerHTML) {
        op.innerHTML = '';
    } else {
        num1.innerHTML = num1.innerHTML.split('').slice(0, -1).join('');
        if (!num1.innerHTML) num1.innerHTML = '0';
    }
});
equalsBtn.addEventListener('click', () => {
    if ((num1.innerHTML && num2.innerHTML && op.innerHTML)) {
        count();
    } 
});
dot.addEventListener('click', () => {
    if (op.innerHTML === '') {
        if (!num1.innerHTML.includes('.')) num1.innerHTML += '.';
    } else {
        if (!num2.innerHTML.includes('.')) num2.innerHTML += '.';
    }
});

addBtn.addEventListener('click', (e) => {
    if (num1.innerHTML) {
        addNewValue();
        op.innerHTML = e.target.innerHTML;
        operator = add;
        storage = +num1.innerHTML;
    }
});

subtractBtn.addEventListener('click', (e) => {
    if (num1.innerHTML) {
        addNewValue();
        op.innerHTML = e.target.innerHTML;
        operator = subtract;
        storage = +num1.innerHTML;
    }
})
multiplyBtn.addEventListener('click', (e) => {
    if (num1.innerHTML) {
        addNewValue();
        op.innerHTML = e.target.innerHTML;
        operator = multiply;
        storage = +num1.innerHTML;
    }
})
divideBtn.addEventListener('click', (e) => {
    if (num1.innerHTML) {
        addNewValue();
        op.innerHTML = e.target.innerHTML;
        operator = divide;
        storage = +num1.innerHTML;
    }
});


