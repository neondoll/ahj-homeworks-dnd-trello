export default class BoardCard {
  constructor(container) {
    if (!(container instanceof HTMLElement)) {
      throw new Error('container is not HTMLElement');
    }

    this._container = container;
  }

  checkBinding() {
    if (this._container === undefined) {
      throw new Error('BoardCard not bind to DOM');
    }
  }

  drawUI(title) {
    this.checkBinding();

    const element = document.createElement('article');
    element.classList.add('board-card');
    element.innerHTML = `
      <h3 class="board-card__title">${title}</h3>
      <button class="board-card__btn-close hidden">✕</button>
    `;

    this._element = element;
    this._container.appendChild(element);

    this._btnClose = this._element.querySelector(BoardCard.btnCloseSelector);

    this._btnClose.addEventListener('click', () => {
      this._element.remove();
    });
    this._element.addEventListener('mouseout', () => {
      this._btnClose.classList.add('hidden');
    });
    this._element.addEventListener('mouseover', () => {
      this._btnClose.classList.remove('hidden');
    });
  }

  static get btnCloseSelector() { return '.board-card__btn-close'; }
}
