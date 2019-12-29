'use strict';
module.exports = (sequelize, DataTypes) => {
  const travelList = sequelize.define('travelList', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4
    },
    name: DataTypes.STRING,
    tags: DataTypes.JSON,
    type: DataTypes.STRING,
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
      type: DataTypes.INTEGER,
      defaultValue: 0.0
    },
    likes: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    comments: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
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
    travelList.hasMany(models.post, {
      foreignKey: 'travelListId',
      sourceKey: 'id',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    });
    travelList.hasOne(models.travelListLike, {
      foreignKey: 'travelListId',
      sourceKey: 'id',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE'
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