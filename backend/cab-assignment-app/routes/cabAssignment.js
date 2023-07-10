// Import dependencies
const express = require("express")
const { Driver, Cab, CabAssignment } = require("../db/db")
const router = express.Router()

// Routes for assign cab API

//get assigned cab-drivers
router.get("/", async (req,res) => {
  try{
    const assignments = await CabAssignment.findAll();
    const driverIds = assignments.map((assignment) => assignment.driverId);
    const cabIds = assignments.map((assignment) => assignment.cabId);
    const drivers = await Driver.findAll({
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      where: { driverId: driverIds }
    });
    const cabs = await Cab.findAll({
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      where: { cabId: cabIds }
    });
    const response = [];
    for (const assignment of assignments) {
      const driver = drivers.find((driver) => driver.driverId === assignment.driverId);
      const cab = cabs.find((cab) => cab.cabId === assignment.cabId);
      if (driver && cab) {
        response.push({
          driverId: driver.driverId,
          driverName: driver.driverName,
          cabId: cab.cabId,
          cabRegistrationNumber: cab.cabRegistrationNumber,
          cabModel: cab.cabModel,
        });
      }
    }

    res.json(response);
  }
  catch(e){
    console.log("Error", e)
  }
})

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
    const assignedDriver = await Driver.findByPk(driverId, {
      attributes: ['driverId', 'driverName']
    });

    const assignedCab = await Cab.findByPk(cabId, {
      attributes: ['cabId', 'cabRegistrationNumber', 'cabModel']
    });

    // Construct the response object
    const response = {
      driverId: assignedDriver.driverId,
      driverName: assignedDriver.driverName,
      cabId: assignedCab.cabId,
      cabRegistrationNumber: assignedCab.cabRegistrationNumber,
      cabModel: assignedCab.cabModel
    };

    // Return the response
    res.json(response);
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
      const driver = await Driver.findByPk(driverId, {
        attributes: ['driverId', 'driverName']
      });
  
      const cab = await Cab.findByPk(cabId, {
        attributes: ['cabId', 'cabRegistrationNumber', 'cabModel']
      });
      
      await assignment.save()

      const response = {
        driverId: driver.driverId,
        driverName: driver.driverName,
        cabId: cab.cabId,
        cabRegistrationNumber: cab.cabRegistrationNumber,
        cabModel: cab.cabModel
      };
  
      // Return the response
      res.json(response);
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
