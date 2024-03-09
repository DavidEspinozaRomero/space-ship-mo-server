export class Shoot {

  constructor(
    game,
    x,
    y,
    angle
  ) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.angle = angle;
    this.markedForDeletion = false;
    this.directionX = Math.cos((this.angle * Math.PI) / 180);
    this.directionY = Math.sin((this.angle * Math.PI) / 180) * -1;
    this.speed = 5;
  }

  update() {
    // move shoot by angle
    this.x += this.directionX * this.speed;
    this.y += this.directionY * this.speed;
    if (this.x < 0) this.markedForDeletion = true;
    if (this.x > this.game.width) this.markedForDeletion = true;
    if (this.y < 0) this.markedForDeletion = true;
    if (this.y > this.game.height) this.markedForDeletion = true;
  }

}
