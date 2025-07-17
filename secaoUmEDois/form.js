var inputName = document.getElementById('name'); //afirmação de tipo - conversão de tipo
/*
if (!inputName) { //se retorno for null
    throw new Error('Element with id "inputName" not found');
}
*/
console.log(inputName === null || inputName === void 0 ? void 0 : inputName.value);
