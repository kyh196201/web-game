// 게임 설정과 규칙 정의
const COLS = 10;
const ROWS = 20;
const BLOCK_SIZE = 30;

// enumeration
const KEY = {
  LEFT: 'ArrowLeft',
  RIGHT: 'ArrowRight',
  DOWN: 'ArrowDown',
};

Object.freeze(KEY);

// NOTE 얕은 복사
// 원본 조각을 변화시키지 않고 새로운 조각을 얻을 수 있다.
const moves = {
  [KEY.LEFT]: p => ({...p, x: p.x - 1}),
  [KEY.RIGHT]: p => ({...p, x: p.x + 1}),
  [KEY.DOWN]: p => ({...p, y: p.y + 1}),
};
