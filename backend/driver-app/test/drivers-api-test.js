const chai = require("chai")
const chaiHttp = require("chai-http")
const jwt = require("jsonwebtoken")
const app = require("../app")
const expect = chai.expect

chai.use(chaiHttp)

describe("Drivers API", () => {
  // Test the create driver route
  describe("POST /drivers", () => {
    it("should create a new driver", (done) => {
      const driver = {
        driverName: "John Doe",
        driverEmail: "johndoe@example.com",
        driverPhoneNumber: "1234567890",
      }

      // const token = jwt.sign({ id: 1 }, process.env.JWT_SECRET)

      chai
        .request(app)
        .post("/drivers")
        // .set("token", token)
        .send(driver)
        .end((err, res) => {
          expect(res).to.have.status(200)
          expect(res.body).to.have.property("driverName", "John Doe")
          expect(res.body).to.have.property(
            "driverEmail",
            "johndoe@example.com"
          )
          expect(res.body).to.have.property("driverPhoneNumber", "1234567890")
          done()
        })
    })
  })

  // Test the get driver route
  describe("GET /drivers/:driverId", () => {
    it("should get a driver by driverId", (done) => {
      chai
        .request(app)
        .get("/drivers/1")
        .end((err, res) => {
          expect(res).to.have.status(200)
          expect(res.body).to.have.property("driverName", "John Doe")
          expect(res.body).to.have.property(
            "driverEmail",
            "johndoe@example.com"
          )
          expect(res.body).to.have.property("driverPhoneNumber", "1234567890")
          done()
        })
    })
  })

  // Test the update driver route
  describe("PUT /drivers/:driverId", () => {
    it("should update a driver", (done) => {
      const updatedDriver = {
        driverName: "Updated Name",
        driverEmail: "updated@example.com",
        driverPhoneNumber: "9876543210",
      }

      chai
        .request(app)
        .put("/drivers/1")
        .send(updatedDriver)
        .end((err, res) => {
          expect(res).to.have.status(200)
          expect(res.body).to.have.property("driverName", "Updated Name")
          expect(res.body).to.have.property(
            "driverEmail",
            "updated@example.com"
          )
          expect(res.body).to.have.property("driverPhoneNumber", "9876543210")
          done()
        })
    })
  })

  // Test the delete driver route
  describe("DELETE /drivers/:driverId", () => {
    it("should delete a driver", (done) => {
      chai
        .request(app)
        .delete("/drivers/1")
        .end((err, res) => {
          expect(res).to.have.status(200)

          // Verify that the driver is deleted
          chai
            .request(app)
            .get("/drivers/1")
            .end((err, res) => {
              expect(res).to.have.status(404)
              done()
            })
        })
    })
  })
})
