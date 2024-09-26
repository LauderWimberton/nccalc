function calculate() {
    const input = document.getElementById('calculatorInput').value.replace(/\s+/g, '');
    try {
        const result = evaluateExpression(input);
        document.getElementById('result').textContent = formatResult(result);
    } catch (error) {
        document.getElementById('result').textContent = 'Error: ' + error.message;
    }
}

function evaluateExpression(expression) {

    expression = expression.replace(/PI/g, MathLibrary.PI.toString());

    expression = expression.replace(/sin\(/g, 'MathLibrary.sin(');
    expression = expression.replace(/cos\(/g, 'MathLibrary.cos(');
    expression = expression.replace(/tan\(/g, 'MathLibrary.tan(');
    expression = expression.replace(/sqrt\(/g, 'MathLibrary.sqrt(');

    expression = expression.replace(/log\(([^)]+)\)\(([^)]+)\)/g, 'MathLibrary.log($1,$2)');

    return Function('"use strict";return (' + expression + ')')();
}

function formatResult(result) {
    if (Number.isInteger(result)) {
        return result.toString();
    }
    const fraction = toFraction(result);
    return `${fraction[0]}/${fraction[1]}`;
}

function toFraction(decimal) {
    const precision = 1e-6;
    let numerator = 1;
    let denominator = 1;
    let error = Math.abs(decimal - numerator / denominator);

    while (error > precision) {
        if (numerator / denominator < decimal) {
            numerator++;
        } else {
            denominator++;
        }
        error = Math.abs(decimal - numerator / denominator);
    }

    return simplifyFraction(numerator, denominator);
}

function simplifyFraction(numerator, denominator) {
    const gcd = findGCD(Math.abs(numerator), Math.abs(denominator));
    return [numerator / gcd, denominator / gcd];
}

function findGCD(a, b) {
    return b === 0 ? a : findGCD(b, a % b);
}

function handleError(error) {
    console.error('Calculation error:', error);
    document.getElementById('result').textContent = 'Error: ' + error.message;
}

function validateInput(input) {
    const validChars = /^[0-9+\-*/^().%,\s]+$/;
    if (!validChars.test(input.replace(/sin|cos|tan|sqrt|log|PI/g, ''))) {
        throw new Error('Invalid characters in input');
    }

    let parenthesesCount = 0;
    for (let char of input) {
        if (char === '(') parenthesesCount++;
        if (char === ')') parenthesesCount--;
        if (parenthesesCount < 0) throw new Error('Mismatched parentheses');
    }
    if (parenthesesCount !== 0) throw new Error('Mismatched parentheses');


    return true;
}

window.calculate = calculate;

document.getElementById('calculatorInput').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        calculate();
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const input = document.getElementById('calculatorInput');
    const result = document.getElementById('result');

    if (input && result) {
        console.log('Calculator initialized');
    } else {
        console.error('Calculator elements not found');
    }
});