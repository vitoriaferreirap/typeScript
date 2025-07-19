//usando ES6 -

//const vs let
const userName = 'João';
let age = 30;


//userName = 'Maria'; Erro: não é possível reatribuir uma constante
age = 29;
/*
//var
function add(a: number, b: number) {
    var result
    result = a + b;
    return result;
}

var isOlder;
if (age > 20) {
    isOlder = true;
    console.log(isOlder);
}
console.log(isOlder); // true, var é global ou local à função
*/

//sintaxe mais concisa
//argumento com valor padrão é apenas no ultimo parâmetro
const add = (a: number, b: number = 1) => a + b;

//isso é uma função anônima - Arrow Function
//significa que não tem nome, é uma função de callback
//função de callback é uma função que é passada como argumento para outra função
//e é executada dentro dessa função
const printOutput: (a: number | string) => void = output => console.log(output);

const button = document.querySelector('button');

if (button) {
    button.addEventListener('click', event => console.log(event));
}

console.log(add(5));


//arrays
const hobbies = ['Cozinhar', 'Esportes'];
const activeHobbies = ['Correr', 'Natação', ...hobbies];

activeHobbies.push(...hobbies); //... é o spread operator, que espalha os elementos do array

console.log(activeHobbies);
//obj
const person = {
    name: 'João',
    age: 30
};  
const copiedPerson = { ...person }; //copia o objeto, espalha as propriedades do objeto

console.log(copiedPerson);

