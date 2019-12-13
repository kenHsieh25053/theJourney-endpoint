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
    days: {
      type: DataTypes.INTEGER,
      defaultValue: DataTypes.INTEGER
    },
    costs: {
      type: DataTypes.INTEGER,
      defaultValue: DataTypes.INTEGER
    },
    rates: {
      type: DataTypes.INTEGER,
      defaultValue: DataTypes.FLOAT
    }
  }, {});
  country.associate = function (models) {
    // associations can be defined here
  };
  return country;
};