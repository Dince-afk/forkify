import View from './view';
import icons from '../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerPage(handler) {
    this._parentElement.addEventListener('click', event => {
      console.log(event.target);
      const parentBtn = event.target.closest('.btn--inline');
      if (!parentBtn) return;
      const toPage = +parentBtn.dataset.toPage;
      handler(toPage);
    });
  }

  _generateMarkup() {
    const curPage = this._data.curPage;
    const numTotalPages = this._data.numTotalPages;

    // 1) First site: if current page === 1
    if (curPage === 1 && numTotalPages > 1) {
      return `
        </button>
        <button class="btn--inline pagination__btn--next" data-to-page="${
          curPage + 1
        }">
          <span>Page ${curPage + 1}</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
      </button>
  `;

      // 2) Last site: if current page === recipes.length
    } else if (curPage === numTotalPages && numTotalPages > 1) {
      return `
        <button class="btn--inline pagination__btn--prev" data-to-page="${
          curPage - 1
        }">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${curPage - 1}</span>
          </button>
    `;

      // 3) In between site: else
    } else if (curPage < numTotalPages) {
      return `
        <button class="btn--inline pagination__btn--prev" data-to-page="${
          curPage - 1
        }">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${curPage - 1}</span>
          </button>
          <button class="btn--inline pagination__btn--next" data-to-page="${
            curPage + 1
          }">
            <span>Page ${curPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
        </button>
    `;
    }
    // 4) Only one page. No pagination needed
    return '';
  }
}

export default new PaginationView();
