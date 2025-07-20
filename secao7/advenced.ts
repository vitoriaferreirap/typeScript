//possibilita a criação de objetos com propriedades dinâmicas
//e permite que sejam adicionadas propriedades de qualquer tipo, desde que sejam do tipo number ou boolean
type DataStore = {
    [prop: string]: number | boolean;
};

let store: DataStore = {};

store.id = 5;
store.isActive = true;
//store.name = "Teste"; Erro: 'name' não é do tipo number ou boolean




