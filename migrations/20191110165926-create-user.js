'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUIDV4
      },
      email: {
        type: Sequelize.STRING
      },
      position: {
        type: Sequelize.STRING
      },
      country_count: {
        type: Sequelize.INTEGER
      },
      city_count: {
        type: Sequelize.INTEGER
      },
      headshot: {
        type: Sequelize.STRING
      },
      profile: {
        type: Sequelize.TEXT
      },
      createdAt: {
        type: Sequelize.DATE
      },
      updatedAt: {
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Users');
  }
};