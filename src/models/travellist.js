'use strict';
module.exports = (sequelize, DataTypes) => {
  const travelList = sequelize.define('travelList', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4
    },
    name: DataTypes.STRING,
    tags: {
      type: DataTypes.STRING,
      get() {
        return this.getDataValue('tags').split(',');
      },
      set(val) {
        this.setDataValue('tags', val.join(','));
      },
    },
    type: DataTypes.STRING,
    stayFrom: DataTypes.DATE,
    stayTo: DataTypes.DATE,
    days: DataTypes.INTEGER,
    cost: DataTypes.INTEGER,
    rates: DataTypes.FLOAT,
    transportation: DataTypes.STRING,
    review: DataTypes.STRING
  }, {});
  travelList.associate = function (models) {
    // associations can be defined here
    travelList.hasMany(models.city, {
      foreignKey: 'travelListId',
      sourceKey: 'id',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    });
    travelList.hasMany(models.post, {
      foreignKey: 'travelListId',
      sourceKey: 'id',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    });
    travelList.belongsTo(models.user, {
      foreignKey: 'userId',
      sourceKey: 'id',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    });
  };
  return travelList;
};