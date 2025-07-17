const inputName = document.getElementById('name') as HTMLInputElement; //afirmação de tipo - conversão de tipo
/*
if (!inputName) { //se retorno for null
    throw new Error('Element with id "inputName" not found');
}
*/
console.log(inputName?.value); 


