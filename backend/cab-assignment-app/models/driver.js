// Define the Drivers table schema
module.exports = (sequelize, type) => {
  return sequelize.define("Driver", {
    driverId: {
      type: type.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    driverName: {
      type: type.STRING,
      allowNull: false,
    },
    driverEmail: {
      type: type.STRING,
      allowNull: false,
    },
    driverPhoneNumber: {
      type: type.STRING,
      allowNull: false,
    },
    driverProfilePicture: {
      type: type.STRING,
    },
  })
}
