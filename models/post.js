'use strict';
module.exports = (sequelize, DataTypes) => {
  const post = sequelize.define('post', {
    text: DataTypes.TEXT,
    like: DataTypes.INTEGER
  }, {
    freezeTableName: true,
    tableName: 'post'
  });
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