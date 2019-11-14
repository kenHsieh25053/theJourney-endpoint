'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: DataTypes.STRING,
    position: DataTypes.STRING,
    country_count: DataTypes.INTEGER,
    city_count: DataTypes.INTEGER,
    headshot: DataTypes.STRING,
    profile: DataTypes.TEXT
  }, {});
  User.associate = function (models) {
    // associations can be defined here
  };
  return User;
};