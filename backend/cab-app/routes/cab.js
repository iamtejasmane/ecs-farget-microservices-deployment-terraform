// Import dependencies
const express = require("express")
const { Cab } = require("../db/db")
const router = express.Router()

// Routes for Cabs API

// Create a cab
router.post("/", async (req, res) => {
  try {
    const { cabRegistrationNumber, cabModel, cabColour } = req.body
    const cab = await Cab.create({
      cabRegistrationNumber,
      cabModel,
      cabColour,
    })
    res.json(cab)
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
    if(cabs){
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
      await cab.destroy()
      res.sendStatus(200)
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
