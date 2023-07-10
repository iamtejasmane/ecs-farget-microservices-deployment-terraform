// Import required modules
const express = require("express")
const cors = require("cors")
const morgan = require("morgan")
require("dotenv").config()
require("colors").enable()
const jwt = require("jsonwebtoken")
// Import routes
const cabRoutes = require("./routes/cab")

// Create the Express app
const app = express()

// Middleware
app.use(express.json())
app.use(cors("*"))
app.use(morgan("combined"))

// Middleware function for user authentication and authorization
function authorizeUser(req, res, next) {
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

// app.use(authorizeUser)

// Routes
app.use("/cabs", cabRoutes)

// Start the server
const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`.green)
})

module.exports = app
