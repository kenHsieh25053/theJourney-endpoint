'use strict';
module.exports = (sequelize, DataTypes) => {
  const TouristSpot = sequelize.define('TouristSpot', {
    name: DataTypes.STRING,
    type: DataTypes.STRING,
    longtitude: DataTypes.FLOAT,
    latitude: DataTypes.FLOAT,
    days: DataTypes.FLOAT,
    cost: DataTypes.INTEGER,
    rates: DataTypes.INTEGER,
    transportation: DataTypes.STRING,
    review: DataTypes.TEXT,
    photo_url: DataTypes.STRING
  }, {});
  TouristSpot.associate = function(models) {
    // associations can be defined here
  };
  return TouristSpot;
};