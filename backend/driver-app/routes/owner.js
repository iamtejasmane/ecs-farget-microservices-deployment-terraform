// Import dependencies
const express = require("express")
const jwt = require("jsonwebtoken")
const router = express.Router()

// Routes for Owner API

//  Owner login
router.post("/login", async (req, res) => {
  try {
    const { ownerEmail, ownerPassword } = req.body
    if (
      process.env.OWNER_EMAIL == ownerEmail &&
      process.env.OWNER_PASSWORD == ownerPassword
    ) {
      const token = jwt.sign({ id: 1 }, process.env.JWT_SECRET)
      const owner = {
        ownerEmail: ownerEmail,
        token: token,
      }
      res.json(owner)
    } else {
      res.status(401).json({ error: "Invalid credentials" })
    }
  } catch (error) {
    console.error("Error signin owner:", error)
    res.status(500).json({ error: "Unable to login" })
  }
})

module.exports = router
