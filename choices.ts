enum Role {
    Admin, // 0
    Editor,
    Guest,
}

let userRoles: Role =  Role.Admin;
console.log(userRoles); // Deve imprimir 0, pois Role.Admin = 0