import { assert } from "chai";
import request from "supertest";
import { app, server } from "../server";

describe('Image API Routes', function () {

  // wait for the server to start
  before(done => {
    setTimeout(() => {
      done();
    }, 1000);
  });

  after(done => {
    server.close(() => {
      done();
    });
  });

  // STUB
  describe('POST /image', function () {
    it('Send an image into an AWS S3 Bucket', function (done: Mocha.Done) {
      done();
      // request(app)
      //   .post('/image')
      //   .send({ filePath: __dirname.concat('testImage.gif')})
      //   .expect(200)
      //   .then(response => {
      //     assert.isObject(response.body);
      //     done();
      //   })
    })
  });

  const passReqBody = {
    name: "Derek",
    userEmail: "derek@gmail.com",
    imagePath: "AWSBUCKET/dateTime/filename",
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
        .post(`/image/details`)
        .send(passReqBody)
        .expect(200)
        .then(response => {
          imageId = response.body.image.id;
          assert.isObject(response.body);
          done();
        })
        .catch(err => done(err))
    });
  });

  const failReqBody = { ...passReqBody, randomField: "abc" }
  describe('POST /image/details', function () {
    it('invalid request body', function (done: Mocha.Done) {
      request(app)
        .post(`/image/details`)
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

  // STUB
  describe('GET /image/:id', function () {
    it('Gets a presigned URL from the AWS S3 Bucket', function (done: Mocha.Done) {
      done();
      // request(app)
      //   .post(`/image/${__dirname.concat('testImage.gif')}`)
      //   .expect(200)
      //   .then(response => {
      //     assert.isObject(response.body);
      //     done();
      //   })
    })
  });

  describe('GET /image/details', function () {
    it('Get an image info and all of its tags', function (done: Mocha.Done) {
      request(app)
        .get('/image/details')
        .expect(200)
        .then(response => {
          assert.isArray(response.body, "Body should contain an array of image details");
          assert.isObject(response.body[0], "Response should be an object");
          assert.strictEqual(response.body[0].name, passReqBody.name, 'assert image name');
          assert.strictEqual(response.body[0].userEmail, passReqBody.userEmail, 'assert image userEmail');
          assert.isArray(response.body[0].tags, 'tags should be an array');
          assert.strictEqual(response.body[0].tags[0].name, passReqBody.tags[0].name, 'assert tag name');
          assert.strictEqual(response.body[0].tags[0].value, passReqBody.tags[0].value, 'assert tag value');
          done();
        })
        .catch(err => done(err))
    })
  });

  describe('GET /image/details/:id', function () {
    it('Get an image info and all of its tags', function (done: Mocha.Done) {
      request(app)
        .get(`/image/details/${imageId}`)
        .expect(200)
        .then(response => {
          assert.isObject(response.body, "Response should be an object");
          assert.strictEqual(response.body.name, passReqBody.name, 'assert image name');
          assert.strictEqual(response.body.userEmail, passReqBody.userEmail, 'assert image userEmail');
          assert.isArray(response.body.tags, 'tags should be an array');
          assert.strictEqual(response.body.tags[0].name, passReqBody.tags[0].name, 'assert tag name');
          assert.strictEqual(response.body.tags[0].value, passReqBody.tags[0].value, 'assert tag value');
          done();
        })
        .catch(err => done(err))
    })
  })

  describe('GET /image/details/:id', function () {
    it('When image ID does not exist', function (done: Mocha.Done) {
      request(app)
        .get(`/image/details/${1000}`)
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
