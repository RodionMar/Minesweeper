export default function createMain() {
  const main = document.createElement('main');
  document.body.append(main);
  main.classList.add('main');

  const container = document.createElement('div');
  main.append(container);
  container.classList.add('container');

  const mineSweeper = document.createElement('div');
  container.append(mineSweeper);
  mineSweeper.classList.add('minesweeper');

  const mineSweeperInfoBlock = document.createElement('div');
  mineSweeper.append(mineSweeperInfoBlock);
  mineSweeperInfoBlock.classList.add('minesweeper__info', 'info');

  mineSweeperInfoBlock.innerHTML += '<div class="info__mines"><div class="info__title">Mines left:</div><div id="mine" class="info__number mine"></div></div><div class="info__time"><div class="info__title">Time:</div><div id="time" class="info__number time"></div></div>';

  const cellsContainer = document.createElement('div');
  mineSweeper.append(cellsContainer);
  cellsContainer.classList.add('minesweeper__cells-container');

  const buttonsContainer = document.createElement('div');
  container.append(buttonsContainer);
  buttonsContainer.classList.add('container__buttons');

  buttonsContainer.innerHTML += '<button class="container__new-game-button">New Game</button>';
  buttonsContainer.innerHTML += '<button class="container__results-button">Results</button>';

  container.innerHTML += '<div class="background-result"><div class="records"><div class="records__title">Your results</div><div class="records__table"></div><button class="container__results-close-button">Close</button></div></div>';
  container.innerHTML += '<div class="background-modal"><div class="modal-window"><div class="modal-window__title"></div><div class="modal-window__info-block"><div class="modal-window__time">Time: </div><div class="modal-window__moves">Moves: </div></div><button class="modal-window__button">Try again</button></div></div></div>';
}
