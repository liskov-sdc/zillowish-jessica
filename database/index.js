const knex = require('../knex/knex.js');

/* create function to retrieve specific house images */
var getImg = (houseId, cb) => {
    // SELECT img_url, img_order from `photos` where house_id = {houseID} 
    return knex('photos').where({
        house_id: houseId
      })
      .select('img_url','img_order')
      .then((rows) => {
        cb(rows);
      })
      .catch((error) => {
        console.error(error);
      });
};

module.exports = {getImg};