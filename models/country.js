'use strict';
module.exports = (sequelize, DataTypes) => {
  const country = sequelize.define('country', {
    name: DataTypes.STRING,
    longtitude: DataTypes.FLOAT,
    latitude: DataTypes.FLOAT,
    stay_from: DataTypes.DATE,
    stay_to: DataTypes.DATE,
    days: DataTypes.FLOAT,
    cost: DataTypes.INTEGER,
    rates: DataTypes.INTEGER
  }, {
    freezeTableName: true,
    tableName: 'country'
  });
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