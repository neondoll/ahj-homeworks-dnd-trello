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
    element.innerHTML = `<h3 class="board-card__title">${title}</h3>`;

    this._element = element;
    this._container.appendChild(element);
  }
}
