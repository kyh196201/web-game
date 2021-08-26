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
    return p.shape.every((row, dy) =>
      row.every((value, dx) => {
        const x = p.x + dx;
        const y = p.y + dy;

        return (
          this.isEmpty(value) ||
          (this.isInsideWall(x, y) && this.notOccupied(x, y))
        );
      }),
    );

    /**
     * 1. 바닥에 닿았는지 -> y좌표
     * 2. 왼쪽 또는 오른쪽 벽으로 이동하는지
     * 3. 보드 안에 다른 블록과 부딪히는지
     * 4. 회전하는 중에 벽 또는 다른 블록과 부딪치는지.
     */
  }

  isEmpty(value) {
    return value === 0;
  }

  isInsideWall(x, y) {
    return x >= 0 && y < this.rows && x < this.cols;
  }

  notOccupied(x, y) {
    return this.grid[y] && this.grid[y][x] === 0;
  }
}
