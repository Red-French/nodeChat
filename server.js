"use strict";

const express = require('express');
const app = express();
const server = require('http').createServer(app);  // think this is wrapped around the Experss server because of 2 different protocols being used
const ws = require('socket.io')(server);  // passing the server into socket.io ---> ws for 'websockets'

const PORT = process.env.PORT || 3000;

app.set('view engine', 'jade');

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('index');
});

//asdapp.get('/', (req, res) => {
//  res.send('hello');
//});

server.listen(PORT, () => {
  console.log(`Server listening on PORT: ${PORT}`);
});

ws.on('connection', (socket => {  // callback fired every time a connection is made
  console.log('*******  back-end connection *******', socket);

  socket.on('sendChat', (msg) => {
    console.log(msg);  // console log in server
    // ws.emit('receieveChat', msg);  // emit to everyone else when a message is heard
    socket.broadcast.emit('receiveChat', msg)  // this let's the msg appear on the sender's screen before being sent via server to others
  });
}));
