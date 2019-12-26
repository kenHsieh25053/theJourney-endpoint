'use strict';
module.exports = (sequelize, DataTypes) => {
  const post = sequelize.define('post', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4
    },
    text: DataTypes.TEXT,
    likes: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  }, {});
  post.associate = function (models) {
    // associations can be defined here
    post.hasOne(models.postLike, {
      foreignKey: 'postId',
      sourceKey: 'id',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE'
    });
    post.belongsTo(models.user, {
      foreignKey: 'userId',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
      targetKey: 'id'
    });
    post.belongsTo(models.travelList, {
      foreignKey: 'travelListId',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
      targetKey: 'id'
    });
  };
  return post;
};