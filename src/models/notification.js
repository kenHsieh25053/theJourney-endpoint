'use strict';
module.exports = (sequelize, DataTypes) => {
  const notification = sequelize.define('notification', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4
    },
    type: DataTypes.STRING,
    href: DataTypes.STRING,
    message: DataTypes.STRING
  }, {});
  notification.associate = function (models) {
    // associations can be defined here
    notification.belongsTo(models.user, {
      foreignKey: 'userId',
      sourceKey: 'id',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    });
  };
  return notification;
};