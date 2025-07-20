//estudando tipos genericos

let names: Array<string> = ['Max', 'Ana'];

type DataStore<T> = {
    [key: string]: T;
};

//criando um objeto do tipo DataStore com valores do tipo string Ou boolean
let store: DataStore<string | boolean> = {};

// Adicionando valores ao objeto store
store.name = 'Max';
store.isAdmin = true;

//criando um objeto do tipo DataStore com valores do tipo string
let nameStore: DataStore<string> = {};

//funçao generica 
//mesclagem de objetos
//recebe dois obj de tipos diferentes e retorna um array com os dois objetos
function merge <T,U>(a: T, b: U) {
    return [a, b];
}   

//chamando a função merge e passando como parâmetros valores de tipos diferentes
const ids = merge(1, 'Max');

function mergeObj<T extends object, U extends object>(a: T, b: U){
    return {...a, ...b};
}

const merged = mergeObj({ name: 'Max' }, { age: 30 });
console.log(merged); 