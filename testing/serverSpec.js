/* Make sure node server is running */
const { Client } = require('pg');
var request = require('request'); 
var expect = require('chai').expect;
var config = require('../config');
const knex = require('../knex/knex.js');

describe('Zillow Clone Server', () => {
  var dbConnect;
  
  //currently we drop db and create new tb with psql manually
  //then we run knex to seed database
  
  before((done) => {
    dbConnect = new Client(config);
    dbConnect.connect()
      .then(()=>{
        // dbConnect.query('DELETE FROM photos')
        // .then(()=>{
        //   dbConnect.query('SELECT * FROM photos')
        //     .then((result) => {
        //       knex.seed.run().then(()=>{ 
        //         done();
        //       });
        //     });
          
        // });
        // //  
        done();
      });
  });
  
  after(()=> {
    dbConnect.end();
    //drop db
  });
  
  xit('should shift images to the right when current img indx > new img indx', (done) => {
    var expected = [
      { img_url: 'https://s3-us-west-1.amazonaws.com/zillowgallerydata/apartment-323780.jpg', img_order: 0},
      { img_url: 'https://s3-us-west-1.amazonaws.com/zillowgallerydata/daylight-1396122.jpg',img_order: 1},
      { img_url: 'https://s3-us-west-1.amazonaws.com/zillowgallerydata/barn-314937.jpg', img_order: 2},
      { img_url: 'https://s3-us-west-1.amazonaws.com/zillowgallerydata/blue-sky-462358.jpg', img_order: 3},
      { img_url: 'https://s3-us-west-1.amazonaws.com/zillowgallerydata/country-463996.jpg', img_order: 4},
      { img_url: 'https://s3-us-west-1.amazonaws.com/zillowgallerydata/driveway-186077.jpg', img_order: 5},
    ];
    
    request.post({
      url: 'http://localhost:3002/gallery/update',
      form: {
        img: 'https://s3-us-west-1.amazonaws.com/zillowgallerydata/daylight-1396122.jpg',
        id: 1,
        newOrder: 1,
        oldOrder: 4
      }
    }, function (error, response, body) {
      var list = JSON.parse(body)
      expect(response.statusCode).to.equal(200);
      expect(list).to.deep.equal(expected);
      done();
    });
  });
  
  xit('should shift images to the left when current img indx < new img indx', (done) => {
    var expected = [
      { img_url: 'https://s3-us-west-1.amazonaws.com/zillowgallerydata/apartment-323780.jpg', img_order: 0},
      { img_url: 'https://s3-us-west-1.amazonaws.com/zillowgallerydata/blue-sky-462358.jpg', img_order: 1},
      { img_url: 'https://s3-us-west-1.amazonaws.com/zillowgallerydata/country-463996.jpg', img_order: 2},
      { img_url: 'https://s3-us-west-1.amazonaws.com/zillowgallerydata/daylight-1396122.jpg',img_order: 3},
      { img_url: 'https://s3-us-west-1.amazonaws.com/zillowgallerydata/barn-314937.jpg', img_order: 4},
      { img_url: 'https://s3-us-west-1.amazonaws.com/zillowgallerydata/driveway-186077.jpg', img_order: 5},
    ];
    
    request.post({
      url: 'http://localhost:3002/gallery/update',
      form: {
        img: 'https://s3-us-west-1.amazonaws.com/zillowgallerydata/barn-314937.jpg',
        id: 1,
        newOrder: 4,
        oldOrder: 1
      }
    }, function (error, response, body) {
      var list = JSON.parse(body)
      expect(response.statusCode).to.equal(200);
      expect(list).to.deep.equal(expected);
      done();
    });
  });

  it('should not shift images when current img indx === new img indx', (done) => {
    var expected = [
      { img_url: 'https://s3-us-west-1.amazonaws.com/zillowgallerydata/apartment-323780.jpg', img_order: 0},
      { img_url: 'https://s3-us-west-1.amazonaws.com/zillowgallerydata/barn-314937.jpg', img_order: 1},
      { img_url: 'https://s3-us-west-1.amazonaws.com/zillowgallerydata/blue-sky-462358.jpg', img_order: 2},
      { img_url: 'https://s3-us-west-1.amazonaws.com/zillowgallerydata/country-463996.jpg', img_order: 3},
      { img_url: 'https://s3-us-west-1.amazonaws.com/zillowgallerydata/daylight-1396122.jpg',img_order: 4},
      { img_url: 'https://s3-us-west-1.amazonaws.com/zillowgallerydata/driveway-186077.jpg', img_order: 5},
    ];
    
    request.post({
      url: 'http://localhost:3002/gallery/update',
      form: {
        img: 'https://s3-us-west-1.amazonaws.com/zillowgallerydata/daylight-1396122.jpg',
        id: 1,
        newOrder: 4,
        oldOrder: 4
      }
    }, function (error, response, body) {
      var list = JSON.parse(body)
      expect(response.statusCode).to.equal(200);
      expect(list).to.deep.equal(expected);
      done();
    });
  });

  it('should not shift images on out of range numbers', (done) => {
    request.post({
      url: 'http://localhost:3002/gallery/update',
      form: {
        img: 'https://s3-us-west-1.amazonaws.com/zillowgallerydata/daylight-1396122.jpg',
        id: 1,
        newOrder: 10,
        oldOrder: 4
      }
    }, function (error, response, body) {
      expect(response.statusCode).to.equal(400);
      done();
    });
  });

  it('should not shift images on nonexistent numbers', (done) => {
    request.post({
      url: 'http://localhost:3002/gallery/update',
      form: {
        img: 'https://s3-us-west-1.amazonaws.com/zillowgallerydata/daylight-1396122.jpg',
        id: 1,
        newOrder: 'dummy',
        oldOrder: 4
      }
    }, function (error, response, body) {
      expect(response.statusCode).to.equal(400);
      done();
    });
  });

  it('should get gallery from house_id', (done) =>{
    var expected = [
      { img_url: 'https://s3-us-west-1.amazonaws.com/zillowgallerydata/apartment-323780.jpg', img_order: 0},
      { img_url: 'https://s3-us-west-1.amazonaws.com/zillowgallerydata/barn-314937.jpg', img_order: 1},
      { img_url: 'https://s3-us-west-1.amazonaws.com/zillowgallerydata/blue-sky-462358.jpg', img_order: 2},
      { img_url: 'https://s3-us-west-1.amazonaws.com/zillowgallerydata/country-463996.jpg', img_order: 3},
      { img_url: 'https://s3-us-west-1.amazonaws.com/zillowgallerydata/daylight-1396122.jpg',img_order: 4},
      { img_url: 'https://s3-us-west-1.amazonaws.com/zillowgallerydata/driveway-186077.jpg', img_order: 5},
    ];
    request.get({
      url: 'http://localhost:3002/gallery/1'
    }, function (error, response, body) {
      var list = JSON.parse(body);
      expect(response.statusCode).to.equal(200);
      expect(list).to.deep.equal(expected);
      done();
    });

  });

});