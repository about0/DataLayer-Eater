var express = require('express')
 , async = require('async')
 , http = require('http');
var bodyParser = require('body-parser')

var cors = require('cors')
var app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors()) 
// parse application/json 
app.use(bodyParser.json())

app.post('/post/', function(req, res) {
   // print to console
   console.log(req.body);
   // just call res.end(), or show as string on web
   res.send(JSON.stringify(req.body, null, 4));
});

app.listen(7002);