import { Shoot } from "./shoot.model.mjs";

export class Player {
  // maxHealth: number = 100;
  // health: number = this.maxHealth;
  // damage: number = 10;

  width = 70;
  height = 100;
  speed = 0;
  maxSpeed = 5;
  // angle = Math.floor(Math.random() * 8) * 45;
  angle = 90;
  cooldownAngle = 0;
  cooldown = 0;



  constructor(game, id) {
    this.id = id;
    this.game = game;
    this.name = 'player ' + this.game.players.length;
    this.x = this.game.width * 0.5 - this.width;
    this.y = this.game.height * 0.5 - this.height;
    this.directionX = 0;
    this.directionY = 0;
  }

  update(input) {
    this.movement(input);

    // movement horizontal
    this.x += this.directionX * this.speed;
    if (this.x < 0) {
      this.x = 0;
    }
    if (this.x > this.game.width - this.width) {
      this.x = this.game.width - this.width;
    }

    // movement vertical
    this.y += this.directionY * this.speed;
    if (this.y < 0) {
      this.y = 0;
    }
    if (this.y > this.game.height - this.height) {
      this.y = this.game.height - this.height;
    }

  }

  movement(input) {
    if (input.includes(' ')) {
      this.shoot();
    }
    if (input.includes('ArrowDown')) {
      if (this.speed > 0) {
        this.speed--;
      }
    }
    if (input.includes('ArrowUp')) {
      if (this.maxSpeed > this.speed) {
        this.speed++;
      }
      this.directionX = Math.cos((this.angle * Math.PI) / 180);
      this.directionY = Math.sin((this.angle * Math.PI) / 180) * -1;
    }

    if (this.cooldownAngle > 0) {
      this.cooldownAngle--;
    } else {
      this.cooldownAngle = 10;

      if (input.includes('ArrowLeft')) {
        this.angle += 45;
      }
      if (input.includes('ArrowRight')) {
        this.angle -= 45;
      }
    }
  }
  
  shoot() {
    if (this.cooldown > 0) {
      this.cooldown--;
      return;
    }
    this.cooldown = 10;

    // calculate x and y from angle
    const centerX = this.x + this.width * 0.5;
    const centerY = this.y + this.height * 0.5;

    this.game.shoots.push(new Shoot(this.game, centerX, centerY, this.angle));
  }

}