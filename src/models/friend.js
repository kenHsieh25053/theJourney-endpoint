'use strict';
module.exports = (sequelize, DataTypes) => {
  const friend = sequelize.define('friend', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4
    },
    friends: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    friendList: DataTypes.JSON
  }, {});
  friend.associate = function (models) {
    // associations can be defined here
    friend.belongsTo(models.user, {
      foreignKey: 'userId',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
      targetKey: 'id'
    });
  };
  return friend;
};