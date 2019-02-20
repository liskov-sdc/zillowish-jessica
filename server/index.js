var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var db = require('../database/index');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/../client/dist'));

var port = 3002;
 
app.get('/gallery/:id', function (req, res) {
  var id = Number(req.params.id);
  console.log('reqP: ', req.params, 'id: ', id);
  db.getImg(id, (data)=>{
    console.log('D: ', data);
    res.send(data);
  });
});

app.post('/gallery/update/:order',(req, res) => {
  console.log('reqP: ', req.params, 'id: ', order);
  res.send('imgs');
});
 
app.listen(port, ()=>{
  console.log(`Listening on Port: ${port}`);
});