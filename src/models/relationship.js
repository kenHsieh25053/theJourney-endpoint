'use strict';
module.exports = (sequelize, DataTypes) => {
  const relationship = sequelize.define('relationship', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4
    },
    user_a: DataTypes.UUID,
    user_b: DataTypes.UUID,
    status: DataTypes.STRING
  }, {});
  relationship.associate = function (models) {
    // associations can be defined here
    relationship.belongsTo(models.user, {
      foreignKey: 'actionUserId',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
      targetKey: 'id'
    });
  };
  return relationship;
};