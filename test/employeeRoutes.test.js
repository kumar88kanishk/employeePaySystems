process.env.NODE_ENV = "test";
//Require the dev-dependencies
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../app");
let should = chai.should();

chai.use(chaiHttp);
//Our parent block
describe("/POST generateSlip happy path", () => {
  it("it should generate Slip", done => {
    let paySlip = {
      firstName: "Kanihk",
      lastName: "Kumar",
      annualPackage: "60050",
      superRate: "9",
      startDate: "2018-09-01",
      endDate: "2018-09-30"
    };
    chai
      .request(server)
      .post("/generateSlip")
      .send(paySlip)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.have.property("type", "text/html");
        res.should.have.property("headers");
        res.headers.should.have.property("content-type");
        done();
      });
  });
});
describe("/POST generateSlip sad path", () => {
  it("it should generate Slip", done => {
    let paySlip = {
      firstName: "Kanihk",
      lastName: "Kumar"
    };
    chai
      .request(server)
      .post("/generateSlip")
      .send(paySlip)
      .end((err, res) => {
        console.log("==> err", err);
        done();
      });
  });
});
