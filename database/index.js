const knex = require('../knex/knex.js');

var getImg = (houseId, cb) => {
  // SELECT img_url, img_order from `photos` where house_id = {houseID} 
  return knex('photos').where({
    house_id: houseId
  })
    .select('img_url', 'img_order')
    .then((rows) => {
      cb(rows);
    })
    .catch((error) => {
      console.error(error);
    });
};

var changeOrder = (houseID, imgURL, order) => {
  //update `photos` set `img_order` = {order} where `img_url` = {imgURL} AND `house_id` = {houseID}
  return knex('photos').where({
    img_url: imgURL,
    house_id: houseID
  })
    .update({
      img_order: order
    })
    .catch((error) => {
      console.error(error);
    });
};

module.exports = {getImg, changeOrder};