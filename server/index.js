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
  db.getImg(id, (err,data)=> {
    if(err) {
      res.sendStatus(400);
    } else {
      res.send(data);
    }
  });
});

app.post('/gallery/update',(req, res) => {
  var pic = {
    img_url: req.body.img,
    house_id: req.body.id,
    newOrder: req.body.newOrder,
    oldOrder: req.body.oldOrder
  };
  if(isNaN(req.body.newOrder)) {
    res.status(400).end();
  } else {
    db.changeOrder(pic, (err, data)=> {
      if(err) {
        res.status(400).end();
      } else {
        res.status(200);
        res.send(data);
      }
    });
  }
});
 
app.listen(port, ()=>{
  console.log(`Listening on Port: ${port}`);
});