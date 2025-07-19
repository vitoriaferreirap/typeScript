"use strict";
const userName = 'João';
let age = 30;
age = 29;
const add = (a, b = 1) => a + b;
const printOutput = output => console.log(output);
const button = document.querySelector('button');
if (button) {
    button.addEventListener('click', event => console.log(event));
}
console.log(add(5));
//# sourceMappingURL=app.js.map