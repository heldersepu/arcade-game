import BaseGameObject from './base.js';

export default class Gem extends BaseGameObject {
  constructor(x, y, center, radius) {
    super(x, y, center, radius);
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

  update() {    
  }
}