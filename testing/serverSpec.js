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
        knex.seed.run().then(()=>{ 
          done();
        });
      });
  });
  
  it('should shift images to the right when current img indx > new img indx', (done) => {
    var expected = [
      {"img_url":"https://s3-us-west-1.amazonaws.com/zillowgallerydata/apartment-323780.jpg","img_order":0},
      {"img_url":"https://s3-us-west-1.amazonaws.com/zillowgallerydata/bath2.jpg","img_order":1},
      {"img_url":"https://s3-us-west-1.amazonaws.com/zillowgallerydata/bed1.jpg","img_order":2},
      {"img_url":"https://s3-us-west-1.amazonaws.com/zillowgallerydata/bed2.jpg","img_order":3},
      {"img_url":"https://s3-us-west-1.amazonaws.com/zillowgallerydata/bed3.jpeg","img_order":4},
      {"img_url":"https://s3-us-west-1.amazonaws.com/zillowgallerydata/bath1.jpeg","img_order":5},
      {"img_url":"https://s3-us-west-1.amazonaws.com/zillowgallerydata/diningRoom.jpg","img_order":6},
      {"img_url":"https://s3-us-west-1.amazonaws.com/zillowgallerydata/kitchen.jpg","img_order":7},
      {"img_url":"https://s3-us-west-1.amazonaws.com/zillowgallerydata/livingRoom.jpg","img_order":8},
      {"img_url":"https://s3-us-west-1.amazonaws.com/zillowgallerydata/backyard.jpg","img_order":9}];
    
    request.post({
      url: 'http://localhost:3002/gallery/update',
      form: {
        img: 'https://s3-us-west-1.amazonaws.com/zillowgallerydata/bath2.jpg',
        id: 1,
        newOrder: 1,
        oldOrder: 4
      }
    }, function (error, response, body) {
      var list = JSON.parse(body);
      expect(response.statusCode).to.equal(200);
      expect(list).to.deep.equal(expected);
      done();
    });
  });
  
  it('should shift images to the left when current img indx < new img indx', (done) => {

    var expected = [
      {"img_url":"https://s3-us-west-1.amazonaws.com/zillowgallerydata/apartment-323780.jpg","img_order":0},
      {"img_url":"https://s3-us-west-1.amazonaws.com/zillowgallerydata/bath2.jpg","img_order":1},
      {"img_url":"https://s3-us-west-1.amazonaws.com/zillowgallerydata/bed2.jpg","img_order":2},
      {"img_url":"https://s3-us-west-1.amazonaws.com/zillowgallerydata/bed3.jpeg","img_order":3},
      {"img_url":"https://s3-us-west-1.amazonaws.com/zillowgallerydata/bath1.jpeg","img_order":4},
      {"img_url":"https://s3-us-west-1.amazonaws.com/zillowgallerydata/bed1.jpg","img_order":5},
      {"img_url":"https://s3-us-west-1.amazonaws.com/zillowgallerydata/diningRoom.jpg","img_order":6},
      {"img_url":"https://s3-us-west-1.amazonaws.com/zillowgallerydata/kitchen.jpg","img_order":7},
      {"img_url":"https://s3-us-west-1.amazonaws.com/zillowgallerydata/livingRoom.jpg","img_order":8},
      {"img_url":"https://s3-us-west-1.amazonaws.com/zillowgallerydata/backyard.jpg","img_order":9}];

    request.post({
      url: 'http://localhost:3002/gallery/update',
      form: {
        img: 'https://s3-us-west-1.amazonaws.com/zillowgallerydata/bed1.jpg',
        id: 1,
        newOrder: 5,
        oldOrder: 2
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
      {"img_url":"https://s3-us-west-1.amazonaws.com/zillowgallerydata/apartment-323780.jpg","img_order":0},
      {"img_url":"https://s3-us-west-1.amazonaws.com/zillowgallerydata/bath2.jpg","img_order":1},
      {"img_url":"https://s3-us-west-1.amazonaws.com/zillowgallerydata/bed2.jpg","img_order":2},
      {"img_url":"https://s3-us-west-1.amazonaws.com/zillowgallerydata/bed3.jpeg","img_order":3},
      {"img_url":"https://s3-us-west-1.amazonaws.com/zillowgallerydata/bath1.jpeg","img_order":4},
      {"img_url":"https://s3-us-west-1.amazonaws.com/zillowgallerydata/bed1.jpg","img_order":5},
      {"img_url":"https://s3-us-west-1.amazonaws.com/zillowgallerydata/diningRoom.jpg","img_order":6},
      {"img_url":"https://s3-us-west-1.amazonaws.com/zillowgallerydata/kitchen.jpg","img_order":7},
      {"img_url":"https://s3-us-west-1.amazonaws.com/zillowgallerydata/livingRoom.jpg","img_order":8},
      {"img_url":"https://s3-us-west-1.amazonaws.com/zillowgallerydata/backyard.jpg","img_order":9}];
    
    request.post({
      url: 'http://localhost:3002/gallery/update',
      form: {
        img: 'https://s3-us-west-1.amazonaws.com/zillowgallerydata/bath1.jpeg',
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
        img: 'https://s3-us-west-1.amazonaws.com/zillowgallerydata/bath1.jpeg',
        id: 1,
        newOrder: 11,
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
        img: 'https://s3-us-west-1.amazonaws.com/zillowgallerydata/bath1.jpeg',
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
      {"img_url":"https://s3-us-west-1.amazonaws.com/zillowgallerydata/apartment-323780.jpg","img_order":0},
      {"img_url":"https://s3-us-west-1.amazonaws.com/zillowgallerydata/bath2.jpg","img_order":1},
      {"img_url":"https://s3-us-west-1.amazonaws.com/zillowgallerydata/bed2.jpg","img_order":2},
      {"img_url":"https://s3-us-west-1.amazonaws.com/zillowgallerydata/bed3.jpeg","img_order":3},
      {"img_url":"https://s3-us-west-1.amazonaws.com/zillowgallerydata/bath1.jpeg","img_order":4},
      {"img_url":"https://s3-us-west-1.amazonaws.com/zillowgallerydata/bed1.jpg","img_order":5},
      {"img_url":"https://s3-us-west-1.amazonaws.com/zillowgallerydata/diningRoom.jpg","img_order":6},
      {"img_url":"https://s3-us-west-1.amazonaws.com/zillowgallerydata/kitchen.jpg","img_order":7},
      {"img_url":"https://s3-us-west-1.amazonaws.com/zillowgallerydata/livingRoom.jpg","img_order":8},
      {"img_url":"https://s3-us-west-1.amazonaws.com/zillowgallerydata/backyard.jpg","img_order":9}];

    request.get({
      url: 'http://localhost:3002/gallery/1'
    }, function (error, response, body) {
      var list = JSON.parse(body);
      expect(response.statusCode).to.equal(200);
      expect(list).to.deep.equal(expected);
      done();
    });
  });

  it('should not get gallery from non existent house_id', (done) =>{
    request.get({
      url: 'http://localhost:3002/gallery/-1'
    }, function (error, response, body) {
      expect(response.statusCode).to.equal(400);
      done();
    });
  });

  after(()=> {
    dbConnect.end();
  })

});