import result from "../result/result";

let previousOperand = 0;
let currentOperand = "";
let currentOperator = "";
export var previousOperator = "";
let resultNow = 0;

function calculateTheResult(x) {
    // console.log('pOperand',previousOperand);
    // console.log('pOperator',previousOperator);
    // console.log('num',previousOperator,number);
    let number = parseInt(currentOperand);
    switch (previousOperator) {
        case '+':
            resultNow = resultNow + number;
            break;
        case '-':
            resultNow = resultNow - number;
            break;
        case '*':
            resultNow = resultNow * number;
            break;
        case '/':
            resultNow = resultNow / number;
            break;
        case '':
            resultNow = number;
            break;
        default:
            console.log('Something went wrong');
    }
    console.log('result', resultNow);
    if (x == '=') {
        previousOperator = '';
        previousOperand = '';
    }
    else {
        previousOperator = currentOperator;
        previousOperand = number;
    }
    currentOperator = "";
    currentOperand = "";

    return 120;
}

function inputOperand(num) {
    currentOperand += num;
    return;
}

function inputOperator(x) {
    // let operand = parseInt(currentOperand);
    // currentOperand = "";
    currentOperator = x;
    calculateTheResult(x);
    return;
}

function clearStack() {
    previousOperand = 0;
    currentOperand = "";
    currentOperator = "";
    previousOperator = "";
    resultNow = 0;
    return;
}

export function decideAction(item) {
    console.log(item);
    let x = item;
    switch (true) {
        case (x < 10):
            inputOperand(x);
            break;
        case (x == '='):
            calculateTheResult(x);
            break;
        case (x == '+' || x == '-' || x == '*' || x == '/'):
            inputOperator(x);
            break;
        case (x == 'CLEAR'):
            clearStack();
            break;
        default:
            console.log('Something went wrong');
    }
}