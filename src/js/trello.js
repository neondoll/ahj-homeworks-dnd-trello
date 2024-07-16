import TrelloState from './trello-state';

export default class Trello {
  constructor() {
    this._state = new TrelloState();
  }

  addEventListeners() {
    this._container.addEventListener('click', this.onClick.bind(this));
  }

  bindToDOM(container) {
    if (!(container instanceof HTMLElement)) {
      throw new Error('container is not HTMLElement');
    }

    this._container = container;
  }

  checkBinding() {
    if (this._container === undefined) {
      throw new Error('Trello not bind to DOM');
    }
  }

  drawUI() {
    this.checkBinding();

    this._container.innerHTML = Trello.markup;
    this._board = this._container.querySelector(Trello.boardSelector);
    this._state.loadData();
    this.redrawDOM();
  }

  onClick(event) {
    if (event.target.classList.contains('trello-column__btn-add')) {
      this.onClickBtnAdd(event);
    }

    if (event.target.classList.contains('trello-form__btn-reset')) {
      this.onResetForm(event);
    }

    if (event.target.classList.contains('trello-form__btn-submit')) {
      return this.onSubmitForm(event);
    }

    if (event.target.classList.contains('trello-card__btn-delete')) {
      return this.onClickBtnDelete(event);
    }
  }

  onClickBtnAdd(event) {
    [...this._container.querySelectorAll(Trello.footerSelector)].forEach((element) => {
      element.querySelector(Trello.btnAddSelector).classList.remove('hidden');
      element.querySelector(Trello.formSelector).classList.add('hidden');
    });

    const column = event.target.closest(Trello.columnSelector);
    const columnBody = column.querySelector(Trello.columnBodySelector);
    const columnHeader = column.querySelector(Trello.columnHeaderSelector);
    const columnFooter = event.target.closest(Trello.columnFooterSelector);
    const form = event.target.closest(Trello.footerSelector).querySelector(Trello.formSelector);
    const textarea = form.querySelector(Trello.formTextareaSelector);

    event.target.classList.add('hidden');
    form.classList.remove('hidden');
    textarea.focus();

    columnBody.style.maxHeight = (this._board.offsetHeight - columnHeader.offsetHeight - columnFooter.offsetHeight) + 'px';
  }

  onClickBtnDelete(event) {
    const cardId = event.target.closest(Trello.cardSelector).dataset.id;
    const columnBody = event.target.closest(Trello.columnBodySelector);

    this._state.deleteDataItem(columnBody.dataset.name, cardId);
    this.redrawColumnBody(columnBody);
    this._state.saveData();
  }

  onResetForm(event) {
    const column = event.target.closest(Trello.columnSelector);
    const columnBody = column.querySelector(Trello.columnBodySelector);
    const columnHeader = column.querySelector(Trello.columnHeaderSelector);
    const columnFooter = event.target.closest(Trello.columnFooterSelector);
    const btnAdd = event.target.closest(Trello.footerSelector).querySelector(Trello.btnAddSelector);
    const form = event.target.closest(Trello.formSelector);
    const textarea = form.querySelector(Trello.formTextareaSelector);

    btnAdd.classList.remove('hidden');
    form.classList.add('hidden');
    textarea.value = '';

    columnBody.style.maxHeight = (this._board.offsetHeight - columnHeader.offsetHeight - columnFooter.offsetHeight) + 'px';
  }

  onSubmitForm(event) {
    event.preventDefault();

    const form = event.target.closest(Trello.formSelector);
    const textarea = form.querySelector(Trello.formTextareaSelector);

    const title = textarea.value;

    if (title) {
      const btnAdd = event.target.closest(Trello.footerSelector).querySelector(Trello.btnAddSelector);
      const columnBody = event.target.closest(Trello.columnSelector).querySelector(Trello.columnBodySelector);

      this._state.addDataItem(columnBody.dataset.name, title);
      this.redrawColumnBody(columnBody);

      btnAdd.classList.remove('hidden');
      form.classList.add('hidden');
      textarea.value = '';

      this._state.saveData();
    }
  }

  redrawColumnBody(columnBody) {
    const column = columnBody.closest(Trello.columnSelector);
    const columnHeader = column.querySelector(Trello.columnHeaderSelector);
    const columnFooter = column.querySelector(Trello.columnFooterSelector);
    const columnName = columnBody.dataset.name;
    columnBody.innerHTML = '';

    columnBody.style.maxHeight = (this._board.offsetHeight - columnHeader.offsetHeight - columnFooter.offsetHeight) + 'px';

    this._state.data[columnName].forEach((element) => {
      columnBody.insertAdjacentHTML('beforeend', Trello.markupCard(element.id, element.title));
    });
  }

  redrawDOM() {
    this.redrawColumnBody(this._container.querySelector('[data-name="todo"]'));
    this.redrawColumnBody(this._container.querySelector('[data-name="in-progress"]'));
    this.redrawColumnBody(this._container.querySelector('[data-name="done"]'));
  }

  static get markup() {
    return `
      <div class="trello">
        <div class="trello__board trello-board">
    `
      + Trello.markupColumn('todo', 'TODO')
      + Trello.markupColumn('in-progress', 'IN PROGRESS')
      + Trello.markupColumn('done', 'DONE')
      + `
        </div>
      </div>
    `;
  }

  static markupCard(id, title) {
    return `
      <article class="trello-column__card trello-card" data-id="${id}">
        <h3 class="trello-card__title">${title}</h3>
        <button class="trello-card__btn-delete">&#10006;</button>
      </article>
    `;
  }

  static markupColumn(name, title) {
    return `
      <section class="trello-board__column trello-column">
        <div class="trello-column__header">
          <h2 class="trello-column__title">${title}</h2>
        </div>
        <div class="trello-column__body" data-name="${name}"></div>
        <div class="trello-column__footer">
          <button class="trello-column__btn-add">&#10010; Add another card</button>
          <form class="trello-column__form trello-form hidden">
            <textarea class="trello-form__textarea" placeholder="Enter a title for this card..."></textarea>
            <div class="trello-form__controls">
              <button class="trello-form__btn-submit" type="submit">Add Card</button>
              <button class="trello-form__btn-reset" type="reset">&#10006;</button>
            </div>
          </form>
        </div>
      </section>
    `;
  }

  static get boardSelector() { return '.trello__board'; }

  static get btnAddSelector() { return '.trello-column__btn-add'; }

  static get cardSelector() { return '.trello-column__card'; }

  static get columnSelector() { return '.trello-board__column'; }

  static get columnBodySelector() { return '.trello-column__body'; }

  static get columnFooterSelector() { return '.trello-column__footer'; }

  static get columnHeaderSelector() { return '.trello-column__header'; }

  static get footerSelector() { return '.trello-column__footer'; }

  static get formSelector() { return '.trello-column__form'; }

  static get formTextareaSelector() { return '.trello-form__textarea'; }
}
