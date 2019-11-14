'use strict';
module.exports = (sequelize, DataTypes) => {
  const TravelList = sequelize.define('TravelList', {
    name: DataTypes.STRING,
    tag: DataTypes.STRING,
    type: DataTypes.STRING,
    stay_from: DataTypes.DATE,
    stay_to: DataTypes.DATE,
    days: DataTypes.FLOAT,
    cost: DataTypes.INTEGER,
    rates: DataTypes.INTEGER,
    transportation: DataTypes.STRING,
    review: DataTypes.TEXT
  }, {});
  TravelList.associate = function(models) {
    // associations can be defined here
  };
  return TravelList;
};