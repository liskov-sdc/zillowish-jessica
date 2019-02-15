var faker = require('faker');
const expect = require('chai').expect;
var aws3 = require('../server/aws_s3');

var randomImage = faker.image.image();

console.log(randomImage);

describe('AWS S3 testing', () => {
    it(`should return the bucket's name `, () => {
        var result = aws3.createBucket();
        console.log('res: ', result);
        expect(result).to.be.a('string');
    });

    it(`should put object into bucket`, () => {
        var result = aws3.uploadObj();
        console.log('res: ', result);
        expect(result).to.be.a('string');
    });

    it(`should get object from bucket`, () => {
        var result = aws3.getObj();
        console.log('res: ', result);
        expect(result).to.be.an('object');;
    });
});