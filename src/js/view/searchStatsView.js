import View from './view';

class SearchStatsView extends View {
  _parentElement = document.querySelector('.search-stats');

  _generateMarkup() {
    const markup = `
        <p>${this._data.recipes.length} recipes found</p>
    `;
    return markup;
  }
}

export default new SearchStatsView();
