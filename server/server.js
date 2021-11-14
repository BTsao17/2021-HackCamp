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
    origin: 'http://localhost:8080',
  },
});

//Socket connection
io.on('connection', async (socket) => {
  console.log('made socket connection', socket.id); 

  //check the number of socket connections
  const sockets = await io.fetchSockets();
  console.log('number of socket connection', sockets.length);
  let socketIDs = sockets.map((socket) => socket.id);
  console.log('socketIDS:', socketIDs);

});