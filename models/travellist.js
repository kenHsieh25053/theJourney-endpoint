'use strict';
module.exports = (sequelize, DataTypes) => {
  const travelList = sequelize.define('travelList', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    name: DataTypes.STRING,
    tag: DataTypes.STRING,
    type: DataTypes.STRING,
    stayFrom: DataTypes.DATE,
    stayTo: DataTypes.DATE,
    days: DataTypes.INTEGER,
    cost: DataTypes.INTEGER,
    rates: DataTypes.INTEGER,
    transportation: DataTypes.STRING,
    review: DataTypes.STRING
  }, {});
  travelList.associate = function (models) {
    // associations can be defined here
    travelList.hasMany(models.city, {
      foreignKey: 'travelListId',
      sourceKey: 'id',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    });
    travelList.belongsTo(models.user, {
      foreignKey: 'userId',
      sourceKey: 'id',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    });
  };
  return travelList;
};