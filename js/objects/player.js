import BaseGameObject from './base.js';

export default class Player extends BaseGameObject {
  constructor(x, y, center, radius) {
    super(x, y, center, radius);
    this.sprite = 'images/char-boy.png';
    this.imgWidth = 101;    // sprite image width
    this.imgHeight = 171; // sprite image height
  }

  // When player reaches water, moves player back to starting position, and increase score by 1
  update() {
  }

  // Hidden p text from li items is passed into this method via forEach loop
  setSprite(char) {   
    let playerSprites = {
      boy: 'images/char-boy.png',
      catGirl: 'images/char-cat-girl.png',
      hornGirl: 'images/char-horn-girl.png',
      pinkGirl: 'images/char-pink-girl.png',
      princess: 'images/char-princess-girl.png'
    }
    if (Object.keys(playerSprites).includes(char)) {
      this.sprite =playerSprites[char];
    }
  }

  // connects keyboard input to player movement. If statements prevent player movement off screen
  handleInput(key) {
    if (key === 40 && this.y < 425) { // down
      this.y += 15; 
    }

    if (key === 38 && this.y > -10) { // up
      this.y -= 15;
    }

    if (key === 37 && this.x > 5) { // left
      this.x -= 15;
    }

    if (key === 39 && this.x < 400) { // right
      this.x += 15;
    }
  }
}
