'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('TravelLists', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      tag: {
        type: Sequelize.STRING
      },
      type: {
        type: Sequelize.STRING
      },
      stay_from: {
        type: Sequelize.DATE
      },
      stay_to: {
        type: Sequelize.DATE
      },
      days: {
        type: Sequelize.FLOAT
      },
      cost: {
        type: Sequelize.INTEGER
      },
      rates: {
        type: Sequelize.INTEGER
      },
      transportation: {
        type: Sequelize.STRING
      },
      review: {
        type: Sequelize.TEXT
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
    return queryInterface.dropTable('TravelLists');
  }
};