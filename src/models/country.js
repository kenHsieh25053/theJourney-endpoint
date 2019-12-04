'use strict';
module.exports = (sequelize, DataTypes) => {
  const country = sequelize.define('country', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4
    },
    name: DataTypes.STRING,
    longtitude: DataTypes.FLOAT,
    latitude: DataTypes.FLOAT,
    days: DataTypes.INTEGER,
    cost: DataTypes.INTEGER,
    rates: DataTypes.FLOAT
  }, {});
  country.associate = function (models) {
    // associations can be defined here
  };
  return country;
};