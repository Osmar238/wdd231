const API_KEY = '4ac4e0c3a3e04c0c91d211e44bd0aec8'; 
const BASE_URL = 'https://api.spoonacular.com/recipes/complexSearch';

export async function getRecipes(query) {
    const url = `${BASE_URL}?apiKey=${API_KEY}&includeIngredients=${query}&number=15&addRecipeInformation=true`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }

        const data = await response.json();
        return data.results;

    } catch (error) {
        console.error('Fallo al conectar con la API:', error);
        console.warn('Intentando cargar datos locales de respaldo...');
        
        try {
            const localResponse = await fetch('./scripts/recipes.json');
            const localData = await localResponse.json();
            return localData;
        } catch (localError) {
            console.error('Error crítico: No se pudieron cargar datos locales.', localError);
            return [];
        }
    }
}