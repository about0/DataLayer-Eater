const express = require('express'),
  app = express(),
  fs = require('fs'),
  server = require('https').createServer(
    {
      key: fs.readFileSync('key.pem'),
      cert: fs.readFileSync('cert.pem')
    },
    app
  ),
  io = require('socket.io')(server);

let data = {};
const allowedIDs = ['cG9iYWdt']


app.get('/', (req, res) => {
  res.end('Tesing')
});

app.post('/post', (req, res) => {
  if(allowedIDs.indexOf(req.query.id > -1)) {
    data = res.body
    io.emit('service.dataLayer.received');
  } else {
    io.emit('service.dataLayer.innactive')
  }
  console.log(data || 'No data')
})

io.on('connection', function(client) {
  console.log('Client connected...');

  client.on('join', function(data) {
    console.log(data);
  });

  client.on('messages', data => {
    client.emit('broad', data);
    client.broadcast.emit('broad', data);
  });
});

server.listen(7002);
