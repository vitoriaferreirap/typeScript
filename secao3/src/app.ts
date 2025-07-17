//import fs from 'node:fs';
//Para Apis 
//fs.readFileSync();

let userName: string;
userName = 'John Doe';
console.log(userName);


//fun recebe args de qualquer tipo e retorna qualquer tipo
function add(x: any, y: any) {
    return x + y;
}

console.log(add(2, 3));