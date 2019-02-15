var AWS = require('aws-sdk');
var uuid = require('uuid');
var keys = require('../config');

var bucketName;
var s3 = new AWS.S3();

var createBucket = () => {
  bucketName = 'zillowish-' + uuid.v4();
  s3.createBucket({Bucket: bucketName});
};

var uploadObj = (name, value) => {
  // Create params for putObject call
  var objectParams = {Bucket: bucketName, Key: name, Body: value};
  // Create object upload promise
  var uploadPromise = s3.putObject(objectParams).promise();
  uploadPromise.then((data)=>{
    console.log('Successfully uploaded data to ' + bucketName + '/' + name);
  })
    .catch((err)=>{
      console.error(err, err.stack);
    });
};

module.exports = { createBucket, uploadObj};
