const myTown = document.querySelector('#town');
const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('figcaption');

const myKey = "658f550336c0d8b6b550aa0cb116c769";
const myLat = "49.748934657286576";
const myLon = "6.643951815517624";

const myURL = `https://api.openweathermap.org/data/2.5/weather?lat=${myLat}&lon=${myLon}&appid=${myKey}&units=imperial`;

async function apiFetch() {
  try {
    const response = await fetch(myURL);
    if (response.ok) {
      const data = await response.json();
      console.log(data); // testing only
      displayResults(data); // uncomment when ready
    } else {
        throw Error(await response.text());
    }
  } catch (error) {
      console.log(error);
  }
}

function displayResults(data) {
  console.log('hello'); // Para verificar que entra a la función
  
  // 1. Nombre de la ciudad (Este ya lo tenías bien)
  myTown.innerHTML = data.name;

  // 2. Temperatura
  // Error corregido: Cambié 'myTemperatura' por 'currentTemp' (tu variable de arriba)
  currentTemp.innerHTML = `${data.main.temp}&deg;F`;

  // 3. Icono del clima
  // Error corregido: Cambié 'data.weat' por 'data.weather'
  const iconsrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  
  // Error corregido: Cambié 'myGraphic' por 'weatherIcon' (tu variable de arriba)
  weatherIcon.setAttribute('src', iconsrc);
  weatherIcon.setAttribute('alt', data.weather[0].description);

  // 4. Descripción del clima
  // Error corregido: Cambié 'myDescription' por 'captionDesc'
  // Error corregido: Cambié 'data.wether' por 'data.weather'
  captionDesc.textContent = data.weather[0].description;
}

apiFetch();

