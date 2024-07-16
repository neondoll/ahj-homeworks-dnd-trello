import BoardCard from './board-card';

export default class BoardColumn {
  constructor(container) {
    if (!(container instanceof HTMLElement)) {
      throw new Error('container is not HTMLElement');
    }

    this._container = container;
  }

  addCard(title) {
    const card = new BoardCard(this._cardsContainer);
    card.drawUI(title);

    card._element.classList.add('board-column__card');
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
      <form class="board-column__form hidden">
        <textarea class="board-column__textarea" placeholder="Enter a title for this card..."></textarea>
        <div class="board-column__btn-group">
          <button class="board-column__btn-submit" type="submit">Add Card</button>
          <button class="board-column__btn-reset" type="reset">✕</button>
        </div>
      </form>
      <button class="board-column__btn-add">Add another card</button>
    `;

    this._element = element;
    this._container.appendChild(element);

    this._btnAdd = this._element.querySelector(BoardColumn.btnAddSelector);
    this._cardsContainer = this._element.querySelector(BoardColumn.cardsSelector);
    this._form = this._element.querySelector(BoardColumn.formSelector);
    this._textarea = this._form.querySelector(BoardColumn.textareaSelector);
    this._title = this._element.querySelector(BoardColumn.titleSelector);

    this._cardsContainer.style.maxHeight = (this._container.offsetHeight - this._title.offsetHeight - this._btnAdd.offsetHeight - 17) + 'px';

    this._btnAdd.addEventListener('click', () => {
      this._btnAdd.classList.add('hidden');
      this._form.classList.remove('hidden');
    });
    this._form.addEventListener('reset', () => {
      this.formReset();
    });
    this._form.addEventListener('submit', (event) => {
      event.preventDefault();

      if (this._textarea.value) {
        this.addCard(this._textarea.value);
        this.formReset();
      }
      else {
        this._textarea.classList.add('invalid');
      }
    });
  }

  formReset() {
    this._btnAdd.classList.remove('hidden');
    this._form.classList.add('hidden');
    this._textarea.classList.remove('invalid');
    this._textarea.value = '';
  }

  static get btnAddSelector() { return '.board-column__btn-add'; }

  static get cardsSelector() { return '.board-column__cards'; }

  static get formSelector() { return '.board-column__form'; }

  static get textareaSelector() { return '.board-column__textarea'; }

  static get titleSelector() { return '.board-column__title'; }
}
