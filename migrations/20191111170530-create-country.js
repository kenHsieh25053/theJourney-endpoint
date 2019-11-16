'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addIndex('Courtry', ['id']);
    return queryInterface.createTable('country', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        autoIncrement: false,
        defaultValue: Sequelize.UUIDV4
      },
      name: {
        type: Sequelize.STRING
      },
      longtitude: {
        type: Sequelize.FLOAT
      },
      latitude: {
        type: Sequelize.FLOAT
      },
      stay_from: {
        type: Sequelize.DATE
      },
      stay_to: {
        type: Sequelize.DATE
      },
      days: {
        type: Sequelize.FLOAT,
        defaultValue: 0.0
      },
      cost: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      rates: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('country');
  }
};