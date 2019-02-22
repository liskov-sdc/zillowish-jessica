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
  //we expect old/new order num,imgURL, houseID,callback
  //we want to compare prior to new
  //if prior > new 
    //func  to add
      //get gallery list of houseID where order is between prior to new
  //else
    //func to subtract
      //get gallery list of houseID where order is between prior to new

  //for loop over gallery with modified list
    //modify specific img url with new order

  //lastly return new list to client

  // return knex('photos').where({
  //   img_url: obj.imgURL,
  //   house_id: obj.houseID
  // })
  //   .update({
  //     img_order: obj.order
  //   })
  //   .select('img_url', 'img_order')
  //   .then((rows) => {
  //     cb(null, rows);
  //   })
  //   .catch((error) => {
  //     cb(error);
  //   });
};

module.exports = {getImg, changeOrder};