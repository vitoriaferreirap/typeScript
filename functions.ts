//função com argumentos tipado e retorno tipado
function add(a:number,b:number):number {
    return a + b;
}

//função que não retorna nada
function log(message:string):void {
    console.log(message);
}

//nunca retornara nada, mas pode lançar um erro
function logAndThrow(message:string):never {
    console.log(message);
    throw new Error(message);
}
const logg = logAndThrow('Erro de teste');