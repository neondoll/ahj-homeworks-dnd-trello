import Trello from './trello';

document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('#app');

  const trello = new Trello();
  trello.bindToDOM(container);
  trello.drawUI();
  trello.addEventListeners();

  // const board = new Board(container);
  // board.drawUI();
  //
  // const column1 = board.addColumn('TODO');
  // board.addColumn('IN PROGRESS');
  // board.addColumn('DONE');
  //
  // column1.addCard('Welcome to Trello!');
});
