const url = 'data/members.json';
const cards = document.querySelector('#members-container');

async function getMembersData() {
    try {
        const response = await fetch(url);
        const data = await response.json();
        displayMembers(data); 
    } catch (error) {
        console.error('Error al cargar el JSON:', error);
    }
}

const displayMembers = (members) => {
    cards.innerHTML = '';

    members.forEach((member) => {
        let card = document.createElement('section');
        let logo = document.createElement('img');
        let name = document.createElement('h3');
        let address = document.createElement('p');
        let phone = document.createElement('p');
        let website = document.createElement('a');

        name.textContent = member.names;
        address.textContent = member.address;
        phone.textContent = member.phone;

        logo.setAttribute('src', member.image);
        logo.setAttribute('alt', `Logo de ${member.names}`);
        logo.setAttribute('loading', 'lazy'); 
        logo.setAttribute('width', '100');
        logo.setAttribute('height', 'auto');

        website.textContent = 'Sitio Web';
        website.setAttribute('href', member.website);
        website.setAttribute('target', '_blank'); 

        card.appendChild(logo);
        card.appendChild(name);
        card.appendChild(address);
        card.appendChild(phone);
        card.appendChild(website);

        cards.appendChild(card);
    });
}

getMembersData();

const gridBtn = document.querySelector("#grid");
const listBtn = document.querySelector("#list");
const display = document.querySelector("article"); 

gridBtn.addEventListener("click", () => {
    display.classList.add("grid-mode");
    display.classList.remove("list-mode");
});

listBtn.addEventListener("click", () => {
    display.classList.add("list-mode");
    display.classList.remove("grid-mode");
});