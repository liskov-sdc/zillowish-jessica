const knex = require('../knex/knex.js');

var getImg = (houseId, cb) => {
  return knex('photos').where({
    house_id: houseId
  })
    .select('img_url', 'img_order')
    .then((rows) => {
      cb(null, rows);
    })
    .catch((error) => {
      cb(error);
    });
};

var changeOrder = (obj, cb) => {

  if (obj.oldOrder === obj.newOrder){
    return getImg(obj.houseId, cb);
  }
  else if(obj.oldOrder > obj.newOrder) {
    var updateOrder = (num) => { return num+1; };
    var head = obj.newOrder;
    var tail = obj.oldOrder;
    var add = true;
  } 
  else if(obj.oldOrder < obj.newOrder){
    var updateOrder = (num) => { return num-1; };
    var head = obj.oldOrder;
    var tail = obj.newOrder;
    var add = false;
  }
  else {
    //error
  }

  (async function(){
    await knex('photos').where({
    house_id: houseId
    })
    .whereBetween('img_order', [head, tail])
    .select('img_url', 'img_order', 'house_id')
    .then((rows) => {
      gallery = rows;
    })
    .catch((error) => {
      return cb(error);
    });
  })();

  if(add){
    var start = 0;
    var end = gallery.length - 1;
  } else {
    var start = 1;
    var end = gallery.length;
  }

  for(var i = start; i < end; i++ ){
    (async function(){
      await knex('photos').where({
        img_url: gallery[i].img_url,
        house_id: gallery[i].house_id
      })
        .update({
          img_order: updateOrder(gallery[i].img_order)
        })
        .catch((error) => {
          return cb(error);
        });
    })()
  }

  return getImg(obj.houseId, cb);
};

module.exports = {getImg, changeOrder};