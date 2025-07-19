"use strict";
class Person {
    constructor(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }
    get _fullName() {
        return `${this.firstName}  ${this.lastName}`;
    }
    get _firstName() {
        return this.firstName;
    }
    get _lastName() {
        return this.lastName;
    }
    set _lastName(lastName) {
        if (lastName.trim() === "") {
            throw new Error("Last name cannot be empty");
        }
        this.lastName = lastName;
    }
    set _firstName(firstName) {
        if (firstName.trim() === "") {
            throw new Error("First name cannot be empty");
        }
        this.firstName = firstName;
    }
}
const max = new Person("Max", "Doe");
console.log(max._fullName);
max._lastName = "Smith";
console.log(max._lastName);
console.log(max._fullName);
class Employee extends Person {
    constructor(firstName, lastName, jobTitle) {
        super(firstName, lastName);
        this.jobTitle = jobTitle;
    }
    work() {
        console.log(this._firstName);
    }
}
//# sourceMappingURL=advanced.js.map