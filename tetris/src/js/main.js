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
  piece.draw();

  board.piece = piece;
}
