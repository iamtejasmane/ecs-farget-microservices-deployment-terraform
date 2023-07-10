const chai = require("chai")
const chaiHttp = require("chai-http")
const app = require("../app")

chai.use(chaiHttp)
chai.should()

const { Cab } = require("../db/db")

describe("Cabs API", () => {
  // Clear the database before each test
  beforeEach(async () => {
    await Cab.destroy({ where: {} })
  })

  describe("POST /cabs", () => {
    it("should create a new cab", (done) => {
      const newCab = {
        cabRegistrationNumber: "ABC123",
        cabModel: "Toyota",
        cabColour: "Black",
      }

      chai
        .request(app)
        .post("/cabs")
        .send(newCab)
        .end((err, res) => {
          res.should.have.status(201)
          res.body.should.be.a("object")
          res.body.should.have.property("cabRegistrationNumber")
          res.body.should.have.property("cabModel")
          res.body.should.have.property("cabColour")

          done()
        })
    })
  })

  describe("GET /cabs", () => {
    it("should get all cabs", (done) => {
      chai
        .request(app)
        .get("/cabs")
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a("array")
          res.body.length.should.be.eql(0)

          done()
        })
    })
  })

  describe("GET /cabs/:cabId", () => {
    it("should get a cab by cabId", (done) => {
      const newCab = {
        cabRegistrationNumber: "ABC123",
        cabModel: "Toyota",
        cabColour: "Black",
      }

      Cab.create(newCab).then((cab) => {
        chai
          .request(app)
          .get(`/cabs/${cab.cabId}`)
          .end((err, res) => {
            res.should.have.status(200)
            res.body.should.be.a("object")
            res.body.should.have.property("cabRegistrationNumber")
            res.body.should.have.property("cabModel")
            res.body.should.have.property("cabColour")

            done()
          })
      })
    })

    it("should return 404 if cab not found", (done) => {
      const cabId = 999

      chai
        .request(app)
        .get(`/cabs/${cabId}`)
        .end((err, res) => {
          res.should.have.status(404)
          res.body.should.be.a("object")
          res.body.should.have.property("error").eql("Cab not found")

          done()
        })
    })
  })

  describe("PUT /cabs/:cabId", () => {
    it("should update a cab by cabId", (done) => {
      const newCab = {
        cabRegistrationNumber: "ABC123",
        cabModel: "Toyota",
        cabColour: "Black",
      }

      Cab.create(newCab).then((cab) => {
        const updatedCab = {
          cabRegistrationNumber: "XYZ789",
          cabModel: "Honda",
          cabColour: "White",
        }

        chai
          .request(app)
          .put(`/cabs/${cab.cabId}`)
          .send(updatedCab)
          .end((err, res) => {
            res.should.have.status(200)
            res.body.should.be.a("object")
            res.body.should.have
              .property("cabRegistrationNumber")
              .eql(updatedCab.cabRegistrationNumber)
            res.body.should.have.property("cabModel").eql(updatedCab.cabModel)
            res.body.should.have.property("cabColour").eql(updatedCab.cabColour)

            done()
          })
      })
    })

    it("should return 404 if cab not found", (done) => {
      const cabId = 999
      const updatedCab = {
        cabRegistrationNumber: "XYZ789",
        cabModel: "Honda",
        cabColour: "White",
      }

      chai
        .request(app)
        .put(`/cabs/${cabId}`)
        .send(updatedCab)
        .end((err, res) => {
          res.should.have.status(404)
          res.body.should.be.a("object")
          res.body.should.have.property("error").eql("Cab not found")

          done()
        })
    })
  })

  describe("DELETE /cabs/:cabId", () => {
    it("should delete a cab by cabId", (done) => {
      const newCab = {
        cabRegistrationNumber: "ABC123",
        cabModel: "Toyota",
        cabColour: "Black",
      }
      Cab.create(newCab).then((cab) => {
        chai
          .request(app)
          .delete(`/cabs/${cab.cabId}`)
          .end((err, res) => {
            res.should.have.status(200)
            done()
          })
      })
    })

    it("should return 404 if cab not found", (done) => {
      const cabId = 999

      chai
        .request(app)
        .delete(`/cabs/${cabId}`)
        .end((err, res) => {
          res.should.have.status(404)
          res.body.should.be.a("object")
          res.body.should.have.property("error").eql("Cab not found")

          done()
        })
    })
  })
})
