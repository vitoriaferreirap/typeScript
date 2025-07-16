//função com argumentos tipado e retorno tipado
function add(a, b) {
    return a + b;
}
//função que não retorna nada
function log(message) {
    console.log(message);
}
/*
//nunca retornara nada, mas pode lançar um erro
function logAndThrow(message:string):never {
    console.log(message);
    throw new Error(message);
}
const logg = logAndThrow('Erro de teste');
*/
//função que executa um trabalho
//função integrada 
//define tipo de função (callback) que recebe uma função como argumento
function performJob(cb) {
    cb('Bom Trabalho'); //passa argumento pois a a função recebe cb como argumento e espera um tipo string
}
performJob(log); //passa a função log como argumento, que é do tipo (msg: string) => void
