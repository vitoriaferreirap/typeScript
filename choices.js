var Role;
(function (Role) {
    Role[Role["Admin"] = 0] = "Admin";
    Role[Role["Editor"] = 1] = "Editor";
    Role[Role["Guest"] = 2] = "Guest";
})(Role || (Role = {}));
var userRoles = Role.Admin;
console.log(userRoles); // Deve imprimir 0, pois Role.Admin = 0
