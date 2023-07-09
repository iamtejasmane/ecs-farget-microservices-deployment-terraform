// Define Cab model
module.exports = (sequelize, type) => {
  return sequelize.define("Cab", {
    cabId: {
      type: type.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    cabRegistrationNumber: type.STRING,
    cabModel: type.STRING,
    cabColour: type.STRING,
    cabImageKey: type.STRING,
  })
}
