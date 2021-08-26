// 게임 초기화와 종료 코드
const canvas = document.getElementById('board');
const ctx = canvas.getContext('2d');

ctx.canvas.width = COLS * BLOCK_SIZE;
ctx.canvas.height = ROWS * BLOCK_SIZE;

// scale을 사용해서 블록의 크기를 1로 취급하도록 설정
ctx.scale(BLOCK_SIZE, BLOCK_SIZE);

const board = new Board(ROWS, COLS);

function play() {
  board.reset();
  console.table(board.grid);

  const piece = new Piece(ctx);
  board.piece = piece;
  board.piece.draw();
}

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

// 키보드 입력 이벤트
document.addEventListener('keydown', event => {
  const {code} = event;

  if (moves[code]) {
    // 이벤트 버블링을 막는다.
    event.preventDefault();

    // NOTE ✨ 얕은 복사를 할 경우 p는 piece의 인스턴스가 아니라 일반 객체가 된다.
    let p = moves[code](board.piece);

    if (code === KEY.SPACE) {
      while (board.valid(p)) {
        board.piece.move(p);
        p = moves[KEY.DOWN](board.piece);
      }

      //   그리기 전에 이전 좌표를 지운다.
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      board.piece.draw();
    } else if (board.valid(p)) {
      // 이동이 가능한 상태라면 조각을 이동한다.
      board.piece.move(p);

      //   그리기 전에 이전 좌표를 지운다.
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      board.piece.draw();
    } else {
      return false;
    }
  }
});
