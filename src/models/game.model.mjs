export class Game {
  inputsMap = {};
  players = [];
  shoots = [];
  debug = false;

  constructor(
    width,
    height,
  ) {
    this.width = width;
    this.height = height;
  }

  update() {
    try {

      this.players.forEach((player) => {
        player.update(this.inputsMap[player.id]);
      });
      this.shoots.forEach((shoot) => {
        shoot.update();
      });
      this.shoots = this.shoots.filter((shoot) => !shoot.markedForDeletion);
    } catch (error) {
      console.log(error);
    }

  }

}