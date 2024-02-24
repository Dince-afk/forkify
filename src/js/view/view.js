import icons from '../../img/icons.svg';

export default class View {
  _data;
  _parentElement;
  _message;
  _errorMessage = 'Error';

  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();
    this._data = data;
    const markup = this._generateMarkup();

    if (!render) return markup;

    this._clearMarkup();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  _generateMarkup() {
    // Must be implemented in subclass
  }

  _clearMarkup() {
    this._parentElement.innerHTML = '';
  }

  renderMessage(message = this._message) {
    const markup = `<div class="message">${message}</div>`;
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderError(errorMessage = this._errorMessage) {
    this._clearMarkup();
    const markup = `
    <div class="error">
            <div>
              <svg>
                <use href="${icons}#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${errorMessage}</p>
          </div>
    `;
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderSpinner() {
    this._clearMarkup();
    const markup = `
    <div class="spinner">
      <svg>
        <use href="${icons}#icon-loader"></use>
      </svg>
    </div>
    `;
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  update() {}
}
