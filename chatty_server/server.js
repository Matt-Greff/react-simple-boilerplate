// server.js

const express = require('express');
const uuidv4 = require('uuid/v4');
const SocketServer = require('ws')
  .Server;

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
  // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({
  server
});
let userCount = 0;
wss.on('connection', (ws) => {
  userCount++;
  let oldName = 'anonymous';

  const greeting = `${oldName} has joined the chat`
  const userColor = colorPicker();
  const greeter = JSON.stringify({
    "id": uuidv4(),
    "type": "notification",
    "content": greeting,
    userCount
  })
  wss.broadcast(greeter);

  console.log('Client connected');
  ws.on('message', function incoming(message) {
    // Broadcast to all.
    const {
      username,
      content
    } = JSON.parse(message)
    const check = oldName === 'anonymous' && oldName === username;
    if(!check) {
      const notification = `${oldName} changed their handle to ${username}`
      const notify = JSON.stringify({
        "id": uuidv4(),
        "type": "notification",
        username,
        "content": notification
      })
      wss.broadcast(notify);
    }
    oldName = username;
    const messOut = JSON.stringify({
      "id": uuidv4(),
      "type": 'message',
      username,
      content,
      userColor
    })
    wss.broadcast(messOut);
  });
  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    userCount--;
    const farewell = `${oldName} has left the chat`
    const fareweller = JSON.stringify({
      "id": uuidv4(),
      "type": "notification",
      "content": farewell,
      userCount
    })
    wss.broadcast(fareweller);
    console.log('Client disconnected')
  });
});

wss.broadcast = function broadcast(message) {
  wss.clients.forEach(function each(client) {
      client.send(message);
    });
};

const colorPicker = () => {
  let rando = () => (Math.floor(Math.random() * 250)).toString();
  return `rgb(${rando()}, ${rando()}, ${rando()})`
}