// Import dependencies
const express = require("express")
const { Driver } = require("../db/db")
const router = express.Router()
const AWS = require("aws-sdk")
const multer = require("multer")
const { v4: uuidv4 } = require("uuid")
const fs = require("fs")

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
})

const s3 = new AWS.S3()

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/")
  },
  filename: function (req, file, cb) {
    cb(null, uuidv4() + "-" + file.originalname)
  },
})
const upload = multer({ storage: storage })

// Routes for Drivers API
// Create a driver
router.post("/", upload.single("driverProfilePicture"), async (req, res) => {
  try {
    const { driverName, driverEmail, driverPhoneNumber } = req.body

    // Process the profile picture file
    const profilePictureFile = req.file
    let profilePictureKey = null
    if (profilePictureFile) {
      // Upload the file to S3
      const uploadParams = {
        Bucket: process.env.S3_BUCKET_NAME_DRIVER,
        Key: profilePictureFile.filename,
        Body: fs.readFileSync(profilePictureFile.path),
      }

      const uploadResult = await s3.upload(uploadParams).promise()

      // Store the S3 object key in the database
      profilePictureKey = uploadResult.Key

      // Remove the temporary file from the server
      fs.unlinkSync(profilePictureFile.path)
    }

    const driver = await Driver.create({
      driverName,
      driverEmail,
      driverPhoneNumber,
      driverProfilePictureKey: profilePictureKey,
    })

    res.status(201).json(driver)
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
    res.status(500).json({ error: "Unable to fetch drivers" })
  }
})

// Get a driver by driverId
router.get("/:driverId", async (req, res) => {
  try {
    const driverId = req.params.driverId
    const driver = await Driver.findByPk(driverId)
    if (driver) {
      res.json(driver)
    } else {
      res.status(404).json({ error: "Driver not found" })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Unable to fetch driver" })
  }
})

// Update a driver
router.put(
  "/:driverId",
  upload.single("driverProfilePicture"),
  async (req, res) => {
    try {
      const driverId = req.params.driverId
      const { driverName, driverEmail, driverPhoneNumber } = req.body

      const driver = await Driver.findByPk(driverId)
      if (driver) {
        // Check if a new profile picture is provided
        if (req.file) {
          // Delete the previous profile picture from S3 if it exists
          if (driver.driverProfilePictureKey) {
            const deleteParams = {
              Bucket: process.env.S3_BUCKET_NAME_DRIVER,
              Key: driver.driverProfilePictureKey,
            }
            await s3.deleteObject(deleteParams).promise()
          }

          // Upload the new profile picture to S3
          const uploadParams = {
            Bucket: process.env.S3_BUCKET_NAME_DRIVER,
            Key: req.file.filename,
            Body: fs.readFileSync(req.file.path),
          }
          const uploadResult = await s3.upload(uploadParams).promise()

          // Update the profile picture key in the database
          driver.driverProfilePictureKey = uploadResult.Key

          // Remove the temporary file from the server
          fs.unlinkSync(req.file.path)
        }

        // Update the driver details
        driver.driverName = driverName
        driver.driverEmail = driverEmail
        driver.driverPhoneNumber = driverPhoneNumber
        await driver.save()
        res.json(driver)
      } else {
        res.status(404).json({ error: "Driver not found" })
      }
    } catch (error) {
      console.error("Error updating driver:", error)
      res.status(500).json({ error: "Unable to update driver" })
    }
  }
)

// Delete a driver
router.delete("/:driverId", async (req, res) => {
  try {
    const driverId = req.params.driverId
    const driver = await Driver.findByPk(driverId)
    if (driver) {
      // Delete the profile picture from S3 if it exists
      if (driver.driverProfilePictureKey) {
        const deleteParams = {
          Bucket: process.env.S3_BUCKET_NAME_DRIVER,
          Key: driver.driverProfilePictureKey,
        }
        await s3.deleteObject(deleteParams).promise()
      }

      await driver.destroy()
      res.sendStatus(200).json({ message: "Driver deleted" })
    } else {
      res.status(404).json({ error: "Driver not found" })
    }
  } catch (error) {
    console.error("Error deleting driver:", error)
    res.status(500).json({ error: "Unable to delete driver" })
  }
})

module.exports = router
