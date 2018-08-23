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

    // When collision occurs, subtracts a life, updates lives displayed in sidebar, and updates score that will be displayed in modal if no lives remaining
    if ((player.x < (this.x + 50)) && ((player.x + 17) > this.x) && (player.y < (this.y + 50)) && ((50 + player.y) > this.y)) {
      player.x = 200;
      player.y = 400;
      lives--;
      sidebarLives.innerHTML = lives;
      modalScore.innerHTML = score;
      if (lives === 0) {
        isDead = true;
        // Calls function that adds class that sets modal to display: block
        showModal();
      }
    }
  }

  // Draws enemy on screen
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
};