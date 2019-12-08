'use strict';
module.exports = (sequelize, DataTypes) => {
  const touristSpot = sequelize.define('touristSpot', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4
    },
    name: DataTypes.STRING,
    type: DataTypes.STRING,
    longtitude: DataTypes.FLOAT,
    latitude: DataTypes.FLOAT,
    days: DataTypes.INTEGER,
    costs: DataTypes.INTEGER,
    rates: DataTypes.FLOAT,
    transportation: DataTypes.STRING,
    review: DataTypes.STRING,
    photo_url: DataTypes.STRING
  }, {});
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