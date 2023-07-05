import createHeader from './create-html/create-header.js';
import createMain from './create-html/create-main.js';

createHeader();
let width = 10;
let height = 10;
createMain();
let bombCount = 10;
let minesLeft = bombCount;
// Moves counter
let moves = 0;
// let flagForLevel = false
let stopWatchFlag = false;
let sec = 0;
let tenSec = 0;
let hundredSec = 0;
let t;

const field = document.querySelector('.minesweeper__cells-container');
let cellArray = [];
const stopWatchBlock = document.querySelector('#time');

function levelGame() {
  field.innerHTML = '';
  function createCells() {
    function mineSweeperLayOut() {
      field.innerHTML += '<div id="cell" class="minesweeper__cell closed"></div>';
    }

    for (let i = 0; i < width; i += 1) {
      for (let j = 0; j < height; j += 1) {
        mineSweeperLayOut();
      }
    }
  }

  createCells();
  cellArray = [...document.querySelectorAll('.minesweeper__cell')];
}
levelGame();

Audio.volume = 1;
// Audio if you win
const audioWin = new Audio();
audioWin.src = './src/assets/sound-effects/win-sound.mp3';
// Audio if you lose
const audioLose = new Audio();
audioLose.src = './src/assets/sound-effects/lose-sound.mp3';
// Audio if you click
const audioClick = new Audio();
audioClick.src = './src/assets/sound-effects/click.wav';
// Audio if you set flag
const audioFlag = new Audio();
audioFlag.src = './src/assets/sound-effects/flag-sound.mp3';

// Stopwatch
stopWatchBlock.textContent = '000';

// Lose game
function loseGame() {
  audioLose.play();
  clearTimeout(t);
  backgroundWindow.classList.remove('closed');
  backgroundWindow.classList.add('opened');
  modalTitle.innerText = 'Game over. Try again';
  document.querySelector('.modal-window__time').innerText = 'Time: - - -';
  document.querySelector('.modal-window__moves').innerText = 'Moves: - - -';

  for (let i = 0; i < bombs.length; i++) {
    cellArray[bombs[i]].classList.remove('closed');
    cellArray[bombs[i]].classList.add('bomb');
  }

  modalButton.addEventListener('click', (event) => {
    event.preventDefault();
    clear();
  });
}
//  --------------------------------------

function stopWatchStart() {
  stopWatchBlock.textContent = '000';

  function tick() {
    sec += 1;
    if (sec >= 10) {
      sec = 0;
      tenSec += 1;
      if (tenSec >= 10) {
        tenSec = 0;
        hundredSec += 1;
      }
    }
  }

  function timeOver() {
    if (hundredSec === 9 && tenSec === 9 && sec === 9) {
      stopWatchFlag = true;
      clearTimeout(t);
      stopWatchBlock.textContent = '000';
      loseGame();
    }
  }

  function timer() {
    t = setTimeout(add, 1000);
  }

  function add() {
    tick();
    timeOver();

    stopWatchBlock.textContent = ` ${hundredSec}${tenSec}${sec}`;
    timer();
  }

  timer();
}
// ----------------------

const gameOver = false;

cellArray.forEach((cell) => {
  cell.classList.add('closed');
});

let bombs;
let bombsFlag = false;

// Mines Left Counter ------------------------------------
document.querySelector('#mine').innerText = minesLeft;
function bombsCounterDelete(bombCount) {
  minesLeft--;
  document.querySelector('#mine').innerText = minesLeft;
}

function bombsCounterAdd(bombCount) {
  minesLeft++;
  document.querySelector('#mine').innerText = minesLeft;
}
// ------------------------------------------------------

const backgroundWindow = document.querySelector('.background-modal');
backgroundWindow.classList.add('closed');
const modal = document.querySelector('.modal-window');
const modalTitle = document.querySelector('.modal-window__title');
const modalButton = document.querySelector('.modal-window__button');

function mediaQuery(media) {
  if (media.matches) {
    field.style.gridTemplateColumns = `repeat(${width}, 17px)`;
    field.style.gridTemplateRows = `repeat(${height}, 17px)`;
  } else {
    field.style.gridTemplateColumns = `repeat(${width}, 25px)`;
    field.style.gridTemplateRows = `repeat(${height}, 25px)`;
  }
}
const mediaQuery750px = window.matchMedia('(max-width: 750px)');
mediaQuery(mediaQuery750px);
mediaQuery750px.addListener(mediaQuery);

const newGameButton = document.querySelector('.container__new-game-button');
newGameButton.addEventListener('click', () => {
  clear();
});

function isValid(row, column) {
  return row >= 0 && row < width && column >= 0 && column < height;
}

function getMinesCount(row, column) {
  let count = 0;

  for (let x = -1; x <= 1; x++) {
    for (let y = -1; y <= 1; y++) {
      if (isBomb(row + x, column + y)) {
        count++;
      }
    }
  }
  return count;
}

function isBomb(row, column) {
  if (!isValid(row, column)) return false;
  const index = row * width + column;
  return bombs.includes(index);
}

