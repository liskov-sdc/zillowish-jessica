var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var db = require('../database/index');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/../client/dist'));

var port = 3002;
 
app.get('/house/:houseID', function (req, res) {
  var id = Number(req.params.houseID);
  console.log('reqP: ',req.params,'id: ', id);
  db.getImg(id,(data)=>{
    console.log('D: ',data);
    res.send(data);
  });
});
 
app.listen(port, ()=>{
  console.log(`Listening on Port: ${port}`);
});