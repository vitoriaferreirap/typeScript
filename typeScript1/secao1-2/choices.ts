/*
enum Role {
    Admin, // 0
    Editor,
    Guest,
}
    */

let userRoles: Role =  'Admin';

//tipos de união
type Role = 'Admin' | 'Editor' | 'Guest';
type User = {
    name: string;
    age: number;
    role: Role;
    permissioins: string[];
};
console.log(userRoles); 