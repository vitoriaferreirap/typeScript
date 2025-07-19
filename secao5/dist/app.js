"use strict";
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
    firstName: 'João',
    age: 30
};
const copiedPerson = Object.assign({}, person);
console.log(copiedPerson);
const adicionar = (...numbers) => {
    return numbers.reduce((acc, curr) => {
        return acc + curr;
    }, 0);
};
const addedNumbers = adicionar(5, 10, 2, 3.7);
console.log(addedNumbers);
const [hobby1, hobby2, ...remainingHobbies] = hobbies;
console.log(hobbies, hobby1, hobby2);
const { firstName: userName2, age } = person;
console.log(userName2, age, person);
//# sourceMappingURL=app.js.map