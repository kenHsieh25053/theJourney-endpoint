'use strict';
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    password: {
      type: DataTypes.STRING,
      unique: true
    },
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    position: DataTypes.STRING,
    countries: DataTypes.INTEGER,
    cities: DataTypes.INTEGER,
    headshot: DataTypes.STRING,
    profile: DataTypes.STRING
  }, {});
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