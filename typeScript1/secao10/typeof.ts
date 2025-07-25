let userName = 'Max';

console.log(typeof userName); //retorno do tipo

type UserName = string;

//obj
const settings = {
    difficulty: 'easy',
    minLevel: 1,
    didStart: false,
    players: ['Max', 'Anna']
};

//type Settings = typeof settings;

//funçao de carregamento
function loadData(s: typeof settings) {
    console.log('Carregando dados...');
}

loadData(settings);