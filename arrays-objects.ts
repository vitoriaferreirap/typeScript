let hobbie = ['Sports', 'Cooking'];
console.log(hobbie);

//maneira correta
let users: String[];
users = ['Max', 'Manu', 'Anna'];
console.log(users);

//array que onde cada elemento pode ser String ou number
let users2: (String | number)[];
//todos sao validos
users2 = ['Max', 2];
users2 = [3, 'Manu'];
users2 = [4, 5];
users2 = ['Anna', 'Max'];
console.log(users2);

//usando array - mais profissional
let hobbies2: Array<String | number>;
hobbies2 = [2, 'Cooking'];
console.log(hobbies2);

//tuplas - objetos que podem ter chaves e valores
let possibleResults: [number, number]; //numero de elementos aceitos e seus respectivos tipos e posições
possibleResults = [1, 2]; //ok
//possibleResults = [1, '2']; //erro, pois o segundo elemento deve ser um number
//possibleResults = [1, 2, 3]; //erro, pois aceita apenas dois elementos
console.log(possibleResults);


//obj e matriz aninhada
let user2: {
    //atribuindo tipos aos atributos do objeto
    nome: String;
    idade: Number;
    hobbies: String[];
    role: {
        id: number;
        description: String[];
    };
}={
    //atribuindo valores aos atributos do objeto
    nome: 'Max',
    idade: 30,
    hobbies: ['Sports', 'Cooking'],
    role: {
        id: 5,
        description: ['admin']
    }
}