import { timeOutRejection, toCamelCase } from '../helper/helper';
import { config } from '../../../config/config';
const fs = require('fs');
// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
export let state = {
  currentRecipe: {},
  recipes: [],
  curPage: 1,
  query: '',
  recipesPerPagination: config.recipesPerPagination,
  numTotalPages: null,

  /**
   * Fetches recipes for a given search query.
   * @param {string} search - The search query.
   * @throws {Error} If there is an error during the fetch operation.
   */
  async fetchRecipesFor(search) {
    try {
      // 1) Fetch data
      const response = await Promise.race([
        fetch(
          `${config.apiBaseURL}/recipes?search=${search}&key=${config.apiKey}`
        ),
        timeOutRejection(30),
      ]);

      // 2) Parse data into required objects
      const data = await response.json();
      this.recipes = data['data']['recipes'].map(toCamelCase);

      // 3) Set pagination information
      this.numTotalPages = Math.ceil(
        this.recipes.length / this.recipesPerPagination
      ); // -> 56 / 10 = 5,6 -> 6 pages
    } catch (error) {
      throw error;
    }
  },

  async fetchRecipeByID(id) {
    try {
      const response = await Promise.race([
        fetch(`${config.apiBaseURL}/recipes/${id}?key=${config.apiKey}`),
        timeOutRejection(30),
      ]);
      const data = await response.json();
      const rawRecipe = data['data']['recipe'];
      const recipe = toCamelCase(rawRecipe);
      this.currentRecipe = recipe;
    } catch (error) {
      console.log(error);
    }
  },

  getRecipesForPagination(page = 1) {
    this.curPage = page;
    const startIndex = (page - 1) * this.recipesPerPagination;
    const endIndex = startIndex + this.recipesPerPagination;
    return this.recipes.slice(startIndex, endIndex);
  },

  /**
   * Changes the servings amount for the current recipe and updates the ingredient quantities accordingly.
   * @param {number} newServingsAmount - The new amount of servings for the recipe.
   */
  changeRecipesServings(newServingsAmount) {
    this.currentRecipe.ingredients.forEach(ingrediantInfo => {
      const amountForOneServing =
        ingrediantInfo.quantity / this.currentRecipe.servings;
      const amountForNewTotalServings = amountForOneServing * newServingsAmount;
      ingrediantInfo.quantity = amountForNewTotalServings;
    });

    this.currentRecipe.servings = newServingsAmount;
  },

  writeJsonFile() {
    const recipesAsStr = JSON.stringify(this.recipes);

    // Create a blob with MIME type as JSON
    const blob = new Blob([recipesAsStr], { type: 'application/json' });

    // Create a link and trigger a download
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'myObject.json';
    document.body.appendChild(a); // Append the link to the document
    a.click(); // Simulate click on the link to trigger the download
    document.body.removeChild(a); // Remove the link from the document
  },
};
