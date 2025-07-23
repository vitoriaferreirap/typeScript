const appUser = {
    name: "Maria",
    age: 25,
    permissions:[{id: 1, titulo: "admin", description: "Acesso total" }]
}

type appUser = {
    name: string;
    age: number;
    permissions:{
        id: number;
        titulo: string;
        description: string
    }[];
}

//usando indexed access types
type Perms = appUser["permissions"];

/**
 * type Perms = {
 * id: number;
 * titulo: string;
 * description: string;
 * }[];
 */
