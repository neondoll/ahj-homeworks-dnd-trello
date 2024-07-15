import BoardCard from './board-card';

export default class BoardColumn {
  constructor(container) {
    if (!(container instanceof HTMLElement)) {
      throw new Error('container is not HTMLElement');
    }

    this._container = container;
    this._cards = [];
  }

  addCard(title) {
    const card = new BoardCard(this._cardsContainer);
    card.drawUI(title);

    card._element.classList.add('board-column__card');

    this._cards.push(card);
  }

  checkBinding() {
    if (this._container === undefined) {
      throw new Error('BoardColumn not bind to DOM');
    }
  }

  drawUI(title) {
    this.checkBinding();

    const element = document.createElement('section');
    element.classList.add('board-column');
    element.innerHTML = `
      <h2 class="board-column__title">${title}</h2>
      <div class="board-column__cards"></div>
      <button class="board-column__btn">Add another card</button>
    `;

    this._element = element;
    this._container.appendChild(element);

    this._btn = this._element.querySelector(BoardColumn.btnSelector);
    this._cardsContainer = this._element.querySelector(BoardColumn.cardsSelector);
    this._title = this._element.querySelector(BoardColumn.titleSelector);

    this._cardsContainer.style.maxHeight = (this._container.offsetHeight - this._title.offsetHeight - this._btn.offsetHeight - 17) + 'px';

    this._btn.addEventListener('click', () => {
      console.log('btn click');
    });
  }

  static get btnSelector() { return '.board-column__btn'; }

  static get cardsSelector() { return '.board-column__cards'; }

  static get titleSelector() { return '.board-column__title'; }
}
