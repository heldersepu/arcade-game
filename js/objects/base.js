export default class BaseGameObject {
  constructor(x, y, offset, radius) {
    this.x = x;
    this.y = y;
    this.offset = offset;
    this.radius = radius;
  }

  get centerX() {
    return this.x - this.offset.x;
  }

  get centerY() {
    return this.y - this.offset.y;
  }

  collidesWith(object) {
    return Math.sqrt(
        Math.pow(this.centerX - object.centerX, 2) + 
        Math.pow(this.centerY - object.centerY, 2)
    ) <  (this.radius + object.radius)
  }

  // Draws player on screen
  render(ctx, resources) {
    ctx.drawImage(resources.get(this.sprite), this.x, this.y)    
  }  
}