"use strict";
var _person_role;
class User {
    constructor(nome, idade) {
        this.nome = nome;
        this.idade = idade;
    }
}
new User("João", 30);
class person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
        _person_role.set(this, 'admin');
        this.hobbiesPerson = [];
    }
    showName() {
        console.log(`Nome: ${this.name}`);
    }
}
_person_role = new WeakMap();
const m = new person("Maria", 25);
const j = new person("José", 40);
console.log(m, j);
//# sourceMappingURL=app.js.map