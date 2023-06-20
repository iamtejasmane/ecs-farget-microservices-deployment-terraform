// Define Cab Assignment model
module.exports = (sequelize, type) => {
  return sequelize.define("CabAssignment", {
    cabAssignmentId: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
  })
}
