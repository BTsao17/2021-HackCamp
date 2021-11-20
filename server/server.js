const express = require('express');
const { Server } = require('socket.io');

//App setup
const app = express();
const port = process.env.PORT || 8080;
const server = app.listen(port, () => {
  console.log(`listening to request on port ${port}`);
});

//Socket setup
const io = new Server(server, {
  /*options*/
  serveClient: false,
  cors: {
    origin: 'http://localhost:3000',
  },
});

//list of connected users/sockets
let connectedUsers = {};

//Socket connection
io.on('connection', async (socket) => {
  console.log('made socket connection', socket.id);

  //check the number of socket connections
  const sockets = await io.fetchSockets();
  console.log('number of socket connection:', sockets.length);
  let socketIDs = sockets.map((socket) => socket.id);
  console.log('socketIDS:', socketIDs);

  //user enters chat
  socket.on('login', (data) => {
    console.log('username:', data);
    if (!connectedUsers[socket.id]) {
      connectedUsers[socket.id] = data.username;
    }
    else {
      console.log('user already exists!');
    }

    console.log('connected users:', connectedUsers);

    socket.emit('send message', {
      user: 'login',
      text: 'You have entered the chat.',
    });
    socket.broadcast.emit('send message', {
      user: 'login',
      text: `${data.username} has entered the chat.`,
    });
  });

  //send text
  socket.on('send message', (data) => {
    console.log(data);
    socket.emit('send message', data);
    socket.broadcast.emit('send message', data);
  });

  //user leaves chat
});
