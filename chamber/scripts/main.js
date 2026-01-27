// ======================================================
// 1. CÓDIGO GENERAL (Funciona en todas las páginas: Menú y Footer)
// ======================================================

// --- Menú Hamburguesa ---
const hamButton = document.querySelector('#menu-toggle');
const navigation = document.querySelector('nav');

if (hamButton) { 
    hamButton.addEventListener('click', () => {
        navigation.classList.toggle('open');
        hamButton.classList.toggle('open');
    });
}

// --- Footer: Año y Última Modificación ---
const yearSpan = document.querySelector("#year");
if (yearSpan) yearSpan.textContent = new Date().getFullYear();

const lastModifiedSpan = document.querySelector("#lastModified");
if (lastModifiedSpan) lastModifiedSpan.textContent = `Last Modification: ${document.lastModified}`;


// ======================================================
// 2. CÓDIGO SOLO PARA EL DIRECTORIO (directory.html)
// ======================================================
// Buscamos el contenedor específico del directorio
const directoryContainer = document.querySelector('#members-container');

if (directoryContainer) {
    // Solo entramos aquí si estamos en directory.html
    const url = 'data/members.json';

    async function getDirectoryData() {
        try {
            const response = await fetch(url);
            const data = await response.json();
            displayDirectory(data);
        } catch (error) {
            console.error('Error cargando el directorio:', error);
        }
    }

    const displayDirectory = (members) => {
        directoryContainer.innerHTML = ''; // Limpiar lista
        
        members.forEach((member) => {
            // Crear elementos HTML
            let card = document.createElement('section');
            let name = document.createElement('h3');
            let logo = document.createElement('img');
            let address = document.createElement('p');
            let phone = document.createElement('p');
            let website = document.createElement('a');

            // Asignar contenido del JSON
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

            // Agregar al DOM
            card.appendChild(logo);
            card.appendChild(name);
            card.appendChild(address);
            card.appendChild(phone);
            card.appendChild(website);

            directoryContainer.appendChild(card);
        });
    }

    // --- Lógica de Botones Grid/List (Solo Directorio) ---
    const gridBtn = document.querySelector("#grid");
    const listBtn = document.querySelector("#list");

    if (gridBtn && listBtn) {
        gridBtn.addEventListener("click", () => {
            directoryContainer.classList.add("grid-mode");
            directoryContainer.classList.remove("list-mode");
        });

        listBtn.addEventListener("click", () => {
            directoryContainer.classList.add("list-mode");
            directoryContainer.classList.remove("grid-mode");
        });
    }

    // Llamamos a la función
    getDirectoryData();
}


// ======================================================
// 3. CÓDIGO SOLO PARA EL HOME (index.html)
// ======================================================
// Buscamos el contenedor específico de Spotlights
const spotlightContainer = document.querySelector('#spotlights');

if (spotlightContainer) {
    // Solo entramos aquí si estamos en index.html

    // --- A. SPOTLIGHTS (Miembros Destacados) ---
    async function getSpotlights() {
        const url = 'data/members.json';
        try {
            const response = await fetch(url);
            const data = await response.json();

            // 1. FILTRAR: Solo miembros Silver (2) o Gold (3)
            const vipMembers = data.filter(member => member.membershipLevel === 2 || member.membershipLevel === 3);

            // 2. ALEATORIZAR: Mezclar la lista
            const shuffled = vipMembers.sort(() => 0.5 - Math.random());

            // 3. SELECCIONAR: Tomar solo los primeros 3
            const selected = shuffled.slice(0, 3);

            // 4. MOSTRAR
            displaySpotlights(selected);
        } catch (error) {
            console.error('Error cargando spotlights:', error);
        }
    }

    const displaySpotlights = (members) => {
        spotlightContainer.innerHTML = '';
        
        members.forEach(member => {
            let card = document.createElement('div');
            card.classList.add('spotlight-card'); // Clase CSS para estilos

            // Usamos una función simple para obtener el nombre del nivel
            const levelName = member.membershipLevel === 3 ? 'Gold' : 'Silver';

            card.innerHTML = `
                <h3>${member.names}</h3>
                <img src="${member.image}" alt="${member.names}" style="max-width:100px; height:auto;">
                <p><strong>Phone:</strong> ${member.phone}</p>
                <p><strong>Address:</strong> ${member.address}</p>
                <p><strong>Level:</strong> ${levelName} Member</p>
                <a href="${member.website}" target="_blank">Visit Website</a>
            `;
            
            spotlightContainer.appendChild(card);
        });
    }

    // Llamamos a la función de Spotlights
    getSpotlights();


    // --- B. CLIMA (OpenWeatherMap) ---
    const apiKey = '658f550336c0d8b6b550aa0cb116c769'; 
    const lat = 40.7128; // New York Coordinates
    const lon = -74.0060;
    
    // URL para obtener pronóstico de 5 días / 3 horas
    const weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;

    async function fetchWeather() {
        try {
            const response = await fetch(weatherUrl);
            if (response.ok) {
                const data = await response.json();
                displayCurrentWeather(data);
                displayForecast(data);
            } else {
                throw Error(await response.text());
            }
        } catch (error) {
            console.error('Error cargando el clima:', error);
        }
    }

    function displayCurrentWeather(data) {
        // El primer ítem de la lista es el clima actual (o más cercano)
        const current = data.list[0];
        const temp = current.main.temp.toFixed(0);
        const desc = current.weather[0].description; // descripción (ej: overcast clouds)
        const iconCode = current.weather[0].icon;
        const iconSrc = `https://openweathermap.org/img/w/${iconCode}.png`;

        const weatherDiv = document.querySelector('#weather-data');
        weatherDiv.innerHTML = `
            <div style="display:flex; align-items:center; gap:15px; margin-bottom:10px;">
                <img src="${iconSrc}" alt="${desc}" width="60" height="60">
                <span style="font-size: 2.5rem; font-weight:bold;">${temp}&deg;F</span>
            </div>
            <p style="text-transform: capitalize; font-size: 1.2rem; margin:0;">${desc}</p>
        `;
    }

    function displayForecast(data) {
        const forecastDiv = document.querySelector('#forecast');
        forecastDiv.innerHTML = ''; // Limpiar contenido previo

        // Filtramos para obtener una lectura por día (buscando la hora 12:00:00)
        // La API devuelve fechas en formato texto "2024-10-25 12:00:00"
        const dailyForecast = data.list.filter(item => item.dt_txt.includes('12:00:00'));

        // Tomamos los primeros 3 días
        const threeDays = dailyForecast.slice(0, 3);

        threeDays.forEach(day => {
            const date = new Date(day.dt * 1000); // Convertir a fecha JS
            // Obtener nombre del día (Mon, Tue, Wed...)
            const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
            const temp = day.main.temp.toFixed(0);
            const icon = day.weather[0].icon;
            
            const dayElement = document.createElement('div');
            dayElement.style.display = "flex";
            dayElement.style.justifyContent = "space-between";
            dayElement.style.alignItems = "center";
            dayElement.style.padding = "5px 0";
            dayElement.style.borderBottom = "1px solid #eee";

            dayElement.innerHTML = `
                <span style="font-weight:bold;">${dayName}</span>
                <img src="https://openweathermap.org/img/w/${icon}.png" alt="icon" width="30">
                <span>${temp}&deg;F</span>
            `;

            forecastDiv.appendChild(dayElement);
        });
    }

    // Llamamos a la función del Clima
    fetchWeather();
}