'use strict';

const LENGTH = 3;
const marks = ['O', 'X'];
const players = ['player1', 'player2'];

let currentPlayers = players.slice();
let turn = 0;
let board = null;
let gameover = false;

// 엘리먼트
const $board = document.getElementById('board');
const $player = document.getElementById('player');
const $mark = document.getElementById('mark');

// 게임 초기화
function resetGame() {
  currentPlayers = players.slice();
  gameover = false;
  turn = 0;

  setBoard();
  renderBoard();
}

function endGame(message) {
  gameover = true;

  alert(message);
  resetGame();
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

// 클릭 이벤트
function handleClickCell(e) {
  if (gameover) return false;

  const $target = e.target;

  if ($target.className !== 'cell') return false;

  const { x, y } = $target.dataset;

  // 이미 값이 있을 경우
  if (!!board[x][y]) return false;

  const mark = marks[turn % 2];
  const player = currentPlayers[turn % 2];

  // 칸 추가
  board[x][y] = mark;
  $target.textContent = mark;

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
  if (turn === 8) {
    endGame('무승부입니다.');
    return false;
  }

  // 다음 턴으로
  turn += 1;
  renderMark();
  renderPlayer();
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
  $player.textContent = currentPlayers[turn % 2];
}

// 마크 화면에 렌더링
function renderMark() {
  $mark.textContent = marks[turn % 2];
}

// init
function init() {
  setBoard();
  renderBoard();
  renderPlayer();
  renderMark();
}

init();
