import { createServer } from 'node:http';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { randomUUID } from "node:crypto";

import express from 'express';
import { Server } from 'socket.io';

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const server = createServer(app);
const io = new Server(server, {
  connectionStateRecovery: {}
});

// app.get('/', (req, res) => {
//   res.sendFile(join(__dirname, 'index.html'));
// });

async function main() {
  let rooms = []
  let users = []

  app.use(express.static('public'));
  io.on('connect', (socket) => {
    console.log('user connected:', socket.id);
    // console.log(socket.rooms);
    // console.log(socket.client);


    // create user
    // const user = createUser(socket.id);
    // users.push(user);

    // create a room
    // socket.on('create room', (args) => {
    //   const [name] = args;
    //   const room = createRoom(name);
    //   rooms.push(room);
    //   joinRoom(socket, room);
    //   console.log(rooms);
    //   io.to(room.id).emit('chat message', `room ${room.name}: ${room.id} `);
    // })

    // join a room
    // socket.on('join room', (args) => {
    //   const [roomId] = args;
    //   // const room = findRoomById(roomId);
    //   const room = findAvailableRoom();
    //   if (!room) socket.emit('room not found id: ' + roomId);
    //   joinRoom(socket, room);
    //   io.to(room.id).emit('hello', 'world');
    // })

    // leave a room
    // socket.on('leave room', (args) => {
    //   const [id] = args;
    //   const room = findRoomById(id);
    //   if (!room) socket.emit('room not found id: ' + id);
    //   leaveRoom(socket, room);
    // })

    socket.on('chat message', (args) => {
      // console.log('message: ' );
      const [msg] = args;
      // const user = getUser(socket.id);

      // broadcast to all connected clients in the room
      // io.to(user.room).emit('chat message', `${user.name}: ${msg}`);

      // this will emit the event to all connected sockets
      io.emit('chat message', `${socket.id}: ${msg}`);

      // this will emit the event to all connected sockets except the one that sent the message
      // socket.broadcast.emit('chat message', msg);

      // Emits to this client
      // socket.emit('chat message', msg);
    });

    socket.on('disconnect', () => {
      console.log('user disconnected', socket.id);
      // const room = getUser(socket.id).actualRoom;
      // leaveRoom(socket, room);
      // deleteUser(socket.id);
    });
  });

  server.listen(3000, () => {
    console.log('server running at http://localhost:3000');
  });

}

main();

// ROOMS
// function createRoom(roomOptions) {
//   const { name, isPrivate } = roomOptions;
//   const id = randomUUID();
//   const room = { id: id, name: name ?? id, users: [], maxUsers: 2, isAvailable: true, isPrivate: isPrivate ?? false };
//   return room;
// }

// function findRoomById(roomId) {
//   const room = rooms.find(room => room.id === roomId);
//   if (!room) return createRoom();
//   if (!room.isAvailable) return createRoom();
//   return room;
//   // throw new Error('room not found');
// }

// function findAvailableRoom() {
//   const room = rooms.find(room => room.isAvailable);
//   if (!room) return createRoom();
//   return room;
//   // throw new Error('room not found');
// }

// function getAllRooms() {
//   return rooms;
// }

// function joinRoom(socket, room) {

//   socket.join(room.id);
//   room.users.push(socket.id);
//   getUser(socket.id).actualRoom = room.id;
//   if (room.users.length >= room.maxUsers) room.isAvailable = false;
// }

// function leaveRoom(socket, room) {
//   const { users, id } = room;
//   const userIdx = users.indexOf(socket.id);

//   users.splice(userIdx, 1);
//   socket.leave(id);
//   if (users.length <= 0) {
//     const roomIdx = rooms.findIndex(r => r.id === id);
//     if (roomIdx !== -1) rooms.splice(roomIdx, 1);
//     return;
//   }
//   room.isAvailable = true;
// }


// // USERS
// function createUser(userId, name) {
//   const user = { id: userId, name: name ?? userId, actualRoom: null };
//   return user
// }

// function getUser(userId) {
//   return users.find(user => user.id === userId);
// }

// function deleteUser(userId) {
//   const index = users.findIndex(user => user.id === userId);
//   if (index !== -1) users.splice(index, 1);
// }