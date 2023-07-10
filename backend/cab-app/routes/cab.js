// Import dependencies
const express = require("express")
const { Cab } = require("../db/db")
const { v4: uuidv4 } = require("uuid")
const multer = require("multer")
const AWS = require("aws-sdk")
const fs = require("fs")
const router = express.Router()

// Configure AWS
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

// Routes for Cabs API
// Create a cab
router.post("/", upload.single("cabImage"), async (req, res) => {
  try {
    const { cabRegistrationNumber, cabModel, cabColour } = req.body

    // Process the profile picture file
    const profilePictureFile = req.file
    let profilePictureKey = null
    if (profilePictureFile) {
      // Upload the file to S3
      const uploadParams = {
        Bucket: process.env.S3_BUCKET_NAME_CAB,
        Key: profilePictureFile.filename,
        Body: fs.readFileSync(profilePictureFile.path),
      }

      const uploadResult = await s3.upload(uploadParams).promise()

      // Store the S3 object key in the database
      profilePictureKey = uploadResult.Key

      // Remove the temporary file from the server
      fs.unlinkSync(profilePictureFile.path)
    }

    const cab = await Cab.create({
      cabRegistrationNumber,
      cabModel,
      cabColour,
      cabImageKey: profilePictureKey,
    })
    res.status(201).json(cab)
  } catch (error) {
    console.error("Error creating cab:", error)
    res.status(500).json({ error: "Unable to create cab" })
  }
})

// Get all cabs
router.get("/", async (req, res) => {
  try {
    const cabs = await Cab.findAll()
    res.json(cabs)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Unable to fetch cabs" })
  }
})

// Get a cab by cabId
router.get("/:cabId", async (req, res) => {
  try {
    const cabs = await Cab.findByPk(req.params.cabId)
    if (cabs) {
      res.json(cabs)
    }
    res.status(404).json({ error: "Cab not found" })
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Unable to fetch cabs" })
  }
})
// Update a cab
router.put("/:cabId", async (req, res) => {
  try {
    const { cabId } = req.params
    const { cabRegistrationNumber, cabModel, cabColour } = req.body

    const cab = await Cab.findByPk(cabId)
    if (cab) {
      // Check if a new cab image is provided
      if (req.file) {
        // Delete the previous profile picture from S3 if it exists
        if (cab.cabImageKey) {
          const deleteParams = {
            Bucket: process.env.S3_BUCKET_NAME_CAB,
            Key: cab.cabImageKey,
          }
          await s3.deleteObject(deleteParams).promise()
        }

        // Upload the new profile picture to S3
        const uploadParams = {
          Bucket: process.env.S3_BUCKET_NAME_CAB,
          Key: req.file.filename,
          Body: fs.readFileSync(req.file.path),
        }
        const uploadResult = await s3.upload(uploadParams).promise()

        // Update the cab image key in the database
        cab.cabImageKey = uploadResult.Key

        // Remove the temporary file from the server
        fs.unlinkSync(req.file.path)
      }

      // Update the cab details
      cab.cabRegistrationNumber = cabRegistrationNumber
      cab.cabModel = cabModel
      cab.cabColour = cabColour
      await cab.save()
      res.json(cab)
    } else {
      res.status(404).json({ error: "Cab not found" })
    }
  } catch (error) {
    console.error("Error updating cab:", error)
    res.status(500).json({ error: "Unable to update cab" })
  }
})

// Delete a cab
router.delete("/:cabId", async (req, res) => {
  try {
    const { cabId } = req.params
    const cab = await Cab.findByPk(cabId)
    if (cab) {
      // Delete the cab profile picture from S3 if it exists
      if (cab.cabImageKey) {
        const deleteParams = {
          Bucket: process.env.S3_BUCKET_NAME_CAB,
          Key: cab.cabImageKey,
        }
        await s3.deleteObject(deleteParams).promise()
      }

      // Delete cab from the database
      await cab.destroy()
      res.sendStatus(200).json({ message: "Cab deleted" })
    } else {
      res.status(404).json({ error: "Cab not found" })
    }
  } catch (error) {
    console.error("Error deleting cab:", error)
    res.status(500).json({ error: "Unable to delete cab" })
  }
})

// Export router
module.exports = router