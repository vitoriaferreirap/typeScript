//interface é usada como um tipo para definir a estrutura de um objeto
interface Authenticatable {
    //apenas um tipo para o objeto
    //quem implementar essa interface deve ter esses métodos ha mais
    email: string;
    password: string;

    login(): void;
    logout(): void;
}

//extendendo a interface
interface AdminAuthenticatable extends Authenticatable {
    role:'admin' | 'user'; //adicionando uma propriedade
}

//criar um objeto que implementa a interface
const user: Authenticatable = {
    email: "user@example.com",
    password: "123",
    login() {
        console.log("Logging in...");
    },
    logout() {
        console.log("Logging out...");
    }
};


//classe que implementa a interface
class AuthenticatableUser implements Authenticatable {

    name: string;//pode add novas
    email: string;//recebe valores da interface
    password: string;

    constructor(name: string, email: string, password: string) {
        this.name = name;
        this.email = email;
        this.password = password;
    }

    login(): void {
        console.log("Logging in...");
    }

    logout(): void {
        console.log("Logging out...");
    }
}