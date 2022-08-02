import { assert } from "chai";
import { request } from "supertest";
import { app } from "../src/server";

// TODO: may not be working, fix later
describe('Image API Routes', function () {

  const passReqBody = {
    name: "Derek",
    userEmail: "derek123",
    imagePath: "/datetime/imagePathInAWSS3Bucket",
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
  describe('POST /image', function () {
    it('creates a successful entry in the image table', function (done: Mocha.Done) {
      request(app)
        .post('/image')
        .send(passReqBody)
        .expect(200)
        .then(response => {
          imageId = response.body.image.id;
          assert.isObject(response);
          done();
        })
    });
  });

  const failReqBody = { ...passReqBody, randomField: "abc" }

  describe('POST /image', function () {
    it('invalid request body', function (done: Mocha.Done) {
      request(app)
        .post('/image')
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
