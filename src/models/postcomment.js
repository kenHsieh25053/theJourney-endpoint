'use strict';
module.exports = (sequelize, DataTypes) => {
  const postComment = sequelize.define('postComment', {
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
  postComment.associate = function (models) {
    // associations can be defined here
    postComment.hasOne(models.postCommentLike, {
      foreignKey: 'postCommentId',
      sourceKey: 'id',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE'
    });
    postComment.belongsTo(models.post, {
      foreignKey: 'postId',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
      targetKey: 'id'
    });
    postComment.belongsTo(models.user, {
      foreignKey: 'userId',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
      targetKey: 'id'
    });
  };
  return postComment;
};