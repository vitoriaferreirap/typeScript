//trabalhando com classe mais avançada
class Person{
    constructor(protected firstName: string, private lastName: string) {}

    //métodos para obter - listar

/*
 * chamado como funcao e aceita parametros - (max.getFullName())
 * getFullName() {
 *     return this.fullName;
 * }
 * 
 */
    
    //acessa como proriedades e não aceita parametros = (max._fullName
    get _fullName() {
        return `${this.firstName}  ${this.lastName}`;
    }

    get _firstName() {
        return this.firstName;
    }
    get _lastName() {
        return this.lastName;
    }

    //método para alterar 
    set _lastName(lastName: string) {
        if(lastName.trim() === "") {
            throw new Error("Last name cannot be empty");
        }
        this.lastName = lastName;
    }

    set _firstName(firstName: string) {
        if(firstName.trim() === "") { //remover espaços em branco
            throw new Error("First name cannot be empty");
        }
        this.firstName = firstName;
    }
}

//registrar informações de uma pessoa
const max = new Person("Max", "Doe");
console.log(max._fullName); // Max Doe
//alterar o sobrenome
max._lastName = "Smith";
console.log(max._lastName); // Smith
console.log(max._fullName); 



//herança 
class Employee extends Person {
    constructor(firstName: string, lastName: string, public jobTitle: string) {
        super(firstName, lastName); //chama o construtor da classe pai Person
    }
//metodos personalizados        
    work() { 
        console.log(this._firstName);
    }

    
}

//classes abstratas (atua como classe base, deve ser estendida)
abstract class UIElement {
    constructor(public id: string) { }
    clone(targetLocation: string) {
        //logic to duplicate the element
        
    }
}