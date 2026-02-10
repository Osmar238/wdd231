
import { places } from '../data/places.mjs';

const placesContainer = document.querySelector('#places-grid');

function displayPlaces(placesList) {
    placesList.forEach(place => {
        const card = document.createElement('div');
        card.classList.add('place-card');
        
        card.innerHTML = `
            <h2>${place.name}</h2>
            <figure>
                <img src="${place.image}" alt="${place.name}" loading="lazy" width="300" height="200">
            </figure>
            <address>${place.address}</address>
            <p>${place.description}</p>
            <button>Learn More</button>
        `;
        
        placesContainer.appendChild(card);
    });
}

displayPlaces(places);


const visitMessage = document.querySelector('#visit-message');
const msToDays = 84600000; 
const now = Date.now();

let lastVisit = window.localStorage.getItem('lastVisit-ls');

if (!lastVisit) {

    visitMessage.innerHTML = `<p>Welcome! Let us know if you have any questions.</p>`;
} else {

    const daysSince = (now - lastVisit) / msToDays;
    
    if (daysSince < 1) {
        visitMessage.innerHTML = `<p>Back so soon! Awesome!</p>`;
    } else {

        const days = Math.floor(daysSince);
        const dayWord = days === 1 ? "day" : "days";
        visitMessage.innerHTML = `<p>You last visited ${days} ${dayWord} ago.</p>`;
    }
}

window.localStorage.setItem('lastVisit-ls', now);