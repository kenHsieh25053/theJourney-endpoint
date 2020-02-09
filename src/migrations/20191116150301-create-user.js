'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },
      username: {
        type: Sequelize.STRING,
        defaultValue: 'Please fill your name',
      },
      password: {
        type: Sequelize.STRING,
        unique: true,
      },
      email: {
        type: Sequelize.STRING,
        unique: true,
      },
      gender: {
        type: Sequelize.STRING,
      },
      birthday: {
        type: Sequelize.DATE,
      },
      position: {
        type: Sequelize.STRING,
      },
      countries: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      cities: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      touristSpots: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      headshot: {
        type: Sequelize.STRING,
      },
      profile: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('users');
  },
};
