"use strict";
const user = {
    email: "user@example.com",
    password: "123",
    login() {
        console.log("Logging in...");
    },
    logout() {
        console.log("Logging out...");
    }
};
class AuthenticatableUser {
    constructor(name, email, password) {
        this.name = name;
        this.email = email;
        this.password = password;
    }
    login() {
        console.log("Logging in...");
    }
    logout() {
        console.log("Logging out...");
    }
}
//# sourceMappingURL=interfaces.js.map