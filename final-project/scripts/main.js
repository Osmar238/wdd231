console.log("Main.js cargado correctamente");

document.addEventListener('DOMContentLoaded', () => {
    const menuBtn = document.getElementById('menu-btn');
    const navMenu = document.getElementById('nav-menu');

    if (menuBtn && navMenu) {
        menuBtn.addEventListener('click', () => {
            navMenu.classList.toggle('open');
            menuBtn.textContent = navMenu.classList.contains('open') ? 'X' : '☰';
        });
    }
});

import { getRecipes } from './api.js';
import { renderRecipes } from './templates.js';
import { saveRecipe, getSavedRecipes, removeRecipe } from './storage.js';

const resultsContainer = document.getElementById('results-container');
const favoritesContainer = document.getElementById('favorites-container');
const modal = document.getElementById('recipe-modal');

function showToast(message, type = 'success') {
    let toast = document.getElementById('toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'toast';
        document.body.appendChild(toast);
    }

    toast.textContent = message;
    toast.className = `show ${type}`; 


    setTimeout(() => {
        toast.className = toast.className.replace('show', '');
    }, 3000);
}

let currentRecipes = [];

async function handleSearch() {
    const searchInput = document.getElementById('search-input');
    const query = searchInput.value.trim();
    
    if (!query) {
        showToast("Please enter an ingredient", "error");
        return;
    }

    resultsContainer.innerHTML = '<p class="loading">Searching...</p>';

    currentRecipes = await getRecipes(query);
    

    resultsContainer.innerHTML = renderRecipes(currentRecipes);
}

function handleGlobalClick(event) {
    const target = event.target;
    

    if (target.closest('.btn-details')) {
        const btn = target.closest('.btn-details');
        const id = btn.dataset.id;
        const recipe = currentRecipes.find(r => r.id == id) || getSavedRecipes().find(r => r.id == id);
        
        if(recipe) openModal(recipe);
    }


    if (target.closest('.btn-fav') && !favoritesContainer) {
        const btn = target.closest('.btn-fav');
        const id = btn.dataset.id;
        const recipe = currentRecipes.find(r => r.id == id);
        
        if (recipe) {
            const result = saveRecipe(recipe);
            showToast(result.message, result.success ? 'success' : 'error');
        }
    }
}


function loadFavorites() {

    const saved = getSavedRecipes();

    if (saved && saved.length > 0) {
        favoritesContainer.innerHTML = renderRecipes(saved);

        const favButtons = favoritesContainer.querySelectorAll('.btn-fav');
        favButtons.forEach(btn => {
            btn.innerHTML = "Remove";
            btn.style.backgroundColor = "#ffebee";
            btn.style.color = "#c62828";
            
            btn.addEventListener('click', (e) => {
                e.stopPropagation(); 
                const id = btn.dataset.id;
                removeRecipe(id);
                showToast("Recipe removed", "error");
                loadFavorites(); 
            });
        });
    } else {
        favoritesContainer.innerHTML = '<p>You haven\'t saved any recipes yet.</p>';
    }
}

function openModal(recipe) {
    if (!modal) return;
    const title = document.getElementById('modal-title');
    const body = document.getElementById('modal-body');
    
    title.textContent = recipe.title;
    body.innerHTML = `
    <img src="${recipe.image}" alt="${recipe.title}" style="width:100%; border-radius:8px; margin-bottom:10px;">
    
    <div class="modal-summary">${recipe.summary || 'No description available.'}</div>

    <p><strong>Time:</strong> ${recipe.readyInMinutes} min</p>
    <p><strong>Servings:</strong> ${recipe.servings}</p>
`;
    modal.showModal();
}

const closeModalBtn = document.getElementById('close-modal');
if (closeModalBtn) closeModalBtn.addEventListener('click', () => modal.close());

document.addEventListener('DOMContentLoaded', () => {
    const searchBtn = document.getElementById('search-btn');
    if (searchBtn) {
        searchBtn.addEventListener('click', handleSearch);
        document.getElementById('search-input').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') handleSearch();
        });
    }

    document.body.addEventListener('click', handleGlobalClick);

    if (favoritesContainer) {
        loadFavorites();
    }

    const menuBtn = document.getElementById('menu-btn');
    const navMenu = document.getElementById('nav-menu');
    if (menuBtn && navMenu) {
        menuBtn.addEventListener('click', () => {
            navMenu.classList.toggle('open');
            menuBtn.textContent = navMenu.classList.contains('open') ? 'X' : '☰';
        });
    }
});