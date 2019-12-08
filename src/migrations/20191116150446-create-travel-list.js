'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('travelLists', {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
      },
      name: {
        type: Sequelize.STRING
      },
      tags: {
        type: Sequelize.STRING,
        get() {
          return this.getDataValue('tags').split(',');
        },
        set(val) {
          this.setDataValue('tags', val.join(','));
        },
      },
      type: {
        type: Sequelize.STRING
      },
      stayFrom: {
        type: Sequelize.DATE
      },
      stayTo: {
        type: Sequelize.DATE
      },
      days: {
        type: Sequelize.INTEGER
      },
      costs: {
        type: Sequelize.INTEGER
      },
      rates: {
        type: Sequelize.FLOAT
      },
      transportation: {
        type: Sequelize.STRING
      },
      review: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      userId: {
        type: Sequelize.UUID,
        references: {
          model: {
            tableName: 'users',
            key: 'id'
          },
        },
        foreignKey: true,
        allowNull: false,
        onDelete: 'cascade',
        onUpdate: 'cascade'
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('travelLists');
  }
};