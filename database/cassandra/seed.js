const cassandra = require('cassandra-driver');
const performance = require('perf_hooks').performance;
// const getTime = require('time-uuid/time');
// const getIdByTime = require('time-uuid/get-by-time');

var houseSeed = async function() {
  const client = new cassandra.Client({ 
    contactPoints: ['127.0.0.1'],
    localDataCenter: 'datacenter1',
    keyspace: 'zillow'
  });
  
  var t0 = performance.now();
  var dataSize = 10000001;
  let i = 0;
  const query = `INSERT INTO houses (house_id, name) values (?, ?)`;
  var params = [];
  while(i < dataSize) {
    let houseObj = {};
    houseObj.query = query;
    houseObj.params = [i, i.toString()];
    params.push(houseObj);
    if (i % 2000 === 0) {
      await client.batch(params, {prepare: true});
      params = [];
    }
    i++;
  }
  var t1 = performance.now();
  console.log("Call to seed took " + (t1 - t0) + " milliseconds.");
  client.shutdown();
}

var getRandomInt = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
}
  
var photoSeed = async function() {
  const client = new cassandra.Client({ 
    contactPoints: ['127.0.0.1'],
    localDataCenter: 'datacenter1',
    keyspace: 'zillow'
  });
  
  var t0 = performance.now();
  const maxNumPictures = 8;
  var dataSize = 10000001;
  let i = 0;
  const query = `INSERT INTO photos (img_url, 
    img_order, house_id) values (?, ?, ?)`;
  var params = [];
  while(i < dataSize) {
    j = 0;
    var numPics = getRandomInt(maxNumPictures);
    while (j < numPics) {
      let photoObj = {};
      photoObj.query = query;
      var randomNum = getRandomInt(1000);
      photoObj.params = [`https://loremflickr.com/250/200?random=${randomNum+j}`, j, i];
      params.push(photoObj);
      j++;
    }
    if (i % 100 === 0) {
      await client.batch(params, {prepare: true});
      params = [];
    }
    i++;
  }
  var t1 = performance.now();
  console.log("Call to seed took " + (t1 - t0) + " milliseconds.");
  client.shutdown();
}

// houseSeed();
photoSeed();