import { Component, ElementRef, OnInit, viewChild } from '@angular/core';
import { InputHandler } from './models/input-handler.model';

@Component({
  selector: 'app-star-ship-fights',
  standalone: true,
  imports: [],
  templateUrl: './star-ship-fights.component.html',
  styleUrl: './star-ship-fights.component.scss',
})
export class StarShipFightsComponent implements OnInit {
  canvas1 = viewChild<ElementRef<HTMLCanvasElement>>('canvas1');
  canvas!: HTMLCanvasElement;
  ctx!: CanvasRenderingContext2D | null;

  game!: Game;

  // inputHandler = new InputHandler();
  assets: { [key: string]: HTMLImageElement } = {
    spaceShipImg: new Image(),
  };
  spaceShipImg: { src: string } = new Image();

  ngOnInit(): void {
    if (this.canvas1()) {
      this.canvas = this.canvas1()!.nativeElement;
      this.canvas.width = 500; // window.innerWidth;
      this.canvas.height = 500; // window.innerHeight;
      this.ctx = this.canvas.getContext('2d');
      this.assets['spaceShipImg'].src = 'assets/space-ship.png';
    }

    this.game = new Game(this.canvas.width, this.canvas.height, this.assets);
    if (this.ctx) {
      this.animate(this.ctx);
    }
  }

  animate(
    ctx: CanvasRenderingContext2D,
    timestamp: number = performance.now()
  ) {
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.game.update();
    this.game.draw(ctx);
    requestAnimationFrame(() => this.animate(ctx, timestamp));
  }
}

class Bot {
  maxHealth: number = 100;
  health: number = this.maxHealth;
  damage: number = 10;
  // img: HTMLImageElement;
  width: number = 50;
  height: number = 50;
  speed: number = 0;
  x: number = this.game.width - this.width;
  y: number = this.game.height - this.height;

  constructor(private game: Game) {}

  update(input: string[], deltaTime: number) {}
  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = 'red';
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  shoot() {}
}

class Player {
  // maxHealth: number = 100;
  // health: number = this.maxHealth;
  // damage: number = 10;
  // img: HTMLImageElement;
  width = 30;
  height = 50;
  speed = 0;
  maxSpeed = 5;
  angle = Math.floor(Math.random() * 8) * 45;
  cooldownAngle = 0;
  cooldown = 0;

  x = this.game.width * 0.5 - this.width;
  y = this.game.height * 0.5 - this.height;

  directionX = Math.cos((this.angle * Math.PI) / 180);
  directionY = Math.sin((this.angle * Math.PI) / 180) * -1;

  constructor(private game: Game) {}

  update(input: string[]) {
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

    // this.speed *= this.friction;
  }
  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillRect(10, 20, 10, 20);
    ctx.save();
    ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
    ctx.rotate((this.angle * Math.PI) / 180);
    ctx.drawImage(
      this.game.assets['spaceShipImg'],
      this.x,
      this.y,
      this.width,
      this.height,
      -this.width / 2,
      -this.height / 2,
      this.width,
      this.height
    );
    ctx.restore();

    // ctx.save();
    // const centerX = this.x + this.width * 0.5;
    // const centerY = this.y + this.height * 0.5;
    // ctx.translate(centerX, centerY);
    // ctx.rotate((((this.angle - 90) * Math.PI) / 180) * -1);
    // ctx.translate(-centerX, -centerY);
    // ctx.fillStyle = 'blue';
    // ctx.fillRect(this.x, this.y, this.width, this.height);
    // ctx.fillStyle = `red`;
    // ctx.fillRect(this.x + this.width - 30, this.y, 30, 10);
    // ctx.restore();
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

class Shoot {
  markedForDeletion = false;
  directionX = Math.cos((this.angle * Math.PI) / 180);
  directionY = Math.sin((this.angle * Math.PI) / 180) * -1;
  speed = 3;

  constructor(
    private game: Game,
    private x: number,
    private y: number,
    private angle: number
  ) {}

  update() {
    // move shoot by angle
    this.x += this.directionX * this.speed;
    this.y += this.directionY * this.speed;
    if (this.x < 0) this.markedForDeletion = true;
    if (this.x > this.game.width) this.markedForDeletion = true;
    if (this.y < 0) this.markedForDeletion = true;
    if (this.y > this.game.height) this.markedForDeletion = true;
  }
  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  }
}

class Game {
  inputHandler = new InputHandler();
  player = new Player(this);
  // bot = new Bot(this);
  shoots: Shoot[] = [];
  constructor(
    public readonly width: number,
    public readonly height: number,
    public assets: { [key: string]: HTMLImageElement }
  ) {}

  update() {
    // console.log(this.shoots);

    this.player.update(this.inputHandler.keys);
    this.shoots.forEach((shoot) => {
      shoot.update();
    });
    this.shoots = this.shoots.filter((shoot) => !shoot.markedForDeletion);
  }
  draw(ctx: CanvasRenderingContext2D) {
    this.player.draw(ctx);
    this.shoots.forEach((shoot) => {
      shoot.draw(ctx);
    });
  }
}
