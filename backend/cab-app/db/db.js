const { Sequelize, DataTypes } = require("sequelize")

// Import table structure from models
const cabModel = require("../models/cab")

// Create an instance of a sequlize to access the database
const sequelize = new Sequelize("afourathon", "root", "password", {
  host: "127.0.0.1",
  dialect: "mysql",
})

// Test the database connection
sequelize
  .authenticate()
  .then(() => {
    console.log("Database connection has been established successfully.".green)
  })
  .catch((error) => {
    console.error("Unable to connect to the database:".red, error)
  })

const Cab = cabModel(sequelize, DataTypes)

// Create the tables in the database (if they don't exist)
sequelize
  .sync({ force: false })
  .then(() => {
    console.log("Database synchronized".green)
  })
  .catch((error) => {
    console.error("Error synchronizing database:".red, error)
  })

module.exports = {
  Cab: Cab,
}
