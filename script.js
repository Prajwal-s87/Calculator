const display = document.getElementById("display");
const numberButtons = document.querySelectorAll("[data-number]");
const operatorButtons = document.querySelectorAll("[data-operator]");
const actionButtons = document.querySelectorAll("[data-action]");

let firstNumber = null;
let operator =  null;
let waitingForSecondNumber = false;

function inputNumber (number) {
    if (waitingForSecondNumber) {
        display.value= number;
        waitingForSecondNumber= false;
        return;
    }
    if (number === "." && display.value.includes(".")){
        return;
    }
    if (display.value === "0" && number !=="."){
        display.value = number;
    } else {
        display.value += number;
    }
}

function chooseOperator (selectedOperator) {
    firstNumber = Number (display.value);
    operator =  selectedOperator;
    waitingForSecondNumber = true;
}

function calculate () {
    if (firstNumber === null  || operator === null) {
        return;
    }

    const secondNumber =Number (display.value);
    let result;

    if (operator === "+") {
        result = firstNumber+secondNumber;
    } else if (operator === "-") {
        result = firstNumber - secondNumber;
    } else if (operator === "*") {
        result = firstNumber * secondNumber;
    } else if (operator === "/") {
        if (secondNumber === 0) {
            display.value = "Cannot divide by 0";
            resetCalculator();
            return;
        }
        result = firstNumber/ secondNumber;
    }
    display.value = result;
    firstNumber = null;
    operator = null;
    waitingForSecondNumber = true;
}

function clearCalculator() {
    display.value = "0";
    resetCalculator();
}

function deleteNumber() {
    if (display.value.length === 1) {
        display.value ="0";
    }else{
        display.value = display.value.slice (0,-1);
    }
}

function resetCalculator() {
    firstNumber = null;
    operator = null;
    waitingForSecondNumber = false;
}

numberButtons.forEach(function(button) {
    button.addEventListener("click", function() {
        inputNumber(button.dataset.number);
    });
});

operatorButtons.forEach(function(button) {
    button.addEventListener("click" , function(){
        chooseOperator(button.dataset.operator);
    });
});

actionButtons.forEach(function(button){
    button.addEventListener("click", function(){
        const action = button.dataset.action;

        if (action === "clear") {
            clearCalculator();
        }
        if(action === "delete"){
            deleteNumber();
        }
        if(action === "calculate") {
            calculate();
        }
    });
});
