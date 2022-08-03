import { assert } from "chai";
import { request } from "supertest";
import { app } from "../src/server";

// STUBS for tests, does not work, fix later
describe('Image API Routes', function () {

  describe('GET /image/:id', function () {
    it('Gets a presigned URL from the AWS S3 Bucket', function (done: Mocha.Done) {
      request(app)
        .post(`/image/${__dirname.concat('testImage.gif')}`)
        .expect(200)
        .then(response => {
          assert.isObject(response.body);
          done();
        })
    })
  });

  describe('GET /image/details', function () {
    it('Get an image info and all of its tags', function (done: Mocha.Done) {
      request(app)
        .post('/image/details')
        .expect(200)
        .then(response => {
          assert.isObject(response.body);
          done();
        })
    })
  });

  describe('GET /image/details/:id', function () {
    it('Get an image info and all of its tags', function (done: Mocha.Done) {
      request(app)
        .post(`/image/details/${imageId}`)
        .expect(200)
        .then(response => {
          assert.isObject(response.body);
          assert.strictEqual(response.body.name, passReqBody.name, 'name field is strictly equal');
          assert.strictEqual(response.body.userEmail, passReqBody.userEmail, 'userEmail field is strictly equal');
          assert.isArray(response.body.tags, 'tags should be an array');
          done();
        })
    })
  })

  describe('GET /image/details/:id', function () {
    it('When image ID does not exist', function (done: Mocha.Done) {
      request(app)
        .post(`/image/details/${1000}`)
        .expect(400)
        .end(function (err, res) {
          if (err) {
            console.log(res);
          }
          done();
        })
    })
  });

  describe('POST /image', function () {
    it('Send an image into an AWS S3 Bucket', function (done: Mocha.Done) {
      request(app)
        .post('/image')
        .send({ filePath: __dirname.concat('testImage.gif')})
        .expect(200)
        .then(response => {
          assert.isObject(response.body);
          done();
        })
    })
  });

  const passReqBody = {
    name: "Derek",
    userEmail: "derek123",
    tags: [
      {
        name: "A tag",
        value: "A value"
      },
      {
        name: "2nd tag",
        value: "2nd value"
      }
    ]
  }

  let imageId = 0;
  describe('POST /image/details', function () {
    it('creates a successful entry in the image table', function (done: Mocha.Done) {
      request(app)
        .post(`/image`)
        .send(passReqBody)
        .expect(200)
        .then(response => {
          imageId = response.body.image.id;
          assert.isObject(response.body);
          done();
        })
    });
  });

  const failReqBody = { ...passReqBody, randomField: "abc" }
  describe('POST /image/details', function () {
    it('invalid request body', function (done: Mocha.Done) {
      request(app)
        .post(`/image`)
        .send(failReqBody)
        .expect(400)
        .end(function (err, res) {
          if (err) {
            console.log(res);
          }
          done();
        })
    })
  });

});
