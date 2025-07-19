//interface é usada como um tipo para definir a estrutura de um objeto
interface Authenticatable {
    //apenas um tipo para o objeto
    //quem implementar essa interface deve ter esses métodos ha mais
    email: string;
    password: string;

    login(): void;
    logout(): void;
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