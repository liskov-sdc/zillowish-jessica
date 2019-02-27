/* file created by running: knex seed:make addData --env development */
exports.seed = function(knex, Promise) {
  var houseList = [];
  var photoList = [];
  var dataSize = 5;
  for (var i = 0; i < dataSize; i++) {
    houseList.push({'name': (i + 1).toString()});
    var a = getPhotos(i + 1);
    photoList = photoList.concat(a);
  }

  return Promise.all([
    knex('photos').del(),
    knex('houses').del(),
    knex('houses').insert(houseList),
    knex('photos').insert(photoList)
  ]);
};

var getPhotos = (id) => {
  return [
    { img_url: 'https://s3-us-west-1.amazonaws.com/zillowgallerydata/apartment-323780.jpg',
      img_order: 0,
      house_id: id
    },
    { img_url: 'https://s3-us-west-1.amazonaws.com/zillowgallerydata/bed1.jpg',
      img_order: 1,
      house_id: id
    },
    { img_url: 'https://s3-us-west-1.amazonaws.com/zillowgallerydata/bed2.jpg',
      img_order: 2,
      house_id: id
    },
    { img_url: 'https://s3-us-west-1.amazonaws.com/zillowgallerydata/bed3.jpeg',
      img_order: 3,
      house_id: id
    },
    { img_url: 'https://s3-us-west-1.amazonaws.com/zillowgallerydata/bath2.jpg',
      img_order: 4,
      house_id: id
    },
    { img_url: 'https://s3-us-west-1.amazonaws.com/zillowgallerydata/bath1.jpeg',
      img_order: 5,
      house_id: id
    },
    { img_url: 'https://s3-us-west-1.amazonaws.com/zillowgallerydata/diningRoom.jpg',
      img_order: 5,
      house_id: id
    },
    { img_url: 'https://s3-us-west-1.amazonaws.com/zillowgallerydata/kitchen.jpg',
      img_order: 5,
      house_id: id
    },
    { img_url: 'https://s3-us-west-1.amazonaws.com/zillowgallerydata/livingRoom.jpg',
      img_order: 5,
      house_id: id
    },
    { img_url: 'https://s3-us-west-1.amazonaws.com/zillowgallerydata/backyard.jpg',
      img_order: 5,
      house_id: id
    }
  ];
};

