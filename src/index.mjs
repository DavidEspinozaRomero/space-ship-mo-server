// packages
import { createServer } from 'node:http';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { randomUUID } from "node:crypto";

// 3th party packages
import express from 'express';
import { Server } from 'socket.io';

// local packages
import { Game } from './models/game.model.mjs';
import { Player } from './models/player.model.mjs';
// import { createUser } from './users.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const server = createServer(app);
const io = new Server(server, {
  connectionStateRecovery: {},
  cors: {
    origin: "*"
  }
});

// app.get('/', (req, res) => {
//   res.sendFile(join(__dirname, 'index.html'));
// });


const ticksPerSecond = 30;
const canvas = { width: 1000, height: 1000 };
const game = new Game(canvas.width, canvas.height);


(async function main() {
  io.on('connect', (socket) => {

    // send canvas
    socket.emit('canvas', canvas);

    // create player
    game.inputsMap[socket.id] = [];
    const player = new Player(game, socket.id);
    game.players.push(player);


    // handle inputs
    socket.on('inputs', (inputs) => {
      game.inputsMap[socket.id] = inputs;
    })

    socket.on('disconnect', () => {
      game.players = game.players.filter((p) => p.id !== socket.id);
    });
  });

  server.listen(3000, () => {
    console.log('server running at http://localhost:3000');
  });

  setInterval(tick, 1000 / ticksPerSecond);
  // ticksPerSecond
})();

function tick() {

  game.update();
  io.emit('players', game.players.map((player) => {
    const { game, ...playerProps } = player;
    return playerProps
  }));

  console.log(game.shoots[0]);
  io.emit('shoots', game.shoots.map((shoot) => {
    const { game, ...shootProps } = shoot;
    return shootProps
  }));


}






