const performance = require('perf_hooks').performance;
const maxNumPictures = 8;

exports.seed = async function(knex) {
  var t0 = performance.now();
  var dataSize = 10000001;
  let i = 0;
  var params = [];
  while(i < dataSize) {
    j = 0;
    var numPics = getRandomInt(maxNumPictures);
    while (j < numPics) {
      var randomNum = getRandomInt(1000);
      params = params.concat([{img_url: `https://loremflickr.com/250/200?random=${randomNum+j}`, img_order: j, house_id: i}]);
      j++;
    }
    if (i % 1000 === 0) {
      await knex('photos').insert(params);
      params = [];
    }
    i++;
  }
  var t1 = performance.now();
  console.log("Call to seed took " + (t1 - t0) + " milliseconds.");
};

var getRandomInt = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
}