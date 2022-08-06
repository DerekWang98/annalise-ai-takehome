import { assert } from "chai";
import request from "supertest";
import { app, server} from "../src/server";

describe('Tag API Routes', function () {

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

  const passReqBody = {
    name: "a name",
    value: "a value",
    imageId: 1,
  }

  let tagId = 0;
  describe('POST /tag/details', function () {
    it('creates a successful entry in the tag table', function (done: Mocha.Done) {
      request(app)
        .post(`/tag/details`)
        .send(passReqBody)
        .expect(200)
        .then(response => {
          tagId = response.body.tag.id;
          assert.isObject(response.body);
          done();
        })
        .catch(err => done(err))
    });
  });

  const failReqBody = { ...passReqBody, randomField: "abc" }
  describe('POST /tag/details', function () {
    it('invalid request body', function (done: Mocha.Done) {
      request(app)
        .post(`/tag/details`)
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

  describe('GET /tag', function () {
    it('Get an tag info and all of its tags', function (done: Mocha.Done) {
      request(app)
        .get('/tag')
        .expect(200)
        .then(response => {
          assert.isArray(response.body, "Body should contain an array of tag details");
          assert.isObject(response.body[0], "Response should be an object");
          assert.strictEqual(response.body[0].name, passReqBody.name, 'assert tag name');
          assert.strictEqual(response.body[0].value, passReqBody.value, 'assert tag value');
          done();
        })
        .catch(err => done(err))
    })
  });

  describe('GET /tag/:id', function () {
    it('Get an tag info and all of its tags', function (done: Mocha.Done) {
      request(app)
        .get(`/tag/${tagId}`)
        .expect(200)
        .then(response => {
          assert.isObject(response.body, "Response should be an object");
          assert.strictEqual(response.body.name, passReqBody.name, 'assert tag name');
          assert.strictEqual(response.body.value, passReqBody.value, 'assert tag value');
          done();
        })
        .catch(err => done(err))
    })
  })

  describe('GET /tag/:id', function () {
    it('When tag ID does not exist', function (done: Mocha.Done) {
      request(app)
        .get(`/tag/${1000}`)
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
