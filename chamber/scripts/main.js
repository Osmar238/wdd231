// 1. Lógica del Menú Hamburguesa
const hamButton = document.querySelector('#menu-toggle');
const navigation = document.querySelector('nav');

hamButton.addEventListener('click', () => {
	navigation.classList.toggle('open');
	hamButton.classList.toggle('open');
});

// 2. Lógica del Footer (Año y Última Modificación)
// Obtener el año actual
const yearSpan = document.querySelector("#year");
const currentYear = new Date().getFullYear();
yearSpan.textContent = currentYear;

// Obtener la última modificación del documento
const lastModifiedSpan = document.querySelector("#lastModified");
lastModifiedSpan.textContent = `Last Modification: ${document.lastModified}`;