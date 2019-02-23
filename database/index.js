const knex = require('../knex/knex.js');

var getImg = (houseId, cb) => {
  return knex('photos').where({
    house_id: houseId
  })
    .select ('img_url', 'img_order')
    .orderBy('img_order')
    .then ((rows) => {
      cb (null, rows);
    })
    .catch ( (error) => {
      cb (error);
    });
};

var changeOrder = (pic, cb) => {
  return getStatus (pic, (err, status) => {
    if (err) {
      return getImg (pic.house_id, cb);
    } else {
      status['house_id'] = pic.house_id;
      return getBtwn (status, (err, result) => {
        if (err) {
          return cb (err);
        } else if (result.length < pic.oldOrder) {
          return cb (console.error('Order number is out of range'));
        } else {
          return updateOrder(pic, pic.newOrder, (err) => {
            if(err) {
              return cb(err);
            } else {
              return shiftImgs(result, status, (err)=>{
                if(err) {
                  return cb(err);
                } else {
                  return getImg (pic.house_id, cb);
                }
              });
            }
          });
        }
      });
    }
  });

};

var getStatus = (obj, cb) => {
  var status = {};
  if (obj.oldOrder === obj.newOrder) {
    return cb('equal', null);
  } else if (obj.oldOrder > obj.newOrder) {
    status.shiftOne = (num) => { return num + 1; };
    status.head = obj.newOrder;
    status.tail = obj.oldOrder;
    status.add = true;
  } else if (obj.oldOrder < obj.newOrder) {
    status.shiftOne = (num) => { return num - 1; };
    status.head = obj.oldOrder;
    status.tail = obj.newOrder;
    status.add = false;
  }
  return cb(null, status);
};

var getBtwn = (obj, cb) => {
  knex('photos').where({
    house_id: obj.house_id
  })
    .whereBetween('img_order', [obj.head, obj.tail])
    .select('img_url', 'img_order', 'house_id')
    .then((rows) => {
      return cb(null, rows);
    })
    .catch((error) => {
      return cb(error);
    });
};

var updateOrder = (pic, order, cb, indx) => {
  
  knex('photos').where({
    img_url: pic.img_url,
    house_id: pic.house_id
  })
    .update({
      img_order: order
    })
    .then(()=>{ 
      return cb(null, indx+1);
    })
    .catch((error) => {
      return cb(error);
    });
};

var shiftImgs = (gallery, status, cb) => {
  if(status.add){
    var start = 0;
    var end = gallery.length - 1;
  } else {
    var start = 1;
    var end = gallery.length;
  }

  var recursive = (i, end, cb) => {
    return updateOrder(gallery[i], status.shiftOne(gallery[i].img_order), (err, index) => {
      if(err) { 
        console.log(err);
        return cb(err); 
      } else if (index >= end) {
        console.log(index);
        return cb(err); 
      } else {
        return recursive(index, end, cb);
      }
    }, i);
  };

  return recursive(start, end, cb);
};

module.exports = {getImg, changeOrder};