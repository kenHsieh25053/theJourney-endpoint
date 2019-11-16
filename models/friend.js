'use strict';
module.exports = (sequelize, DataTypes) => {
  const friend = sequelize.define('friend', {
    friend_count: DataTypes.INTEGER,
    friend_list: DataTypes.UUID
  }, {
    freezeTableName: true,
    tableName: 'friend'
  });
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