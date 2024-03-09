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

