import axios from 'axios';
//acessando forms
const form = document.querySelector('form')!;
const addressInput = document.getElementById('address')! as HTMLInputElement; // não sabe que tipo de elemento é

const GOOGLE_API_KEY = 'AIzaSyCBIOXGzkHgk02n3rP3Hpn-nparsp28VgY'; 

declare var google: any; // Declaração para o objeto global google

type GeocodeResponse = {
    results: {
        geometry: {
            location: {
                lat: number;
                lng: number;
            };
        };
    }[];
    status: string;
};

function searchAddress(event: Event) {
    event.preventDefault();
    const enteredAddress = addressInput.value;

    //indo para a API do google
    axios.get<GeocodeResponse>(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(enteredAddress)}&key=${GOOGLE_API_KEY}`)
        .then(response => {
            //recuperar cordenadas
            if (response.data.status !== 'OK') {
                throw new Error('Could not fetch location!');
            }
            const coordinates = response.data.results[0].geometry.location;
            const map = new google.maps.Map(document.getElementById("map"), {
                center: coordinates,
                zoom: 15,
            });
            new google.maps.Marker({
                position: coordinates,
                map: map,
            });
        })
        .catch(error => {
            alert(error.message);
            console.error(error);
        });
}

form.addEventListener('submit', searchAddress);