let closedCount = cellArray.length;

function openCell(row, column) {
  if (!isValid(row, column)) return false;
  const index = row * width + column;
  const cell = cellArray[index];
  if (cell.classList.contains('flag')) return;

  if (cell.id === 'opened') {
    return;
  }
  cell.id = 'opened';

  if (isBomb(row, column)) {
    loseGame();
    return;
  }

  closedCount -= 1;
  const bombCountToNum = Number(bombCount);

  // console.log(closedCount)
  if (closedCount === bombCountToNum) {
    victoryGame();
  }

  cell.classList.remove('closed');
  cell.classList.add('opened');
  let openCellCount;
  openCellCount = getMinesCount(row, column);
  if (openCellCount === 0) {
    cell.innerText = ' ';
    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        openCell(row + x, column + y);
      }
    }
  }
  if (openCellCount !== 0) {
    if (openCellCount === 1) cell.style = 'color: #0000FF';
    if (openCellCount === 2) cell.style = 'color: #00FF00';
    if (openCellCount === 3) cell.style = 'color: #FF0000';
    if (openCellCount === 4) cell.style = 'color: #0000FF';
    if (openCellCount === 5) cell.style = 'color: #00FF00';
    if (openCellCount === 6) cell.style = 'color: #A52A2A';
    if (openCellCount === 7) cell.style = 'color: #0000FF';
    if (openCellCount === 8) cell.style = 'color: #00FF00';
    cell.innerText = openCellCount;
  }
}

const minesNumberButton = document.querySelector('#mines-number');
minesNumberButton.addEventListener('change', (event) => {
  bombCount = event.target.value;
  clear();
});

// Clear the field
const clear = () => {
  audioWin.pause();
  audioWin.currentTime = 0;
  audioLose.pause();
  audioLose.currentTime = 0;
  cellArray = [...document.querySelectorAll('.minesweeper__cell')];
  stopWatchFlag = false;
  bombsFlag = false;
  firstOpenFlag = false;
  sec = 0;
  tenSec = 0;
  hundredSec = 0;
  flagsCount = 0;
  flagsBlock.innerText = `Flags: ${flagsCount}`;
  moves = 0;
  document.querySelector('.header__number-of-clicks').innerText = `Number of moves: ${moves}`;
  clearTimeout(t);
  stopWatchBlock.textContent = '000';
  bombs = [];
  minesLeft = bombCount;
  document.querySelector('#mine').innerText = minesLeft;
  document.querySelectorAll('#opened').forEach((cell) => {
    cell.id = 'cell';
  });
  backgroundWindow.classList.remove('opened');
  backgroundWindow.classList.add('closed');
  for (let i = 0; i < cellArray.length; i++) {
    cellArray[i].classList.add('closed');
    cellArray[i].innerText = ' ';
    if (cellArray[i].classList.contains('bomb')) cellArray[i].classList.remove('bomb');
    else if (cellArray[i].classList.contains('flag')) cellArray[i].classList.remove('flag');
    else if (cellArray[i].classList.contains('opened')) cellArray[i].classList.remove('opened');
    if (cellArray[i].hasAttribute('style')) cellArray[i].removeAttribute('style');
  }
  levelGame();
  closedCount = cellArray.length;
  mediaQuery(mediaQuery750px);
};
// ------------------------------------------

// Victory
// localStorage.clear()
const victoryCount = 0;
let arrayOfVictories;
const resultsTable = document.querySelector('.records__table');
let results;
const resultsArray = [];
function victoryGame() {
  const arrayOfVictories = [];
  backgroundWindow.classList.remove('closed');
  backgroundWindow.classList.add('opened');
  audioWin.play();
  clearTimeout(t);
  modalTitle.innerText = 'Hooray! You found all mines.';
  document.querySelector('.modal-window__time').innerText = `Time: ${hundredSec}${tenSec}${sec}`;
  document.querySelector('.modal-window__moves').innerText = `Moves:  ${moves}`;

  resultsTable.innerHTML += `<div class="records__table-item">Field: ${width} x ${height}, Bombs: ${bombCount}, Time: ${hundredSec}${tenSec}${sec}, Moves: ${moves}</div>`;
  results = resultsTable.childNodes;

  // Delete all the elements in array
  resultsArray.splice(0, resultsArray.length);

  for (let i = 0; i < results.length; i++) {
    resultsArray.push(results[i].textContent);
  }
  if (resultsArray.length > 10) {
    resultsArray.shift();
  }
  resultsTable.innerHTML = '';
  resultsTable.innerHTML = `<div class="records__table-item">${resultsArray}\n</div>`;

  console.log(resultsArray);
  localStorage.setItem('results', resultsArray);
  console.log(localStorage);
  modalButton.addEventListener('click', (event) => {
    event.preventDefault();
    clear();
  });
  return resultsArray;
}

const localStorageResults = localStorage.getItem('results');
console.log(localStorageResults);
if (localStorageResults !== null) {
  resultsTable.innerHTML += `<div class="records__table-item">${localStorageResults}</div>`;
}
results = resultsTable.childNodes;
console.log(results);

