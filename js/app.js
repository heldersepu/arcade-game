import Gem from './objects/gem.js';
import Enemy from './objects/enemy.js';
import Player from './objects/player.js';

export default class App {
  constructor() {
    this.playAgainButton = document.querySelector('.play-again');
    this.restartButton = document.querySelector('.restart');
      
    // Starts lives at 3
    this.lives = 3;    
    
    // Used to disable arrow keys while modal opened (used in handleInput() method in class Player)
    this.isDead = false;
    
    this.sidebarLives = document.querySelector('.lives-left');
    this.sidebarLives.innerHTML = this.lives;
    
    // Sets an initial player score of 0
    this.score = 0;
    
    // Sets score shown in sidebar
    this.sidebarScore = document.querySelector('.score');
    this.sidebarScore.innerHTML = this.score;
    
    this.modalScore = document.querySelector('.modal-score');
    this.modalScore.innerHTML = this.score;
    
    // ENEMY/PLAYER/GEM OBJECT INSTANTIATION
    this.gem = new Gem(0, 0 , {x:32,y:48}, 30);
    
    // Y position of enemies (smaller number means higher up)
    this.enemyPosition = [61, 145, 227, 308];    
    this.allEnemies = [];    
    this.player = new Player(202, 410, {x:50,y:100}, 35);
    
    for(let k in this.enemyPosition) {     
      this.allEnemies.push(new Enemy(0, this.enemyPosition[k], {x:50,y:110}, 40));
    }
    
    // MODAL    
    this.modal = document.getElementById('myModal');
    this.closeIcon = document.querySelector('.close');

    this.addEventListeners(this)
  }

  addEventListeners(global) {
    // Calls playAgain() function when user clicks reset icon in sidebar
    this.restartButton.addEventListener('click', this.playAgain);
    
    // Listens for keydown event (fired when a key is pressed down [regardless of whether it produces a character, unlike keypress]) and sends the keys to Player.handleInput() method
    document.addEventListener('keydown', function(e) {
      if (!this.isDead)
        global.player.handleInput(e.keyCode);
    }); 

    // Returns static NodeList of li elements in (ul with) class .char-selector
    this.characters = document.querySelectorAll('.char-selector li');
    
    // Iterate through li elements, adding event listener for each. When clicked the text from p (with attribute hidden) in li item will be passed to setSprite method in Player class (causing character to change accordingly) and game will be reset
    this.characters.forEach(character => {
      character.addEventListener('click', () => {
        // Set sprite from user selection
        global.player.setSprite(character.querySelector('p').innerHTML);
        global.playAgain();
      });
    });
  }

  enterPress(e) {
    if (e.keyCode === 13) {
      this.modal.classList.remove('modal-visible');
      this.playAgain()
    }
  }
  
  // Called when user clicks restart button in sidebar or play again button in modal. Sets modal to display: none, resets lives and score, moves player back to starting position
  playAgain() {
    this.isDead = false;
    this.player.x = 200;
    this.player.y = 400;
    // Hides modal if present (if opened by game ending)
    this.modal.classList.remove('modal-visible');
    this.lives = 3;
    this.sidebarLives.innerHTML = lives;
    this.score = 0;
    this.sidebarScore.innerHTML = score;
  
    document.removeEventListener('keydown', enterPress);
  }
  
  // When called, adds class that sets modal to display: block when player reaches water
  showModal() {
    this.modal.classList.add('modal-visible');
  
    // Calls playAgain() function when user clicks play again button in modal
    this.playAgainButton.addEventListener('click', this.playAgain);
  
    // If esc is pressed, closes modal and restarts game (note: keydown used instead of keypress because keypress only works for keys that produce a character value)
    document.addEventListener('keydown', function(e) {
      if (e.keyCode === 27) {
        this.modal.classList.remove('modal-visible');
        this.playAgain();
      }
    });
  
    // If enter is pressed, closes modal and restarts game
    document.addEventListener('keydown', enterPress);
  
    // If user clicks modal's close icon, closes modal and restarts game
    this.closeIcon.addEventListener('click', function() {
      this.modal.classList.remove('modal-visible');
      this.playAgain();
    });
  }

  /* This is called by the update function and loops through all of the
   * objects within your allEnemies array as defined in app.js and calls
   * their update() methods. It will then call the update function for your
   * player object. These update methods should focus purely on updating
   * the data/properties related to the object. Do your drawing in your
   * render methods.
   */
  updateEntities(dt) {
    for(let k in this.allEnemies) { 
      this.allEnemies[k].update(dt);
      // When collision occurs, subtracts a life, updates lives displayed in sidebar, 
      // and updates score that will be displayed in modal if no lives remaining
      if (this.allEnemies[k].collidesWith(this.player)) {
        this.player.x = 200;
        this.player.y = 400;
        this.lives--;
        this.sidebarLives.innerHTML = this.lives;
        this.modalScore.innerHTML = this.score;
        if (this.lives === 0) {
          this.isDead = true;
        }
      }      
    }

    this.player.update();
    if (this.player.y < 10) {
      this.player.x = 200;
      this.player.y = 400;
      this.score++;
      this.sidebarScore.innerHTML = this.score;
    }

    this.gem.update();
    // Generates new gem of random color and random x and y value from arrays
    if (this.gem.collidesWith(this.player)) {      
      this.gem = new Gem(0, 0 , {x:32,y:48}, 30);
      this.score += 5;
      this.sidebarScore.innerHTML = this.score;
    }
  }
}