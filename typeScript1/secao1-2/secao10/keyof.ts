type User = { name: string; age: number };
type UserKey = keyof User; // "name" | "age"


let validKey: UserKey; //pode receber tanto string como numero , nessa ordem

validKey = "name"; // válido
validKey = "age", 25; // válido
//validKey = 1;
//validKey = 30, 25;

//keyof é util aqui para vincular dois placeholders, o primeiro é o objeto e o segundo é  o tipo da chave do objeto
function getProp<T extends object, U extends keyof T>(obj: T, key: U) {
    const val = obj[key];

    if(val == undefined || val == null) {
        throw new Error(`A propriedade key não existe ou é nula`);
    }   
    return val;
}

const data = { id: 1, isStored: false, values: [1, 2, 3] };
const isStored = getProp(data, "isStored"); // false

const user = { name: "Maria", age: 25 };
const val = getProp(user, "age"); // "Maria"