'use strict';
module.exports = (sequelize, DataTypes) => {
  const Friend = sequelize.define('Friend', {
    friend_count: DataTypes.INTEGER,
    friend_list: DataTypes.UUID
  }, {});
  Friend.associate = function(models) {
    // associations can be defined here
  };
  return Friend;
};