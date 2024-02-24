import View from './view';

class SearchView extends View {
  _parentElement = document.querySelector('.search');
  _inputElement = this._parentElement.querySelector('input');
  _errorMessage;
  _message;

  getSearchQuery() {
    const query = this._inputElement.value;
    this._clearInputField();
    return query;
  }

  _clearInputField() {
    this._inputElement.value = '';
  }

  addHandlerSearch(handler) {
    this._parentElement.addEventListener('submit', event => {
      event.preventDefault();
      handler();
    });
  }
}

export default new SearchView();
