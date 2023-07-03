// Import required modules
const express = require("express")
const cors = require("cors")
const morgan = require("morgan")
require("colors").enable()
require("dotenv").config()

// Import routes
const driverRoutes = require("./routes/driver")
const ownerRoutes = require("./routes/owner")

// Create the Express app
const app = express()

// Middleware
app.use(express.json())
app.use(cors("*"))
app.use(morgan("combined"))

// Middleware function for user authentication and authorization
function authorizeUser(req, res, next) {
  if (req.url == "/owner/login") {
    next()
  } else {
    const token = req.headers["token"]

    if (!token) {
      res.status(401).json({ message: "Invalid token" })
    } else {
      try {
        const data = jwt.verify(token, process.env.JWT_SECRET)
        req.id = data.id
        next()
      } catch (exception) {
        res.status(401).json({ message: "Invalid token" })
      }
    }
  }
}

// app.use(authorizeUser)

// Routes
app.use("/drivers", driverRoutes)
app.use("/owner", ownerRoutes)

// Start the server
const PORT = 3000
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`.bgBlue)
})

module.exports = app
