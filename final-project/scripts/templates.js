export function recipeTemplate(recipe) {
    return `
        <article class="recipe-card">
            <img src="${recipe.image}" alt="Image of ${recipe.title}" loading="lazy">
            <div class="card-content">
                <h3>${recipe.title}</h3>
                
                <div class="recipe-info">
                    <span> ${recipe.readyInMinutes} min</span>
                    <span> ${recipe.servings} servings</span>
                </div>
                
                <button class="btn-details" data-id="${recipe.id}">View Details</button>
                
                <button class="btn-fav" data-id="${recipe.id}" aria-label="Save to favorites">
                     Save
                </button>
            </div>
        </article>
    `;
}


export function renderRecipes(recipeList) {
    if (!recipeList || recipeList.length === 0) {
        return '<p class="empty-message">No recipes found. Try another ingredient!</p>';
    }
    
    return recipeList.map(recipe => recipeTemplate(recipe)).join('');
}