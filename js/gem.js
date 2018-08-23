export default class Gem {
  constructor(x, y) {
    // X-axis (horizontal) values: (start from left)
    this.gemX = [17, 119, 220, 321, 422];
    // Y-axis (vertical) values (start from top)
    this.gemY = [124, 208, 290, 373];
  
    this.collectibles = [
      'images/Gem Blue Sm.png',
      'images/Gem Orange Sm.png',
      'images/Gem Green Sm.png'
    ];
    
    // Math.random() function returns random number between 0 (inclusive) and 1 (exclusive). Math.floor() returns the largest integer less than or equal to a given number. 
    // Since collectibles is an array, starts at 0, so we want index 0, 1, or 2. (If Math.random were 0.99, it would would become 2.99 after being multiplied by 3, then Math.floor would make it 2)
    this.sprite = this.collectibles[Math.floor(Math.random() * 3)];
    this.x = this.gemX[Math.floor(Math.random() * this.gemX.length)];
    this.y = this.gemY[Math.floor(Math.random() * this.gemY.length)];
    this.imgWidth = 65;
    this.imgHeight = 88;
  }

  // Draws gem on screen
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y)
  }

  update() {
    // Not sure why this if statement only works when player approaches gem from below (a higher y value)
    if ( ((Math.abs( (player.imgWidth + player.x) - (this.x + this.imgWidth) ) < 55)) && ((Math.abs( (player.imgHeight + player.y) - (this.y + this.imgHeight) ) < 55)) ) {
      // Generates new gem of random color and random x and y value from arrays
      this.x = this.gemX[Math.floor(Math.random() * this.gemX.length)];
      this.y = this.gemY[Math.floor(Math.random() * this.gemY.length)];
      this.sprite = this.collectibles[Math.floor(Math.random() * 3)];
      score += 5;
      sidebarScore.innerHTML = score;
    }
  }
}