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
    },
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