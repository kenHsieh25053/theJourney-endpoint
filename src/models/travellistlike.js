'use strict';
module.exports = (sequelize, DataTypes) => {
  const travelListLike = sequelize.define('travelListLike', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4
    },
    likeList: DataTypes.JSON
  }, {});
  travelListLike.associate = function(models) {
    // associations can be defined here
    travelListLike.belongsTo(models.travelList, {
      foreignKey: 'travelListId',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
      targetKey: 'id'
    });
  };
  return travelListLike;
};