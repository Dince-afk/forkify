import { state } from './model/model';
import searchView from './view/searchView';
import resultsView from './view/resultsView';
import recipeView from './view/recipeView';
import paginationView from './view/paginationView';
import searchStatsView from './view/searchStatsView';

if (module.hot) {
  module.hot.accept();
}

// Controls the user's search for recipes
async function controlRecipesSearch() {
  resultsView.renderSpinner();

  // 1) Get search keyword from user input
  const searchValue = searchView.getSearchQuery();

  // 2) Fetch data for search keyword
  await state.fetchRecipesFor(searchValue);

  // 3) Render the recipes
  resultsView.render(state.getRecipesForPagination());

  // 4) Render initial pagination buttons
  paginationView.render(state);

  // 5) Render results stats
  searchStatsView.render(state);

  // 99) save recipes to file
  // state.writeJsonFile();
}

// Controls the state of pagination and user's interaction with navigating through pages
function controlPagination(goToPage) {
  // 1) Render NEW recipes results
  resultsView.render(state.getRecipesForPagination(goToPage));

  // 2) Render NEW pagination buttons
  paginationView.render(state);
}

// Controls the user's selection of recipes from results view
async function controlSelectRecipe() {
  recipeView.renderSpinner();

  // 1) Find recipe id by selecting changed hash vale
  const recipeId = window.location.hash.slice(1);

  // 2) Update results view to show selected recipe highlighted
  resultsView.highlightSelectedRecipe(recipeId);

  // 3) Fetch recipe data for captured hash value
  await state.fetchRecipeByID(recipeId);

  // 4) Render the current recipe that was just fetched
  recipeView.render(state.currentRecipe);
}

// Controls the user's changing of current recipe's servings
function controlChangeServings(newServings) {
  if (newServings < 1) return;

  // 1) Change current recipes servings
  state.changeRecipesServings(newServings);

  // 2) Render the new recipe with updated servings
  recipeView.render(state.currentRecipe);
}

// function controlServingsChanges() {
//   state.changeCurrentRecipesServings(5);
// }

function init() {
  searchView.addHandlerSearch(controlRecipesSearch);
  resultsView.addHandlerSelect(controlSelectRecipe);
  paginationView.addHandlerPage(controlPagination);
  recipeView.addHandlerServings(controlChangeServings);
}

init();
