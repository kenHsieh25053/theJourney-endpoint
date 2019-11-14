'use strict';
module.exports = (sequelize, DataTypes) => {
  const Country = sequelize.define('Country', {
    name: DataTypes.STRING,
    longtitude: DataTypes.FLOAT,
    latitude: DataTypes.FLOAT,
    stay_from: DataTypes.DATE,
    stay_to: DataTypes.DATE,
    period: DataTypes.FLOAT,
    cost: DataTypes.INTEGER,
    rates: DataTypes.INTEGER
  }, {});
  Country.associate = function(models) {
    // associations can be defined here
  };
  return Country;
};