var hobbie = ['Sports', 'Cooking'];
console.log(hobbie);
//maneira correta
var users;
users = ['Max', 'Manu', 'Anna'];
console.log(users);
//array que onde cada elemento pode ser String ou number
var users2;
//todos sao validos
users2 = ['Max', 2];
users2 = [3, 'Manu'];
users2 = [4, 5];
users2 = ['Anna', 'Max'];
console.log(users2);
//usando array - mais profissional
var hobbies2;
hobbies2 = [2, 'Cooking'];
console.log(hobbies2);
//tuplas - objetos que podem ter chaves e valores
var possibleResults; //numero de elementos aceitos e seus respectivos tipos e posições
possibleResults = [1, 2]; //ok
//possibleResults = [1, '2']; //erro, pois o segundo elemento deve ser um number
//possibleResults = [1, 2, 3]; //erro, pois aceita apenas dois elementos
console.log(possibleResults);
