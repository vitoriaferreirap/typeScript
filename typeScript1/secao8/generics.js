//estudando tipos genericos
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var names = ['Max', 'Ana'];
//criando um objeto do tipo DataStore com valores do tipo string Ou boolean
var store = {};
// Adicionando valores ao objeto store
store.name = 'Max';
store.isAdmin = true;
//criando um objeto do tipo DataStore com valores do tipo string
var nameStore = {};
//funçao generica 
//mesclagem de objetos
//recebe dois obj de tipos diferentes e retorna um array com os dois objetos
function merge(a, b) {
    return [a, b];
}
//chamando a função merge e passando como parâmetros valores de tipos diferentes
var ids = merge(1, 'Max');
function mergeObj(a, b) {
    return __assign(__assign({}, a), b);
}
var merged = mergeObj({ name: 'Max' }, { age: 30 });
console.log(merged);
