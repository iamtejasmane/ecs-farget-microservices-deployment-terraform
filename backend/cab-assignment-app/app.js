// Import required modules
const express = require("express")
const cors = require("cors")
const morgan = require("morgan")
require("colors").enable()
require("dotenv").config()

// Import routes
const cabAssignmentRoutes = require("./routes/cabAssignment")

// Create the Express app
const app = express()

// Middleware
app.use(express.json())
app.use(cors("*"))
app.use(morgan("combined"))

// Routes
app.use("/assignments", cabAssignmentRoutes)

// Start the server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`.green)
})
