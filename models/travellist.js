'use strict';
module.exports = (sequelize, DataTypes) => {
  const travelList = sequelize.define('travelList', {
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
  }, {
    freezeTableName: true,
    tableName: 'travelList'
  });
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