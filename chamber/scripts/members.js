// 1. Definimos la ruta del archivo JSON y seleccionamos el contenedor
const url = 'data/members.json';
const cards = document.querySelector('#members-container');

// 2. Función asíncrona para obtener los datos
async function getMembersData() {
    try {
        const response = await fetch(url);
        const data = await response.json();
        // console.table(data); // Descomenta esto si quieres ver los datos en la consola para probar
        displayMembers(data); // Llamamos a la función que dibuja las tarjetas
    } catch (error) {
        console.error('Error al cargar el JSON:', error);
    }
}

// 3. Función para construir las tarjetas HTML (El "Template")
const displayMembers = (members) => {
    // Limpiamos el contenedor por si acaso
    cards.innerHTML = '';

    members.forEach((member) => {
        // Creamos los elementos
        let card = document.createElement('section');
        let logo = document.createElement('img');
        let name = document.createElement('h3');
        let address = document.createElement('p');
        let phone = document.createElement('p');
        let website = document.createElement('a');

        // Llenamos el contenido con los datos del JSON
        name.textContent = member.names;
        address.textContent = member.address;
        phone.textContent = member.phone;
        
        // Configuramos la imagen
        logo.setAttribute('src', member.image);
        logo.setAttribute('alt', `Logo de ${member.names}`);
        logo.setAttribute('loading', 'lazy'); // Importante para el rendimiento
        logo.setAttribute('width', '100');
        logo.setAttribute('height', 'auto');

        // Configuramos el enlace
        website.textContent = 'Sitio Web';
        website.setAttribute('href', member.website);
        website.setAttribute('target', '_blank'); // Para abrir en nueva pestaña

        // Armamos la tarjeta (Append)
        card.appendChild(logo);
        card.appendChild(name);
        card.appendChild(address);
        card.appendChild(phone);
        card.appendChild(website);

        // Agregamos la tarjeta completa al contenedor principal
        cards.appendChild(card);
    });
}

// 4. Ejecutamos la función principal
getMembersData();


// --- LÓGICA DE BOTONES GRID / LIST ---

const gridBtn = document.querySelector("#grid");
const listBtn = document.querySelector("#list");
const display = document.querySelector("article"); // El contenedor #members-container

// Cuando hacen clic en GRID
gridBtn.addEventListener("click", () => {
    display.classList.add("grid-mode");
    display.classList.remove("list-mode");
});

// Cuando hacen clic en LIST
listBtn.addEventListener("click", () => {
    display.classList.add("list-mode");
    display.classList.remove("grid-mode");
});