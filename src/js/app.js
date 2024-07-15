import Board from './board';

document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('#app');

  const board = new Board(container);
  board.drawUI();

  board.addColumn('TODO');
  board.addColumn('IN PROGRESS');
  board.addColumn('DONE');

  board._columns[0].addCard('Welcome to Trello!');
});
