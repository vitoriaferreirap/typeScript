//trabalhando com criação de classes

//js ja usa classe porem interface é mais usado em typescript

//sintaxe tradicional
class User {
    nome: string; // Atributo 
    idade: number;

    constructor(nome: string, idade: number) {
        this.nome = nome;
        this.idade = idade;
    }
}

new User("João", 30);

//sintaxe simplificada
//atributos criam-se automaticamente no construtor com o uso do public e viram args
class person { 
    #role = 'admin'; //propriedade privada, não pode ser acessada fora da classe
    
    public hobbiesPerson: string[] = []; //array vazio

    //em ts propriedade public é private por padrão precisa do #
    constructor(public name: string, public age: number) { }
    
    //acesso permitido apenas dentro da class
    showName() {
        console.log(`Nome: ${this.name}`);
    }
}

//instanciando um objeto
const m = new person("Maria", 25);
const j = new person("José", 40);

console.log(m, j);

