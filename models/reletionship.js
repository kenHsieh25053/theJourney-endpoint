'use strict';
module.exports = (sequelize, DataTypes) => {
  const relationship = sequelize.define('relationship', {
    user_a: DataTypes.UUID,
    user_b: DataTypes.UUID,
    status: DataTypes.STRING
  }, {
    freezeTableName: true,
    tableName: 'relationship'
  });
  relationship.associate = function (models) {
    // associations can be defined here
    relationship.belongsTo(models.user, {
      foreignKey: 'user_a',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
      targetKey: 'id'
    });
    relationship.belongsTo(models.user, {
      foreignKey: 'user_b',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
      targetKey: 'id'
    });
  };
  return relationship;
};