export default class Player {
  constructor(x, y, speed) {
    this.sprite = 'images/char-boy.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.imgWidth = 101;    // sprite image width
    this.imgHeight = 171; // sprite image height
  }

  // When player reaches water, moves player back to starting position, and increase score by 1
  update() {
    if (this.y === 25) {
      this.x = 200;
      this.y = 400;
      score++;
      sidebarScore.innerHTML = score;
      }
  }

  // Draws player on screen
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y)
  }

  // Hidden p text from li items is passed into this method via forEach loop
  setSprite(char) {   
    playerSprites = {
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

  // If isDead is false (so it doesn't work when the modal is opened), connects keyboard input to player movement. If statements prevent player movement off screen
  handleInput(key) {
    if (isDead) {
      return;
    }

    if (key === 40 && this.y < 425) { // down
      this.y += 25; 
    }

    if (key === 38) { // up
        this.y -= 25;
    }

    if (key === 37 && this.x > 0) { // left
        this.x -= 25;
    }

    if (key === 39 && this.x < 400) { // right
        this.x += 25;
    }
  }
}
