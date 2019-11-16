"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addIndex('user', ['id']);
    return queryInterface.createTable("user", {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        autoIncrement: false,
        defaultValue: Sequelize.UUIDV4
      },
      password: {
        type: Sequelize.STRING,
        unique: true
      },
      email: {
        type: Sequelize.STRING,
        unique: true
      },
      position: {
        type: Sequelize.STRING
      },
      country_count: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      city_count: {
        type: Sequelize.INTEGER,
        defaultValue: 0
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
    return queryInterface.dropTable("user");
  }
};