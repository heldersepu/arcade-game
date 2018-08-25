export default class Enemy {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    // Sets speed of enemy
    this.speed = 70 + Math.floor(Math.random() * 450);
    // The image/sprite for our enemies
    this.sprite = 'images/enemy-bug.png';
  }

  update(dt) {
    // Multiplies enemy's movement by time delta to ensure game runs at same speed for all computers
    this.x += this.speed * dt;
    // Once enemy finished moving across screen, moves it back so it can cross screen again and randomizes its speed
    if (this.x > 500) {
      this.x = -75;
      // Math.random() function returns random number between 0 (inclusive) and 1 (exclusive). Math.floor() returns the largest integer less than or equal to a given number
      this.speed = 70 + Math.floor(Math.random() * 450);
    }
  }

  // Draws enemy on screen
  render(ctx, resources) {
    ctx.drawImage(resources.get(this.sprite), this.x, this.y);
  }
};