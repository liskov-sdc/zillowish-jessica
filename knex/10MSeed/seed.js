var performance = require('perf_hooks').performance;

const maxNumPictures = 8;
var LinkedList = function() {
  this.head = null;
  this.tail = null;
}
LinkedList.prototype.addToTail = function(value) {
  var node = this.Node(value);
  if (this.head === null) {
    this.head = node;
  }
  if (this.tail) {
    this.tail.next = node;
  }
  this.tail = node;
}

LinkedList.prototype.Node = function(value) {
  var node = {};
  node.value = value;
  node.next = null;
  return node;
};

exports.seed = async function(knex) {
  var t0 = performance.now();
  var dataSize = 10000000;
  var photoList = new LinkedList();
  var houseList = new LinkedList();
  let i = 0;
  await knex('houses').del();
  await knex('photos').del();
  while(i < dataSize) {
    photoList.addToTail(getPhotos(i));
    houseList.addToTail({'name': (i + 1).toString()});
    i++;
  }
  var currNode = photoList.head;
  var count = 1;
  var photoArr = [];
  while(currNode) {
    var currNodeVal = currNode.value.head;
    while(currNodeVal) {
      photoArr = photoArr.concat(currNodeVal.value);
      currNodeVal = currNodeVal.next;
    }
    if (count % 5000 === 0) {
      await knex('photos').insert(photoArr);
      photoArr = [];
    }
    currNode = currNode.next;
    count++;
  }

  var currHouseNode = houseList.head;
  var count = 1;
  var houseArr = [];
  while(currHouseNode) {
    houseArr.push(currHouseNode.value);
    if (count % 10000 === 0) {
      await knex('houses').insert(houseArr);
      houseArr = [];
    }
    currHouseNode = currHouseNode.next;
    count++;
  }
  
  var t1 = performance.now();
  console.log("Call to seed took " + (t1 - t0) + " milliseconds.")
};

var getRandomInt= (max) => {
  return Math.floor(Math.random() * Math.floor(max));
}

var getPhotos = (id) => {
  var numPics = getRandomInt(maxNumPictures);
  var randomNum = getRandomInt(1000);
  var pictureArr = new LinkedList();
  var i = 0;
  while (i < numPics) {
    let image = {};
    image.img_url = `https://loremflickr.com/250/200?random=${randomNum+i}`;
    image.img_order = i;
    image.house_id = id;
    pictureArr.addToTail(image);
    i++;
  }
  return pictureArr;
};