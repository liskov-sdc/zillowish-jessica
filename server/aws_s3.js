var AWS = require('aws-sdk');
var uuid = require('uuid');
var keys = require('../config');

var bucketName;
var s3 = new AWS.S3();

var createBucket = () => {
  bucketName = 'zillowish-' + uuid.v4();
  s3.createBucket({Bucket: bucketName});
  return bucketName;
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

var getObj = (keyName) => {
  var params = {
    Bucket: "examplebucket", 
    Key: "HappyFace.jpg"
   };
   s3.getObject(params, function(err, data) {
     if (err) console.log(err, err.stack); // an error occurred
     else {
       console.log(data);           // successful response
        return data;
     }
     /*
     data = {
      AcceptRanges: "bytes", 
      ContentLength: 3191, 
      ContentType: "image/jpeg", 
      ETag: "\"6805f2cfc46c0f04559748bb039d69ae\"", 
      LastModified: <Date Representation>, 
      Metadata: {
      }, 
      TagCount: 2, 
      VersionId: "null"
     }
     */
   });
};

module.exports = { createBucket, uploadObj, getObj};
