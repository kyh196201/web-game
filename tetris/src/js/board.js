// 보드 로직
class Board {
  constructor(rows, cols) {
    this.rows = rows;
    this.cols = cols;
    this.grid = [];
  }

  reset() {
    this.grid = this.getEmptyBoard();
  }

  getEmptyBoard() {
    return Array.from({length: this.rows}, () => Array(this.cols).fill(0));
  }

  valid(p) {
    return true;
  }
}
