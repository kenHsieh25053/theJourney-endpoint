'use strict';
module.exports = (sequelize, DataTypes) => {
  const city = sequelize.define('city', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4
    },
    name: DataTypes.STRING,
    longtitude: DataTypes.FLOAT,
    latitude: DataTypes.FLOAT,
    stayFrom: DataTypes.DATE,
    stayTo: DataTypes.DATE,
    days: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    costs: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    rates: {
      type: DataTypes.FLOAT,
      defaultValue: 0.0
    },
    transportation: DataTypes.STRING,
    review: DataTypes.STRING,
    photo_url: DataTypes.STRING
  }, {});
  city.associate = function (models) {
    // associations can be defined here
    city.hasMany(models.touristSpot, {
      foreignKey: 'cityId',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
      sourceKey: 'id'
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