'use strict';
module.exports = (sequelize, DataTypes) => {
  const touristSpot = sequelize.define('touristSpot', {
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
  }, {
    freezeTableName: true,
    tableName: 'touristSpot'
  });
  touristSpot.associate = function (models) {
    // associations can be defined here
    touristSpot.belongsTo(models.city, {
      foreignKey: 'cityId',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
      targetKey: 'id'
    });
  };
  return touristSpot;
};