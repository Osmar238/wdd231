const hamButton = document.querySelector('#menu-toggle');
const navigation = document.querySelector('nav');

hamButton.addEventListener('click', () => {
	navigation.classList.toggle('open');
	hamButton.classList.toggle('open');
});

const yearSpan = document.querySelector("#year");
const currentYear = new Date().getFullYear();
yearSpan.textContent = currentYear;

const lastModifiedSpan = document.querySelector("#lastModified");
lastModifiedSpan.textContent = `Last Modification: ${document.lastModified}`;