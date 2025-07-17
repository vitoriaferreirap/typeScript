type User = {
    id: number;
    name: string;
    role?: 'admin' //? deixa o campo opcional
};

let input = ' ';
const didProvideInput = input ?? false;//se input for null ou undefined, retorna false