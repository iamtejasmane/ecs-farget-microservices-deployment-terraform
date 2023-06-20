// Import dependencies
const express = require("express")
const { Driver, Cab, CabAssignment } = require("../db/db")
const router = express.Router()

// Routes for assign cab API

// Assign a cab to a driver
router.post("/", async (req, res) => {
  try {
    const { driverId, cabId } = req.body

    // Check if the driver and cab exist
    const driver = await Driver.findByPk(driverId)
    const cab = await Cab.findByPk(cabId)
    if (!driver || !cab) {
      return res.status(404).json({ error: "Driver or cab not found" })
    }

    // Check if there is an existing assignment for the driver
    const existingAssignment = await CabAssignment.findOne({
      where: { driverId },
    })
    if (existingAssignment) {
      return res.status(400).json({ error: "Driver already assigned to a cab" })
    }

    // Create the new assignment
    const assignment = await CabAssignment.create({
      driverId,
      cabId,
    })
    res.json(assignment)
  } catch (error) {
    console.error("Error assigning cab:", error)
    res.status(500).json({ error: "Unable to assign cab" })
  }
})

// Update the assigned cab for a driver
router.put("/:driverId", async (req, res) => {
  try {
    const { driverId } = req.params
    const { cabId } = req.body

    // Check if the driver and cab exist
    const driver = await Driver.findByPk(driverId)
    const cab = await Cab.findByPk(cabId)
    if (!driver || !cab) {
      return res.status(404).json({ error: "Driver or cab not found" })
    }

    // Find and update the assignment
    const assignment = await CabAssignment.findOne({
      where: { driverId },
    })
    if (assignment) {
      assignment.cabId = cabId
      await assignment.save()
      res.json(assignment)
    } else {
      res.status(404).json({ error: "Assignment not found" })
    }
  } catch (error) {
    console.error("Error updating assignment:", error)
    res.status(500).json({ error: "Unable to update assignment" })
  }
})

// Unassigned cab for a driver
router.delete("/:driverId", async (req, res) => {
  try {
    const { driverId } = req.params

    // Find and delete the assignment
    const assignment = await CabAssignment.findOne({
      where: { driverId },
    })
    if (assignment) {
      await assignment.destroy()
      res.sendStatus(200)
    } else {
      res.status(404).json({ error: "Assignment not found" })
    }
  } catch (error) {
    console.error("Error removing assignment:", error)
    res.status(500).json({ error: "Unable to remove assignment" })
  }
})

// Export router
module.exports = router
