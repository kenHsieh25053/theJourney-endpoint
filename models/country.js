'use strict';
module.exports = (sequelize, DataTypes) => {
  const country = sequelize.define('country', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    name: DataTypes.STRING,
    longtitude: DataTypes.FLOAT,
    latitude: DataTypes.FLOAT,
    days: DataTypes.INTEGER,
    cost: DataTypes.INTEGER,
    rates: DataTypes.INTEGER
  }, {});
  country.associate = function (models) {
    // associations can be defined here
    country.hasMany(models.city, {
      foreignKey: 'countryId',
      sourceKey: 'id',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    });
  };
  return country;
};