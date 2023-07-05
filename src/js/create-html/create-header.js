export default function createHeader() {
  const header = document.createElement('header');
  document.body.append(header);
  header.classList.add('header');

  const theme = document.createElement('div');
  header.append(theme);
  theme.classList.add('header__theme');

  const volume = document.createElement('div');
  header.append(volume);
  volume.classList.add('header__volume');

  const container = document.createElement('div');
  header.append(container);
  container.classList.add('container');

  // let logo = document.createElement('h1');
  container.innerHTML += '<h1 class="logo">Minesweeper</h1>';

  const nav = document.createElement('nav');
  container.append(nav);
  nav.classList.add('nav');

  const listContainer = document.createElement('ul');
  nav.append(listContainer);
  listContainer.classList.add('nav__list', 'list');
  listContainer.innerHTML += '<li id="easy-node" class="list__item item"><a class="item__link" href="#">Easy mode</a></li><li id="medium-node" class="list__item item"><a class="item__link" href="#">Medium mode</a></li><li id="hard-node" class="list__item item"><a class="item__link" href="#">Hard mode</a></li>';

  container.innerHTML += '<div class="header__number-of-mines"><label for="mines-number">number of mines:</label><input id="mines-number" type="range" value="10" min="10" max="99"><div class="header__number-of-mines-text">For setting new number of mines you should start new game and click to the cell</div></div>';
  container.innerHTML += '<div class="header__number-of-clicks"></div>';
  container.innerHTML += '<div class="header__number-of-flags"></div>';
}