// -----------------------------------------

document.getElementById('easy-node').addEventListener('click', (event) => {
  width = 10;
  height = 10;
  field.removeAttribute('style');
  field.setAttribute('style', `grid-template-columns: repeat(${width}, 25px); grid-template-rows: repeat(${height}, 25px)`);
  clear();
});
document.getElementById('medium-node').addEventListener('click', (event) => {
  width = 15;
  height = 15;
  field.removeAttribute('style');
  field.setAttribute('style', `grid-template-columns: repeat(${width}, 25px); grid-template-rows: repeat(${height}, 25px)`);
  clear();
});
document.getElementById('hard-node').addEventListener('click', (event) => {
  width = 25;
  height = 25;
  field.removeAttribute('style');
  field.setAttribute('style', `grid-template-columns: repeat(${width}, 25px); grid-template-rows: repeat(${height}, 25px)`);
  clear();
});

let firstOpenFlag = false;
document.querySelector('.header__number-of-clicks').innerText = `Number of moves: ${moves}`;
field.addEventListener('click', (event) => {
  if (event.target.id === 'cell') {
    const index = cellArray.indexOf(event.target);
    const targetCell = event.target;
    const column = index % width;
    const row = Math.floor(index / width);

    audioClick.play();
    moves++;
    document.querySelector('.header__number-of-clicks').innerText = `Number of moves: ${moves}`;
    if (!stopWatchFlag) {
      stopWatchStart();
      stopWatchFlag = true;
    }
    if (!bombsFlag) {
      const cellsKey = [...cellArray.keys()];
      cellsKey.splice(index, 1);
      bombs = [...cellsKey]
        .sort(() => Math.random() - 0.5)
        .slice(0, bombCount);
      bombsFlag = true;
    }
    if (!modal.classList.contains('opened')) openCell(row, column);
  }
});

field.oncontextmenu = function (event) {
  event.preventDefault();
  if (!modal.classList.contains('opened')) {
    const index = cellArray.indexOf(event.target);
    addFlag(index);
    checkVictory();
  }
};
let flagsCount = 0;
const flagsBlock = document.querySelector('.header__number-of-flags');
flagsBlock.innerText = `Flags: ${flagsCount}`;
const addFlag = (index) => {
  if (cellArray[index].classList.contains('flag')) {
    cellArray[index].classList.remove('flag');
    bombsCounterAdd();
    if (flagsCount === 0) return;

    flagsCount--;
    flagsBlock.innerText = `Flags: ${flagsCount}`;
    return;
  } if (cellArray[index].classList.contains('opened')) return;
  if (minesLeft === 0) return;
  cellArray[index].classList.add('flag');
  audioFlag.play();
  bombsCounterDelete();
  if (flagsCount === bombCount) return;
  flagsCount++;
  flagsBlock.innerText = `Flags: ${flagsCount}`;
};

const checkVictory = () => {
  let foundMines = 0;
  for (let i = 0; i < cellArray.length; i++) {
    if (bombs.includes(i) && cellArray[i].classList.contains('flag')) {
      foundMines++;
    }
  }
  if (foundMines === bombCount) victoryGame();
};

const { body } = document;
body.classList.add('light');
const theme = document.querySelector('.header__theme');
theme.classList.add('light');
const volume = document.querySelector('.header__volume');
volume.classList.add('light');
theme.addEventListener('click', (event) => {
  if (theme.classList.contains('light')) {
    theme.classList.remove('light');
    theme.classList.add('dark');
    body.classList.remove('light');
    body.classList.add('dark');
    volume.classList.remove('light');
    volume.classList.add('dark');
    return;
  }
  if (theme.classList.contains('dark')) {
    theme.classList.remove('dark');
    theme.classList.add('light');
    body.classList.add('light');
    body.classList.remove('dark');
    volume.classList.remove('dark');
    volume.classList.add('light');
  }
});
volume.classList.add('enable');
volume.addEventListener('click', (event) => {
  if (volume.classList.contains('enable')) {
    volume.classList.remove('enable');
    volume.classList.add('disable');
    audioWin.muted = true;
    audioLose.muted = true;
    audioClick.muted = true;
    audioFlag.muted = true;
    return;
  }
  if (volume.classList.contains('disable')) {
    volume.classList.remove('disable');
    volume.classList.add('enable');
    audioWin.muted = false;
    audioLose.muted = false;
    audioClick.muted = false;
    audioFlag.muted = false;
  }
});

const backgroundResult = document.querySelector('.background-result');
backgroundResult.classList.add('closed');
document.querySelector('.container__results-button').addEventListener('click', () => {
  if (backgroundResult.classList.contains('closed')) {
    backgroundResult.classList.remove('closed');
    backgroundResult.classList.add('opened');
  }
});
document.querySelector('.container__results-close-button').addEventListener('click', () => {
  if (backgroundResult.classList.contains('opened')) {
    backgroundResult.classList.remove('opened');
    backgroundResult.classList.add('closed');
  }
});

console.log(localStorage)
