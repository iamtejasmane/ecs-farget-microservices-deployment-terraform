// Import dependencies
const express = require("express")
const { Driver } = require("../db/db")
const router = express.Router()

// Routes for Drivers API

// Create a driver
router.post("/", async (req, res) => {
  try {
    const { driverName, driverEmail, driverPhoneNumber, driverLicenseNo } = req.body
    const driver = await Driver.create({
      driverName,
      driverEmail,
      driverPhoneNumber,
      driverLicenseNo,
    })
    res.json(driver)
  } catch (error) {
    console.error("Error creating driver:", error)
    res.status(500).json({ error: "Unable to create driver" })
  }
})

// Get all drivers
router.get("/", async (req, res) => {
  try {
    const drivers = await Driver.findAll()
    res.json(drivers)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Unable to fetch cabs" })
  }
})

// Get a driver by driverId
router.get("/:driverId", async (req, res) => {
  try {
    const driver = await Driver.findByPk(req.params.driverId)
    if(driver){
      res.json(driver)
    }
    res.status(404).json({ error: "Driver not found" })
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Unable to fetch a driver" })
  }
})

// Update a driver
router.put("/:driverId", async (req, res) => {
  try {
    const { driverId } = req.params
    const { driverName, driverEmail, driverPhoneNumber, driverLicenseNo } = req.body
    const driver = await Driver.findByPk(driverId)
    if (driver) {
      driver.driverName = driverName
      driver.driverEmail = driverEmail
      driver.driverPhoneNumber = driverPhoneNumber
      driver.driverLicenseNo = driverLicenseNo
      await driver.save()
      res.json(driver)
    } else {
      res.status(404).json({ error: "Driver not found" })
    }
  } catch (error) {
    console.error("Error updating driver:", error)
    res.status(500).json({ error: "Unable to update driver" })
  }
})

// Delete a driver
router.delete("/:driverId", async (req, res) => {
  try {
    const { driverId } = req.params
    const driver = await Driver.findByPk(driverId)
    if (driver) {
      await driver.destroy()
      res.sendStatus(200)
    } else {
      res.status(404).json({ error: "Driver not found" })
    }
  } catch (error) {
    console.error("Error deleting driver:", error)
    res.status(500).json({ error: "Unable to delete driver" })
  }
})

// Export router
module.exports = router
