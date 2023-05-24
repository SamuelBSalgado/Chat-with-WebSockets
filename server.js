// import { WebSocketServer } from 'ws';

// const wss = new WebSocketServer({ port: 8080 });

// wss.on('connection', (ws) => {
//   ws.on('error', console.error);

//   ws.on('message', (data) => {
//     console.log('received: %s', data);
//     ws.send("Tu mensaje fue => " + data);
//   });

//   ws.send('something');
// });

const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8081 });

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    const data = JSON.parse(message);

    switch (data.type) {
      case 'username':
        ws.username = data.username;
        break;
      case 'message':
        wss.clients.forEach(function each(client) {
          if (client !== ws && client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({
              type: 'message',
              sender: ws.username,
              time: new Date().toLocaleTimeString(),
              message: data.message
            }));
          }
        });
        break;
    }
  });

  ws.on('close', function() {
    console.log('Cliente desconectado');
  });
});