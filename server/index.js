var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var db = require('../database/index');
var cors = require('cors');    
var port = 3002;

app.use(express.static(__dirname + '/../client/dist', {maxAge: 5000})); //sets maxAge to 5sec
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({origin:"http://localhost:3000"}));
 
app.get('/gallery/:id',function (req, res) {
  var id = Number(req.params.id);
  db.getImg(id, (err, data)=> {
    if(err) {
      res.status(400).send()
    } else {
      res.status(200).send(data);
    }
  });
});

app.post('/gallery/update', (req, res) => {
  var pic = {
    img_url: req.body.img,
    house_id: req.body.id,
    newOrder: req.body.newOrder,
    oldOrder: req.body.oldOrder
  };
  if(isNaN(req.body.newOrder)) {
    res.status(400).send();
  } else {
    db.changeOrder(pic, (err, data)=> {
      if(err) {
        res.status(400).send();
      } else {
        res.status(200).send(data);
      }
    });
  }
});

app.listen(port, ()=>{
  console.log(`Listening on Port: ${port}`);
});