// 보드 로직
// 조각 회전
function rotate(p) {
  // 얕은 복사
  // NOTE: clone = {...p};로 했을 경우에는 shape가 변경됨
  const clone = JSON.parse(JSON.stringify(p));

  // 행렬을 변환한다. p는 Piece의 인스턴스이다.
  for (let y = 0; y < clone.shape.length; ++y) {
    for (let x = 0; x < y; ++x) {
      [clone.shape[x][y], clone.shape[y][x]] = [
        clone.shape[y][x],
        clone.shape[x][y],
      ];
    }
  }

  // 열 순서대로 뒤집는다.
  clone.shape.forEach(row => row.reverse());

  return clone;
}

/**
 * NOTE 얕은 복사
 * 원본 조각을 변화시키지 않고 새로운 조각을 얻을 수 있다.
 */
const moves = {
  [KEY.LEFT]: p => ({...p, x: p.x - 1}),
  [KEY.RIGHT]: p => ({...p, x: p.x + 1}),
  [KEY.DOWN]: p => ({...p, y: p.y + 1}),
  [KEY.SPACE]: p => ({...p, y: p.y + 1}),
  [KEY.UP]: p => rotate(p),
};
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

  drop() {
    const p = moves[KEY.DOWN](this.piece);

    if (!this.valid(p)) {
      return false;
    }

    this.piece.move(p);
    return true;
  }

  draw() {
    this.piece.draw();
  }
}
