import View from './view';
import previewView from './previewView';

class ResultsView extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage = 'No results';

  _generateMarkup() {
    const markup = this._data
      .map(recipe => {
        return previewView.render(recipe, false);
      })
      .join('');
    return markup;
  }

  highlightSelectedRecipe(recipeId) {
    const childrenArray = Array.from(this._parentElement.children);

    childrenArray.forEach(recipePreview => {
      recipePreview.classList.remove('preview__link--active');
    });

    const selectedRecipe = childrenArray.find(
      el => el.dataset.hash === recipeId
    );

    selectedRecipe.classList.add('preview__link--active');
  }

  addHandlerSelect(handler) {
    ['hashchange'].forEach(eventType => {
      window.addEventListener(eventType, event => {
        handler(event);
      });
    });
  }
}

export default new ResultsView();
