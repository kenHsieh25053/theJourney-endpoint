'use strict';
module.exports = (sequelize, DataTypes) => {
  const postCommentLike = sequelize.define('postCommentLike', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4
    },
    likeList: DataTypes.JSON
  }, {});
  postCommentLike.associate = function(models) {
    // associations can be defined here
    postCommentLike.belongsTo(models.postComment, {
      foreignKey: 'postCommentId',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
      targetKey: 'id'
    });
  };
  return postCommentLike;
};