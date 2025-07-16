//função com argumentos tipado e retorno tipado
function add(a:number,b:number):number {
    return a + b;
}

//função que não retorna nada
function log(message:string):void {
    console.log(message);
}
/*
nunca retornara nada, mas pode lançar um erro
function logAndThrow(message:string):never {
    console.log(message);
    throw new Error(message);
}
const logg = logAndThrow('Erro de teste');
*/

//função que executa um trabalho
//função integrada 
//define tipo de função (callback) que recebe uma função como argumento
function performJob(cb: (msg: string) => void) {
    cb('Bom Trabalho'); //passa argumento pois a a função recebe cb como argumento e espera um tipo string
}
performJob(log); //passa a função log como argumento, que é do tipo (msg: string) => void


//objeto com propriedades e métodos
type User = {
    name: string;
    age: number;
    greet: () => string; //método greet recebe string e retorna string
};

let user: User = {
    name: 'Max',
    age: 45,
    greet() {//método greet que satisfaz o tipo definido 
        console.log('Olá');
        return this.name;
    }   
};

user.greet(); //chama o método greet do objeto user