import BoardColumn from './board-column';

export default class Board {
  constructor(container) {
    if (!(container instanceof HTMLElement)) {
      throw new Error('container is not HTMLElement');
    }

    this._container = container;
    this._columns = [];
  }

  addColumn(title) {
    const column = new BoardColumn(this._element);
    column.drawUI(title);

    column._element.classList.add('board__column');

    this._columns.push(column);
  }

  checkBinding() {
    if (this._container === undefined) {
      throw new Error('Board not bind to DOM');
    }
  }

  drawUI() {
    this.checkBinding();

    this._container.innerHTML = Board.markup;

    this._element = this._container.querySelector(Board.selector);
  }

  static get markup() { return `<div class="board"></div>`; }

  static get selector() { return '.board'; }
}
