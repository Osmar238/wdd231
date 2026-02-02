
const hamButton = document.querySelector('#menu-toggle');
const navigation = document.querySelector('nav');

if (hamButton) { 
    hamButton.addEventListener('click', () => {
        navigation.classList.toggle('open');
        hamButton.classList.toggle('open');
    });
}
const yearSpan = document.querySelector("#year");
if (yearSpan) yearSpan.textContent = new Date().getFullYear();

const lastModifiedSpan = document.querySelector("#lastModified");
if (lastModifiedSpan) lastModifiedSpan.textContent = `Last Modification: ${document.lastModified}`;

const directoryContainer = document.querySelector('#members-container');

if (directoryContainer) {
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
        directoryContainer.innerHTML = '';
        
        members.forEach((member) => {
            let card = document.createElement('section');
            let name = document.createElement('h3');
            let logo = document.createElement('img');
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

            directoryContainer.appendChild(card);
        });
    }

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
    getDirectoryData();
}
const spotlightContainer = document.querySelector('#spotlights');

if (spotlightContainer) {
    async function getSpotlights() {
        const url = 'data/members.json';
        try {
            const response = await fetch(url);
            const data = await response.json();

            const vipMembers = data.filter(member => member.membershipLevel === 2 || member.membershipLevel === 3);

            const shuffled = vipMembers.sort(() => 0.5 - Math.random());

            const selected = shuffled.slice(0, 3);

            displaySpotlights(selected);
        } catch (error) {
            console.error('Error cargando spotlights:', error);
        }
    }

    const displaySpotlights = (members) => {
        spotlightContainer.innerHTML = '';
        
        members.forEach(member => {
            let card = document.createElement('div');
            card.classList.add('spotlight-card'); 
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

    getSpotlights();


    const apiKey = '658f550336c0d8b6b550aa0cb116c769'; 
    const lat = 40.7128; 
    const lon = -74.0060;
    
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
        const current = data.list[0];
        const temp = current.main.temp.toFixed(0);
        const desc = current.weather[0].description;
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
        forecastDiv.innerHTML = '';
        const dailyForecast = data.list.filter(item => item.dt_txt.includes('12:00:00'));

        const threeDays = dailyForecast.slice(0, 3);

        threeDays.forEach(day => {
            const date = new Date(day.dt * 1000); 
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

    fetchWeather();
}

const joinForm = document.querySelector('#timestamp');

if (joinForm) {
    document.querySelector('#timestamp').value = new Date().toISOString();


    const modals = [
        { btn: '#np-btn', modal: '#np-modal' },
        { btn: '#bronze-btn', modal: '#bronze-modal' },
        { btn: '#silver-btn', modal: '#silver-modal' },
        { btn: '#gold-btn', modal: '#gold-modal' }
    ];

    modals.forEach(item => {
        const btn = document.querySelector(item.btn);
        const modal = document.querySelector(item.modal);
        const closeBtn = modal.querySelector('.close-modal');


        btn.addEventListener('click', () => {
            modal.showModal();
        });


        closeBtn.addEventListener('click', () => {
            modal.close();
        });
    });
}

const resultsContainer = document.querySelector('#results-fname');

if (resultsContainer) {
    const urlParams = new URLSearchParams(window.location.search);

    document.querySelector('#results-fname').textContent = urlParams.get('fname');
    document.querySelector('#results-lname').textContent = urlParams.get('lname');
    document.querySelector('#results-email').textContent = urlParams.get('email');
    document.querySelector('#results-phone').textContent = urlParams.get('phone');
    document.querySelector('#results-org').textContent = urlParams.get('org');
    document.querySelector('#results-timestamp').textContent = urlParams.get('timestamp');
}