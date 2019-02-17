/* Make sure node server is running */
const { Client } = require('pg');
var expect = require('chai').expect;
var config = require('../config');

describe('Zillow Clone Database Seeding', () => {
  var dbConnect;
  
  beforeEach(function(done) {
    dbConnect = new Client({
      host: 'localhost',
      database: 'zillowgallery'
    });
    dbConnect.connect()
      .then(()=>{
        done();
      });
  });
   
  it('Should have 100 records in houses table', (done) => {
    dbConnect.query('SELECT * FROM houses')
      .then((result)=>{
        expect(result.rowCount).to.equal(100);
        done();
      });
       
  });

  it('Should have 600 records in photos table', (done) => {
    dbConnect.query('SELECT * FROM photos')
      .then((result)=>{
        expect(result.rowCount).to.equal(600);
        done();
      });
  });

  it('Should have the correct record types/columns in Houses table', (done) => {
    dbConnect.query('SELECT * FROM houses limit 1')
      .then((result)=>{
        expect(result.rows[0]).to.have.all.keys('house_id', 'name');
        expect(result.rows[0].house_id).to.be.a('number');
        expect(result.rows[0].name).to.be.a('string');
        done();
      });
        
  });

  it('Should have the correct record types/columns in photos table', (done) => {
    dbConnect.query('SELECT * FROM photos limit 1')
      .then((result)=>{
        expect(result.rows[0]).to.have.all.keys('photo_id', 'img_url', 'img_order', 'house_id');
        expect(result.rows[0].photo_id).to.be.a('number');
        expect(result.rows[0].img_url).to.be.a('string');
        expect(result.rows[0].img_order).to.be.a('number'); //maybe string is better??
        expect(result.rows[0].house_id).to.be.a('number');
        done();
      });
  });

  afterEach(function() {
    dbConnect.end();
  }); 

});