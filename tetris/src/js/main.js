// 게임 초기화와 종료 코드
const requestId = null;
const time = {
  start: 0,
  elapsed: 0,
  level: 1000,
};

// Canvas
const canvas = document.getElementById('board');
const ctx = canvas.getContext('2d');
ctx.canvas.width = COLS * BLOCK_SIZE;
ctx.canvas.height = ROWS * BLOCK_SIZE;

// scale을 사용해서 블록의 크기를 1로 취급하도록 설정
ctx.scale(BLOCK_SIZE, BLOCK_SIZE);

const board = new Board(ROWS, COLS);

function play() {
  board.reset();
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  console.table(board.grid);

  const piece = new Piece(ctx);
  board.piece = piece;

  animate();
}

function animate(now = 0) {
  const elapsed = now - time.start;

  if (elapsed > time.level) {
    // move
    const dropped = board.drop();

    if (!dropped) {
      // freeze
    }
    time.start = now;
  }

  clearCanvas(ctx);
  board.draw();
  window.requestAnimationFrame(animate);
}

function clearCanvas(ctx) {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

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
      clearCanvas(ctx);
      board.piece.draw();
    } else if (board.valid(p)) {
      // 이동이 가능한 상태라면 조각을 이동한다.
      board.piece.move(p);

      //   그리기 전에 이전 좌표를 지운다.
      clearCanvas(ctx);
      board.piece.draw();
    } else {
      return false;
    }
  }
});
