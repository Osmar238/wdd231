const SAVE_KEY = 'smartplate-favorites';

export function getSavedRecipes() {
    const saved = localStorage.getItem(SAVE_KEY);
    return saved ? JSON.parse(saved) : [];
}

export function saveRecipe(recipe) {
    const saved = getSavedRecipes();
    
    if (saved.some(r => r.id === recipe.id)) {
        return { success: false, message: 'Recipe already in favorites!' };
    }

    saved.push(recipe);
    localStorage.setItem(SAVE_KEY, JSON.stringify(saved));
    return { success: true, message: 'Recipe saved to favorites!' };
}

export function removeRecipe(id) {
    const saved = getSavedRecipes();
    const updated = saved.filter(r => r.id != id);
    localStorage.setItem(SAVE_KEY, JSON.stringify(updated));
}