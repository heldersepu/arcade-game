import Gem from './gem.js';
import Enemy from './enemy.js';
import Player from './player.js';

const playAgainButton = document.querySelector('.play-again');
const restartButton = document.querySelector('.restart');

// Calls playAgain() function when user clicks reset icon in sidebar
restartButton.addEventListener('click', playAgain);

// Starts lives at 3
let lives = 3;


// Used to disable arrow keys while modal opened (used in handleInput() method in class Player)
let isDead = false;

let sidebarLives = document.querySelector('.lives-left');
sidebarLives.innerHTML = lives;

// Sets an initial player score of 0
let score = 0;

// Sets score shown in sidebar
let sidebarScore = document.querySelector('.score');
sidebarScore.innerHTML = score;

let modalScore = document.querySelector('.modal-score');
modalScore.innerHTML = score;

let enterPress = function(e) {
  if (e.keyCode === 13) {
    modal.classList.remove('modal-visible');
    playAgain()
  }
};

// Called when user clicks restart button in sidebar or play again button in modal. Sets modal to display: none, resets lives and score, moves player back to starting position
function playAgain() {
  isDead = false;
  player.x = 200;
  player.y = 400;
  // Hides modal if present (if opened by game ending)
  modal.classList.remove('modal-visible');
  lives = 3;
  sidebarLives.innerHTML = lives;
  score = 0;
  sidebarScore.innerHTML = score;

  document.removeEventListener('keydown', enterPress);
}

// ENEMY/PLAYER/GEM OBJECT INSTANTIATION
let gem = new Gem();

// Y position of enemies (smaller number means higher up)
let enemyPosition = [61, 145, 227, 308];

let allEnemies = [];

let player = new Player(202, 396);

enemyPosition.forEach(function(posY) {
  // X position of 0 (out of view to the left of the game board), Y of whatever is passed in, and random speed within a range
  let enemy = new Enemy(0, posY);
  allEnemies.push(enemy);
});

// MODAL

const modal = document.getElementById('myModal');
const closeIcon = document.querySelector('.close');

// When called, adds class that sets modal to display: block when player reaches water
function showModal() {
  modal.classList.add('modal-visible');

  // Calls playAgain() function when user clicks play again button in modal
  playAgainButton.addEventListener('click', playAgain);

  // If esc is pressed, closes modal and restarts game (note: keydown used instead of keypress because keypress only works for keys that produce a character value)
  document.addEventListener('keydown', function(e) {
    let keyCode = e.keyCode;
    if (keyCode === 27) {
      modal.classList.remove('modal-visible');
      playAgain();
    }
  });

  // If enter is pressed, closes modal and restarts game
  document.addEventListener('keydown', enterPress);

  // If user clicks modal's close icon, closes modal and restarts game
  closeIcon.addEventListener('click', function() {
    modal.classList.remove('modal-visible');
    playAgain();
  });
}

// Listens for keydown event (fired when a key is pressed down [regardless of whether it produces a character, unlike keypress]) and sends the keys to Player.handleInput() method
document.addEventListener('keydown', function(e) {
  player.handleInput(e.keyCode);
});


// Returns static NodeList of li elements in (ul with) class .char-selector
const characters = document.querySelectorAll('.char-selector li');

// Iterate through li elements, adding event listener for each. When clicked the text from p (with attribute hidden) in li item will be passed to setSprite method in Player class (causing character to change accordingly) and game will be reset
characters.forEach(character => {
  character.addEventListener('click', () => {
    // Set sprite from user selection
    player.setSprite(character.querySelector('p').innerHTML);
    playAgain();
  });
});
