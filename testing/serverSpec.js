/* Make sure node server is running */
var db = require('pg');
var request = require('request'); 
var expect = require('chai').expect;
var config = require('../config');

describe('Zillow Clone Server', () => {
  var dbConnect;
  
  beforeEach((done) => {
    dbConnect = new db(config);
    dbConnect.connect();   
  });
  
  afterEach(()=> {
    dbConnect.end();
  });
  
  //test helper functions
  //what happens if you give a non exisitent number or an invalid input?
  //what happens if you try getting a non existent house?
  //what happens if you place/give an order number thats too large/dup/small/nonexistent val
  it('', (done) => {
  
  });
  
});