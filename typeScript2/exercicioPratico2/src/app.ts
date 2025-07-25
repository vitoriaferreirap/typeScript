//acessando forms
const form = document.querySelector('form')!;
const addressInput = document.getElementById('address')! as HTMLInputElement; // não sabe que tipo de elemento é

function searchAddress(event: Event) {
    event.preventDefault();
    const enteredAddress = addressInput.value;

    //indo para a API do google
}

form.addEventListener('submit', searchAddress);