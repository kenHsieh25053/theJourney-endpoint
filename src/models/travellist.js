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
    // tags: { // need to find another way to do this
    //   type: DataTypes.STRING,
    //   get() {
    //     console.log(this.getDataValue('tags'));
    //     return this.getDataValue('tags').split(',');
    //   },
    //   set(val) {
    //     console.log(this.setDataValue('tags'));
    //     this.setDataValue('tags', val.join(','));
    //   },
    // },
    type: DataTypes.STRING,
    stayFrom: DataTypes.DATE,
    stayTo: DataTypes.DATE,
    days: {
      type: DataTypes.INTEGER,
      defaultValue: DataTypes.INTEGER
    },
    costs: {
      type: DataTypes.INTEGER,
      defaultValue: DataTypes.INTEGER
    },
    rates: {
      type: DataTypes.INTEGER,
      defaultValue: DataTypes.FLOAT
    },
    likes: {
      type: DataTypes.INTEGER,
      defaultValue: DataTypes.INTEGER
    },
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
    travelList.hasOne(models.travelListLike, {
      foreignKey: 'travelListId',
      sourceKey: 'id',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE'
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