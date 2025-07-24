namespace App{
    
    //Validation usando interfaces
    //A interface Validatable define as regras de validação que podem ser aplicadas a diferentes tipos de dados.
    //Ela pode ser usada para validar strings, números ou outros tipos de dados que atendam aos critérios especificados.
    export interface Validatable {
        value: string | number; //pode ser string ou number
        required?: boolean;
        minLength?: number;
        maxLength?: number;
        min?: number;
        max?: number;
    }
    //fuction de validação que usará a interface Validatable para validar os dados de entrada.
    export function validate(validatableInput: Validatable) {
        let isValid = true; //variável para armazenar o resultado da validação

        if (validatableInput.required) {
            isValid = isValid && validatableInput.value.toString().trim().length !== 0; //verifica se o valor é obrigatório e não está vazio
        }
        if (validatableInput.minLength != null && typeof validatableInput.value === 'string') {
            isValid = isValid && validatableInput.value.length >= validatableInput.minLength; //verifica se o valor atende ao comprimento mínimo
        }
        if (validatableInput.maxLength != null && typeof validatableInput.value === 'string') {
            isValid = isValid && validatableInput.value.length <= validatableInput.maxLength; //verifica se o valor atende ao comprimento máximo
        }
        if (validatableInput.min != null && typeof validatableInput.value === 'number') {
            isValid = isValid && validatableInput.value >= validatableInput.min; //verifica se o valor é maior ou igual ao mínimo
        }
        if (validatableInput.max != null && typeof validatableInput.value === 'number') {
            isValid = isValid && validatableInput.value <= validatableInput.max; //verifica se o valor é menor ou igual ao máximo
        }

        return isValid; //retorna o resultado da validação
    }
}