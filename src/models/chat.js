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

    // socket.on('chat message', (args) => {
    //     // console.log('message: ' );
    //     const [msg] = args;
    //     // const user = getUser(socket.id);
  
    //     // broadcast to all connected clients in the room
    //     // io.to(user.room).emit('chat message', `${user.name}: ${msg}`);
  
    //     // this will emit the event to all connected sockets
    //     io.emit('chat message', `${socket.id}: ${msg}`);
  
    //     // this will emit the event to all connected sockets except the one that sent the message
    //     // socket.broadcast.emit('chat message', msg);
  
    //     // Emits to this client
    //     // socket.emit('chat message', msg);
    //   });