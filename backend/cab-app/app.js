// Import required modules
const express = require("express")
const cors = require("cors")
const morgan = require("morgan")
require("colors").enable()

// Import routes
const cabRoutes = require("./routes/cab")

// Create the Express app
const app = express()

// Middleware
app.use(express.json())
app.use(cors("*"))
app.use(morgan("combined"))

// Routes
app.use("/cabs", cabRoutes)

// Start the server
const PORT = 3000
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`.green)
})
