const score = document.querySelector('.score');
const highScore = document.querySelector('.highScore');
const startScreen = document.querySelector('.startScreen');
const gameArea = document.querySelector('.gameArea');
const clickToStart = document.querySelector('.ClickToStart');

clickToStart.addEventListener('click', start);
document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);

let keys = {
  ArrowUp: false,
  ArrowDown: false,
  ArrowLeft: false,
  ArrowRight: false,
};

let player = {
  speed: 5,
  score: 0,
  highScore: 0,
  x: 0,
  y: 0,
  isStart: false,
};

function keyDown(e) {
  if (e.key in keys) {
    keys[e.key] = true;
  }
}

function keyUp(e) {
  if (e.key in keys) {
    keys[e.key] = false;
  }
}

function start() {
  gameArea.innerHTML = '';
  startScreen.classList.add('hide');
  player.isStart = true;
  player.score = 0;
  player.speed = 5;

  // Criar linhas da estrada
  for (let i = 0; i < 5; i++) {
    const roadLine = document.createElement('div');
    roadLine.setAttribute('class', 'roadLines');
    roadLine.y = i * 140;
    roadLine.style.top = roadLine.y + 'px';
    gameArea.appendChild(roadLine);
  }

  // Criar carros oponentes
  for (let i = 0; i < 3; i++) {
    const opponent = document.createElement('div');
    opponent.setAttribute('class', 'opponents');
    opponent.y = i * -300;
    opponent.style.top = opponent.y + 'px';
    opponent.style.left = Math.floor(Math.random() * 350) + 'px';
    opponent.style.backgroundColor = randomColor();
    gameArea.appendChild(opponent);
  }

  // Criar carro do jogador
  const car = document.createElement('div');
  car.setAttribute('class', 'car');
  gameArea.appendChild(car);

  player.x = car.offsetLeft;
  player.y = car.offsetTop;

  window.requestAnimationFrame(play);
}

function randomColor() {
  function c() {
    const hex = Math.floor(Math.random() * 256).toString(16);
    return ('0' + hex).slice(-2);
  }
  return '#' + c() + c() + c();
}

function play() {
  const car = document.querySelector('.car');
  const road = gameArea.getBoundingClientRect();

  if (player.isStart) {
    moveLines();
    moveOpponents(car);

    if (keys.ArrowUp && player.y > 0) {
      player.y -= player.speed;
    }
    if (keys.ArrowDown && player.y < (road.height - 75)) {
      player.y += player.speed;
    }
    if (keys.ArrowRight && player.x < (road.width - 50)) {
      player.x += player.speed;
    }
    if (keys.ArrowLeft && player.x > 0) {
      player.x -= player.speed;
    }

    car.style.top = player.y + 'px';
    car.style.left = player.x + 'px';

    player.score++;
    score.textContent = "Pontuação: " + (player.score - 1);

    if (player.score > player.highScore) {
      player.highScore = player.score;
      highScore.textContent = "Pontuação Alta: " + (player.highScore - 1);
    }

    // Incrementa velocidade gradualmente, limite para evitar ficar muito rápido
    if (player.speed < 15) {
      player.speed += 0.01;
    }

    window.requestAnimationFrame(play);
  }
}

function moveLines() {
  const roadLines = document.querySelectorAll('.roadLines');
  roadLines.forEach(item => {
    if (item.y >= 700) {
      item.y -= 700;
    }
    item.y += player.speed;
    item.style.top = item.y + 'px';
  });
}

function moveOpponents(car) {
  const opponents = document.querySelectorAll('.opponents');
  opponents.forEach(item => {
    if (isCollide(car, item)) {
      endGame();
    }
    if (item.y >= 750) {
      item.y -= 900;
      item.style.left = Math.floor(Math.random() * 350) + 'px';
    }
    item.y += player.speed;
    item.style.top = item.y + 'px';
  });
}

function isCollide(a, b) {
  const aRect = a.getBoundingClientRect();
  const bRect = b.getBoundingClientRect();

  return !(
    (aRect.top > bRect.bottom) ||
    (aRect.bottom < bRect.top) ||
    (aRect.right < bRect.left) ||
    (aRect.left > bRect.right)
  );
}

function endGame() {
  player.isStart = false;
  player.speed = 5;
  startScreen.classList.remove('hide');
  alert('Fim de jogo! Sua pontuação: ' + (player.score - 1));
}

function start() {
  gameArea.innerHTML = '';
  startScreen.classList.add('hide');
  player.isStart = true;
  player.score = 0;
  player.speed = 5;

  // Criar linhas da estrada
  for (let i = 0; i < 5; i++) {
    const roadLine = document.createElement('div');
    roadLine.setAttribute('class', 'roadLines');
    roadLine.y = i * 140;
    roadLine.style.top = roadLine.y + 'px';
    gameArea.appendChild(roadLine);
  }

  // Criar árvores laterais (10 de cada lado)
  for (let i = 0; i < 20; i++) {
    const tree = document.createElement('div');
    tree.setAttribute('class', 'tree');
    // posicionar metade na esquerda e metade na direita
    if(i % 2 === 0){
      tree.style.left = '10px';
    } else {
      tree.style.left = '360px';
    }
    tree.y = i * -150;
    tree.style.top = tree.y + 'px';
    gameArea.appendChild(tree);
  }

  // Criar carros oponentes (3)
  for (let i = 0; i < 3; i++) {
    const opponent = document.createElement('div');
    opponent.setAttribute('class', 'opponents');
    opponent.y = i * -300;
    opponent.style.top = opponent.y + 'px';
    opponent.style.left = Math.floor(Math.random() * 350) + 'px';
    opponent.style.backgroundColor = randomColor();
    gameArea.appendChild(opponent);
  }

  // Criar carro do jogador
  const car = document.createElement('div');
  car.setAttribute('class', 'car');
  gameArea.appendChild(car);

  player.x = car.offsetLeft;
  player.y = car.offsetTop;

  window.requestAnimationFrame(play);
}

function moveTrees(){
  const trees = document.querySelectorAll('.tree');
  trees.forEach(tree => {
    if(tree.y >= 700){
      tree.y = -150;
    }
    tree.y += player.speed;
    tree.style.top = tree.y + 'px';
  });
}

function play() {
  const car = document.querySelector('.car');
  const road = gameArea.getBoundingClientRect();

  if (player.isStart) {
    moveLines();
    moveOpponents(car);
    moveTrees();  // movimentar as árvores

    if (keys.ArrowUp && player.y > 0) {
      player.y -= player.speed;
    }
    if (keys.ArrowDown && player.y < (road.height - 75)) {
      player.y += player.speed;
    }
    if (keys.ArrowRight && player.x < (road.width - 50)) {
      player.x += player.speed;
    }
    if (keys.ArrowLeft && player.x > 0) {
      player.x -= player.speed;
    }

    car.style.top = player.y + 'px';
    car.style.left = player.x + 'px';

    player.score++;
    score.textContent = "Pontuação: " + (player.score - 1);

    if (player.score > player.highScore) {
      player.highScore = player.score;
      highScore.textContent = "Pontuação Alta: " + (player.highScore - 1);
    }

    if (player.speed < 15) {
      player.speed += 0.01;
    }

    window.requestAnimationFrame(play);
  }
}
