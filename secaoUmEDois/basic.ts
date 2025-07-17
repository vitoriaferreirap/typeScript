
//js tem conceito de tipagem mas nao de atribuição de tipos

//tipos incorporados que vem do TypeScript
//atribuição de tipos
let userName: string;
let codeUser: number;

userName = 'Max';
codeUser = 1234;

console.log(userName);
console.log(codeUser);

//aplicar tipos aos parametros de funções (segundo argumento é opcional)
function add(a: number, b = 5) {
    return a + b;
}

console.log(add(10));
console.log(add(10, 20));