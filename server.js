const express = require('express'),
  app = express(),
  fs = require('fs'),
  server = require('http').createServer(app),
  io = require('socket.io')(server)


// const certs = {
//   key: fs.readFileSync('key.pem'),
//   cert: fs.readFileSync('cert.pem')
// }

const port = process.env.PORT || 7002



let data = ''

const allowedIDs = ['cG9iYWdt']

app.use('cors')

server.get('/', (req, res) => {
  res.end(data)
});

server.post('/post', (req, res) => {
  console.log(req.query.id)
  if(allowedIDs.indexOf(req.query.id > -1)) {
    data = JSON.stringify(req.body)
    console.log(data)
    io.emit('service.dataLayer.received');
  } else {
    io.emit('service.dataLayer.innactive')
  }
  res.end('POST')
  console.log(JSON.stringify(data) || 'No data')
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

server.listen(port, () => {
  console.log('App started on port:' + port)
});
