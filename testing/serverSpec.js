/* Make sure node server is running */
const { Client } = require('pg');
var request = require('request'); 
var expect = require('chai').expect;
var config = require('../config');
const knex = require('../knex/knex.js');

describe('Zillow Clone Server', () => {
  var dbConnect;
  
  //currently we drop db and create new tb with psql
  //then we run knex to seed database
  
  beforeEach((done) => {
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
  
  afterEach(()=> {
    dbConnect.query('DELETE FROM photos')
        .then(()=>{
          dbConnect.end();
    });
    //drop db
  });


});