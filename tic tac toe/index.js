'use strict';

const LENGTH = 3;
const marks = ['O', 'X'];
let mode = 'single';

const players =
  mode === 'multi' ? ['player1', 'player2'] : ['player1', 'computer'];

let currentPlayers = players.slice();
let count = 0;
let board = null;
let turn = currentPlayers[0];
let gameover = false;

// 엘리먼트
const $board = document.getElementById('board');
const $player = document.getElementById('player');
const $mark = document.getElementById('mark');

// 게임 초기화
function resetGame() {
  currentPlayers = players.slice();
  gameover = false;
  count = 0;
  turn = currentPlayers[0];

  setBoard();
  renderBoard();
}

// 게임 종료
function endGame(message) {
  gameover = true;

  setTimeout(() => {
    alert(message);
    resetGame();
  }, 50);
}

// 컴퓨터 차례인지 체크
function isComputersTurn() {
  return mode === 'single' && turn === 'computer';
}

// 가로 체크
function checkHorizontalCompletion(x, mark) {
  return board[x].filter((b) => b === mark).length === LENGTH;
}

// 세로 체크
function checkVerticalCompletion(y, mark) {
  for (let x = 0; x < LENGTH; x++) {
    if (board[x][y] !== mark) {
      return false;
    }
  }

  return true;
}

// x, y 좌표에 해당하는 셀 엘리먼트 찾기
function findCell(x, y) {
  const selector = `[data-x="${x}"][data-y="${y}"]`;

  return document.querySelector(selector);
}

// x, y 좌표에 해당하는 셀 선택
function selectCell(x, y) {
  const mark = marks[count % 2];
  const player = currentPlayers[count % 2];

  // 칸 추가
  board[x][y] = mark;
  const $cell = findCell(x, y);

  if (!$cell) return false;
  $cell.textContent = mark;

  // 가로 체크
  if (checkHorizontalCompletion(x, mark)) {
    endGame(`${player} 승리!`);
    return false;
  }

  // 세로 체크
  if (checkVerticalCompletion(y, mark)) {
    endGame(`${player} 승리!`);
    return false;
  }

  // 대각선 체크
  if (x === y) {
    if (board[0][0] === mark && board[1][1] === mark && board[2][2] === mark) {
      endGame(`${player} 승리!`);
      return false;
    }
  } else if (x + y === 2) {
    if (board[2][0] === mark && board[1][1] === mark && board[2][0] === mark) {
      endGame(`${player} 승리!`);
      return false;
    }
  }

  // 무승부
  if (count === 8) {
    endGame('무승부입니다.');
    return false;
  }

  // 다음 턴으로
  count += 1;
  turn = currentPlayers[count % 2];
  renderMark();
  renderPlayer();
}

// 클릭 이벤트
function handleClickCell(e) {
  if (gameover) return false;

  if (isComputersTurn()) {
    console.log('컴퓨터 차례입니다. 잠시만 기다려주세요.');
    return false;
  }

  const $target = e.target;

  if ($target.className !== 'cell') return false;

  const { x, y } = $target.dataset;

  // 이미 값이 있을 경우
  if (!!board[x][y]) return false;

  selectCell(x, y);

  if (isComputersTurn()) {
    console.log('컴퓨터 차례입니다.');
    playComputer();
  }
}

function findEmptyCells() {
  const coords = [];

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (!board[i][j]) {
        const coord = [i, j];
        coords.push(coord);
      }
    }
  }

  return coords;
}

function getRandomIndex(max = 1) {
  return Math.floor(Math.random() * max);
}

function getRandomCoords() {
  const emptyCells = findEmptyCells();

  if (!emptyCells.length) {
    console.error('에러');
  }

  const randomIndex = getRandomIndex(emptyCells.length);

  const [x, y] = emptyCells[randomIndex];

  return [x, y];
}

// 컴퓨터 차례 실행
function playComputer() {
  const [x, y] = getRandomCoords();

  setTimeout(() => {
    selectCell(x, y);
  }, 500);
}

// 셀 엘리먼트 생성
function createCell(x, y) {
  const $div = document.createElement('div');
  $div.className = 'cell';
  $div.setAttribute('data-x', x);
  $div.setAttribute('data-y', y);

  $div.addEventListener('click', handleClickCell);

  return $div;
}

// 보드 배열 생성
function setBoard() {
  board = [];

  for (let i = 0; i < LENGTH; i++) {
    board.push(new Array(LENGTH).fill(''));
  }
}

// 보드 화면에 렌더링
function renderBoard() {
  $board.innerHTML = '';

  for (let i = 0; i < LENGTH; i++) {
    for (let j = 0; j < LENGTH; j++) {
      const $cell = createCell(i, j);
      $board.appendChild($cell);
    }
  }
}

// 현재 플레이어 화면에 렌더링
function renderPlayer() {
  $player.textContent = currentPlayers[count % 2];
}

// 마크 화면에 렌더링
function renderMark() {
  $mark.textContent = marks[count % 2];
}

function initGame() {
  setBoard();
  renderBoard();
  renderPlayer();
  renderMark();
}

// init
function init() {
  initGame();
}

init();
