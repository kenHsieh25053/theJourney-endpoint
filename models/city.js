'use strict';
module.exports = (sequelize, DataTypes) => {
  const city = sequelize.define('city', {
    name: DataTypes.STRING,
    longtitude: DataTypes.FLOAT,
    latitude: DataTypes.FLOAT,
    stay_from: DataTypes.DATE,
    stay_to: DataTypes.DATE,
    cost: DataTypes.INTEGER,
    rates: DataTypes.INTEGER,
    transportation: DataTypes.STRING,
    review: DataTypes.TEXT,
    photo_url: DataTypes.STRING
  }, {
    freezeTableName: true,
    tableName: 'city'
  });
  city.associate = function (models) {
    // associations can be defined here
    city.hasMany(models.touristSpot, {
      foreignKey: 'cityId',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
      sourceKey: 'id'
    });
    city.belongsTo(models.country, {
      foreignKey: 'countryId',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
      targetKey: 'id'
    });
    city.belongsTo(models.travelList, {
      foreignKey: 'travelListId',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
      targetKey: 'id'
    });
  };
  return city;
};