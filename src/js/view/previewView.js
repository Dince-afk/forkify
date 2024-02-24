import View from './view';
import icons from '../../img/icons.svg';

class PreviewView extends View {
  _parentElement = '';
  _message;
  _errorMessage;

  _generateMarkup() {
    const hashId = window.location.hash.slice(1);
    const markup = `
    <li class="preview ${
      hashId === this._data.id ? 'preview__link--active' : ''
    }" data-hash="${this._data.id}">
        <a class="preview__link" href="#${this._data.id}">
          <figure class="preview__fig">
            <img src="${this._data.imageUrl}" alt="Test" />
          </figure>
          <div class="preview__data">
            <h4 class="preview__title">${this._data.title}</h4>
            <p class="preview__publisher">${this._data.publisher}</p>
            <div class="preview__user-generated">
              <svg>
                <use href="${icons}#icon-user"></use>
              </svg>
            </div>
          </div>
        </a>
      </li>
    `;
    return markup;
  }
}

export default new PreviewView();
