var express = require('express');
var bodyParser = require('body-parser');
var app = express();
const knex = require('./knex/knex.js');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/../client/dist'));

var port = 3002;
 
app.get('/', function (req, res) {
  res.send('Hello World');
});
 
app.listen(port, ()=>{
  console.log(`Listening on Port: ${port}`);
});