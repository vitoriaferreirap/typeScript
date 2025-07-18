//trabalhando com criação de classes
class User {
    nome: string; // Atributo 
    idade: number;

    constructor(nome: string, idade: number) {
        this.nome = nome;
        this.idade = idade;
    }
}

new User("João", 30);
