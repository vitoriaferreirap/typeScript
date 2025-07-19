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
const hobbies = ['Cozinhar', 'Esportes'];
const activeHobbies = ['Correr', 'Natação', ...hobbies];
activeHobbies.push(...hobbies);
console.log(activeHobbies);
const person = {
    name: 'João',
    age: 30
};
const copiedPerson = Object.assign({}, person);
console.log(copiedPerson);
//# sourceMappingURL=app.js.map