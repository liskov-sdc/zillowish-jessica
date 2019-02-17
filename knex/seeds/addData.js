/* file created by running: knex seed:make addData --env development */
exports.seed = function(knex, Promise) {
  var houseList = [];
  var photoList = [];
  var dataSize = 100;
  for(var i= 0; i < dataSize; i++) {
    houseList.push({'name': (i+1).toString()});
    var a = getPhotos(i+1);
    photoList = photoList.concat(a);
  }

  return Promise.all([
    knex('houses').del(),
    knex('photos').del(),
    knex('houses').insert(houseList),
    knex('photos').insert(photoList)
  ]);
};

var getPhotos = (id) => {
  return [
    {  img_url: 'https://s3-us-west-1.amazonaws.com/zillowgallerydata/apartment-323780.jpg',
       img_order: 0,
       house_id: id
    },
    {  img_url: 'https://s3-us-west-1.amazonaws.com/zillowgallerydata/barn-314937.jpg',
       img_order: 1,
       house_id: id
    },
    {  img_url: 'https://s3-us-west-1.amazonaws.com/zillowgallerydata/blue-sky-462358.jpg',
    img_order: 2,
    house_id: id
    },
    {  img_url: 'https://s3-us-west-1.amazonaws.com/zillowgallerydata/country-463996.jpg',
       img_order: 3,
       house_id: id
    },
    {  img_url: 'https://s3-us-west-1.amazonaws.com/zillowgallerydata/daylight-1396122.jpg' ,
       img_order: 4,
       house_id: id
    },
    {  img_url: 'https://s3-us-west-1.amazonaws.com/zillowgallerydata/driveway-186077.jpg',
       img_order: 5,
       house_id: id
    }
  ];
};

