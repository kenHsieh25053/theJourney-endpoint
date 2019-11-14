'use strict';
module.exports = (sequelize, DataTypes) => {
  const Reletionship = sequelize.define('Reletionship', {
    user_a: DataTypes.UUID,
    user_b: DataTypes.UUID,
    status: DataTypes.STRING
  }, {});
  Reletionship.associate = function(models) {
    // associations can be defined here
  };
  return Reletionship;
};