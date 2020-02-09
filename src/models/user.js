'use strict';
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define(
    'user',
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
      },
      username: DataTypes.STRING,
      password: {
        type: DataTypes.STRING,
        unique: true,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
      },
      gender: DataTypes.STRING,
      birthday: DataTypes.DATE,
      position: DataTypes.STRING,
      countries: {
        type: DataTypes.INTEGER,
        defaultValue: DataTypes.UUIDV4,
      },
      cities: {
        type: DataTypes.INTEGER,
        defaultValue: DataTypes.UUIDV4,
      },
      touristSpots: {
        type: DataTypes.INTEGER,
        defaultValue: DataTypes.UUIDV4,
      },
      headshot: DataTypes.STRING,
      profile: DataTypes.STRING,
    },
    {}
  );
  user.associate = function(models) {
    // associations can be defined here
    user.hasOne(models.friend, {
      foreignKey: 'userId',
      sourceKey: 'id',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    });
    user.hasMany(models.post, {
      foreignKey: 'userId',
      sourceKey: 'id',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    });
    user.hasOne(models.relationship, {
      foreignKey: 'actionUserId',
      sourceKey: 'id',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    });
    user.hasMany(models.travelList, {
      foreignKey: 'userId',
      sourceKey: 'id',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    });
    user.hasMany(models.notification, {
      foreignKey: 'userId',
      sourceKey: 'id',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    });
  };
  return user;
};
