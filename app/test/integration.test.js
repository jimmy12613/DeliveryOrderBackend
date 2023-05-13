const request = require("supertest");
const { assert, expect } = require("chai");
const app = require("../main");

describe("Integration tests", () => {
describe("POST /orders", function () {
  it("responds with order json", function (done) {
    request(app)
      .post("/orders")
      .send({
        origin: ["40.712776", "-74.005974"],
        destination: ["34.052235", "-118.243683"],
      })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);
        expect(res.body).to.have.property("id");
        expect(res.body).to.have.property("distance");
        expect(res.body).to.have.property("status");
        expect(res.body.status).to.equal("UNASSIGNED");
        done();
      });
  });

  it("responds with json: {error: ERROR_DESCRIPTION} when fail", function (done) {
    request(app)
      .post("/orders")
      .send({
        origin: ["100.712776", "-74.005974"],
        destination: ["34.052235", "-118.243683"],
      })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(500)
      .end(function (err, res) {
        if (err) return done(err);
        expect(res.body).to.have.property("error");
        expect(res.body.error).to.equal("ERROR_DESCRIPTION");
        done();
      });
  });
});

describe("PATCH /orders/:id", function () {
  it("responds with json: {status: SUCCESS}", function (done) {
    request(app)
      .patch("/orders/1") // you will need to ensure this order ID exists in your test database
      .send({ status: "TAKEN" })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);
        expect(res.body).to.have.property("status");
        expect(res.body.status).to.equal("SUCCESS");
        done();
      });
  });

  it("responds with json: {error: ERROR_DESCRIPTION} when fail", function (done) {
    request(app)
      .patch("/orders/1")
      .send({ status: "TAKEN!!!" })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(500)
      .end(function (err, res) {
        if (err) return done(err);
        expect(res.body).to.have.property("error");
        expect(res.body.error).to.equal("ERROR_DESCRIPTION");
        done();
      });
  });
});

describe("GET /orders", function () {
  it("responds with an array of orders", function (done) {
    request(app)
      .get("/orders?page=1&limit=5")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);
        expect(res.body).to.be.an("array");
        res.body.forEach((order) => {
          expect(order).to.have.property("id");
          expect(order).to.have.property("distance");
          expect(order).to.have.property("status");
        });
        done();
      });
  });

  it("responds with json: {error: ERROR_DESCRIPTION} when fail", function (done) {
    request(app)
      .get("/orders?page=invalid&limit=invalid")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(500)
      .end(function (err, res) {
        if (err) return done(err);
        expect(res.body).to.have.property("error");
        expect(res.body.error).to.equal("ERROR_DESCRIPTION");
        done();
      });
  });
});
});