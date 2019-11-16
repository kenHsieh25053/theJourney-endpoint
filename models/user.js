'use strict';
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    position: DataTypes.STRING,
    country_count: DataTypes.INTEGER,
    city_count: DataTypes.INTEGER,
    headshot: DataTypes.STRING,
    profile: DataTypes.TEXT
  }, {
    freezeTableName: true,
    tableName: 'user'
  });
  user.associate = function (models) {
    // associations can be defined here
    user.hasOne(models.friend, {
      foreignKey: 'userId',
      sourceKey: 'id',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE'
    });
    user.hasMany(models.post, {
      foreignKey: 'userId',
      sourceKey: 'id',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE'
    });
    user.hasMany(models.relationship, {
      foreignKey: 'user_a',
      sourceKey: 'id',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE'
    });
    user.hasMany(models.relationship, {
      foreignKey: 'user_b',
      sourceKey: 'id',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE'
    });
    user.hasMany(models.travelList, {
      foreignKey: 'userId',
      sourceKey: 'id',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE'
    });
  };
  return user;
};