'use strict';
module.exports = (sequelize, DataTypes) => {
  const post = sequelize.define('post', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    text: DataTypes.TEXT,
    like: DataTypes.INTEGER
  }, {});
  post.associate = function (models) {
    // associations can be defined here
    post.belongsTo(models.user, {
      foreignKey: 'userId',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
      targetKey: 'id'
    });
  };
  return post;
};