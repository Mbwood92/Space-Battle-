//used arc() method to create gameboard
const canvas = document.getElementById('gameBoard');
const ctx = canvas.getContext('2d');

// Loop. All the pieces
function Game() {
  backGround();
  playerShip();
  alienShip();
}
// game board
function backGround() {
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// my ship design
function playerShip() {
  ctx.fillStyle = 'red';
  ctx.beginPath();
  ctx.arc(150, 300, 15, 0, Math.PI * 2);
  ctx.fill();
}
// alien ships design
function alienShip() {
  ctx.fillStyle = 'blue';
  ctx.beginPath();
  ctx.arc(650, 300, 15, 0, Math.PI * 2);
  ctx.fill();
}

class Player {
  constructor() {
    this.hull = 20;
    this.firepower = 5;
    this.accuracy = 0.7;
  }
}

class Alien {
  constructor() {
    this.hull = Math.floor(Math.random() * 4) + 3;
    this.firepower = Math.floor(Math.random() * 3) + 2;
    this.accuracy = (Math.floor(Math.random() * 3) + 6) / 10;
  }
}

// number of alien ships
const player = new Player();
const alienArray = [];
for (let i = 0; i < 6; i++) {
  alienArray[i] = new Alien();
}


class PlayerShip {
  constructor(shiphull, firepower, accuracy) {
    this.shiphull = shiphull;
    this.firepower = firepower;
    this.accuracy = accuracy;
  }
  attackAlien(target) {
    if (Math.random() < this.accuracy) {
      target.shiphull -= this.firepower;
    }
  }
}

let Uss = new PlayerShip(10, 5, 0.7);

console.log(Uss);

class AlienFleet {
  constructor() {
    this.ships = [];
  }
  alienPower() {
    let shiphull = Math.round(Math.random() * (6 - 3) + 3);
    let firepower = Math.round(Math.random() * (4 - 2) + 2);
    let accuracy = Math.round(
      (Math.random() * (0.81 - 0.6) + 0.6) * 10
    ) / 10;
    this.ships.push(new PlayerShip(shiphull, firepower, accuracy));
  }
}

let evilAlien = new AlienFleet();

evilAlien.alienPower();
evilAlien.alienPower();
evilAlien.alienPower();
evilAlien.alienPower();
evilAlien.alienPower();
evilAlien.alienPower();


const playerAttack = () => {
  if (evilAlien.ships.length > 0) {
    const randomEnemyIndex = Math.floor(Math.random() * evilAlien.ships.length);
    const randomEnemy = evilAlien.ships[randomEnemyIndex];
    Uss.attackAlien(randomEnemy);

    if (randomEnemy.shiphull <= 0) {
      console.log('Alien Destroyed!!!');
      evilAlien.ships.splice(randomEnemyIndex, 1);
    }

    if (evilAlien.ships.length === 0) {
      console.log('All enemies defeated!');
    }
  } else {
    console.log('No more enemies!');
  }
};


const playerAttackButton = document.getElementById('playerAttackButton');
playerAttackButton.addEventListener('click', playerAttack);

const retreat = () => {
  console.log('You have retreated! You Lose!');
};
const retreatButton = document.getElementById('retreatButton');
retreatButton.addEventListener('click', retreat);

console.log(Uss);

Game();