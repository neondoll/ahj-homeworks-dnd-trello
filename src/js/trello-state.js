export default class TrelloState {
  constructor() {
    this.data = { 'todo': [], 'in-progress': [], 'done': [] };
  }

  addDataItem(columnName, cardTitle) {
    this.data[columnName].push({ id: 'card-' + Date.now(), title: cardTitle });
  }

  deleteDataItem(columnName, cardId) {
    const index = this.data[columnName].findIndex(item => item.id === cardId);
    this.data[columnName].splice(index, 1);
  }

  loadData() {
    if (localStorage.getItem('trello-state')) {
      this.data = JSON.parse(localStorage.getItem('trello-state'));
    }
  }

  saveData() {
    localStorage.setItem('trello-state', JSON.stringify(this.data));
  }
}
