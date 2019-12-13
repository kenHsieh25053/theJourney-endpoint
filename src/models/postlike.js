'use strict';
module.exports = (sequelize, DataTypes) => {
  const postLike = sequelize.define('postLike', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4
    },
    likeList: DataTypes.JSON
  }, {});
  postLike.associate = function(models) {
    // associations can be defined here
    postLike.belongsTo(models.post, {
      foreignKey: 'postId',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
      targetKey: 'id'
    });
  };
  return postLike;
};