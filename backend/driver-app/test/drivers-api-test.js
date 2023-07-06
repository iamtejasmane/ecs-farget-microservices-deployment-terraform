const chai = require("chai")
const chaiHttp = require("chai-http")
const app = require("../app") // Assuming your Express app is defined in app.js
const { Driver } = require("../db/db")

chai.use(chaiHttp)
const expect = chai.expect

// Clear the database and create a test driver before running the tests
before(async () => {
  // await Driver.destroy({ where: {} }) // Clear the database table
  await Driver.create({
    driverName: "John Doe",
    driverEmail: "john.doe@example.com",
    driverPhoneNumber: "1234567890",
    driverProfilePictureKey: null,
  })
})

describe("Drivers API", () => {
  // Test the POST /drivers endpoint
  describe("POST /drivers", () => {
    it("should create a new driver", (done) => {
      chai
        .request(app)
        .post("/drivers")
        .attach("driverProfilePicture", "uploads/driver-1.jpg")
        .field("driverName", "Jane Smith")
        .field("driverEmail", "jane.smith@example.com")
        .field("driverPhoneNumber", "9876543210")
        .end((err, res) => {
          expect(res).to.have.status(201)
          expect(res.body).to.have.property("driverName", "Jane Smith")
          expect(res.body).to.have.property(
            "driverEmail",
            "jane.smith@example.com"
          )
          expect(res.body).to.have.property("driverPhoneNumber", "9876543210")
          done()
        })
    })
  })

  // Test the GET /drivers endpoint
  describe("GET /drivers", () => {
    it("should get all drivers", (done) => {
      chai
        .request(app)
        .get("/drivers")
        .end((err, res) => {
          expect(res).to.have.status(200)
          expect(res.body).to.be.an("array")
          expect(res.body).to.have.lengthOf(2) // Including the test driver created in the before() hook
          done()
        })
    })
  })

  // Test the GET /drivers/:driverId endpoint
  describe("GET /drivers/:driverId", () => {
    it("should get a driver by driverId", (done) => {
      const driverId = 1 // Assuming the test driver has an ID of 1
      chai
        .request(app)
        .get(`/drivers/${driverId}`)
        .end((err, res) => {
          expect(res).to.have.status(200)
          expect(res.body).to.have.property("driverName", "John Doe")
          expect(res.body).to.have.property(
            "driverEmail",
            "john.doe@example.com"
          )
          expect(res.body).to.have.property("driverPhoneNumber", "1234567890")
          done()
        })
    })

    it("should return 404 if driver not found", (done) => {
      const driverId = 999 // Assuming there's no driver with ID 999
      chai
        .request(app)
        .get(`/drivers/${driverId}`)
        .end((err, res) => {
          expect(res).to.have.status(404)
          expect(res.body).to.have.property("error", "Driver not found")
          done()
        })
    })
  })

  // Test the PUT /drivers/:driverId endpoint
  describe("PUT /drivers/:driverId", () => {
    it("should update a driver", (done) => {
      const driverId = 1 // Assuming the test driver has an ID of 1
      chai
        .request(app)
        .put(`/drivers/${driverId}`)
        .attach("driverProfilePicture", "uploads/driver-1.jpg")
        .field("driverName", "John Doe Updated")
        .field("driverEmail", "john.doe.updated@example.com")
        .field("driverPhoneNumber", "5555555555")
        .end((err, res) => {
          expect(res).to.have.status(200)
          expect(res.body).to.have.property("driverName", "John Doe Updated")
          expect(res.body).to.have.property(
            "driverEmail",
            "john.doe.updated@example.com"
          )
          expect(res.body).to.have.property("driverPhoneNumber", "5555555555")
          done()
        })
    })

    it("should return 404 if driver not found", (done) => {
      const driverId = 999 // Assuming there's no driver with ID 999
      chai
        .request(app)
        .put(`/drivers/${driverId}`)
        .end((err, res) => {
          expect(res).to.have.status(404)
          expect(res.body).to.have.property("error", "Driver not found")
          done()
        })
    })
  })

  // Test the DELETE /drivers/:driverId endpoint
  describe("DELETE /drivers/:driverId", () => {
    it("should delete a driver", (done) => {
      const driverId = 1 // Assuming the test driver has an ID of 1
      chai
        .request(app)
        .delete(`/drivers/${driverId}`)
        .end((err, res) => {
          expect(res).to.have.status(200)
          done()
        })
    })

    it("should return 404 if driver not found", (done) => {
      const driverId = 999 // Assuming there's no driver with ID 999
      chai
        .request(app)
        .delete(`/drivers/${driverId}`)
        .end((err, res) => {
          expect(res).to.have.status(404)
          expect(res.body).to.have.property("error", "Driver not found")
          done()
        })
    })
  })
})
