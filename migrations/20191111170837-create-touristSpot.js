'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addIndex('touristSpot', ['id']);
    return queryInterface.createTable('touristSpot', {
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
      type: {
        type: Sequelize.STRING
      },
      longtitude: {
        type: Sequelize.FLOAT
      },
      latitude: {
        type: Sequelize.FLOAT
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
      transportation: {
        type: Sequelize.STRING
      },
      review: {
        type: Sequelize.TEXT
      },
      photo_url: {
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
      cityId: {
        type: Sequelize.UUID,
        references: {
          model: {
            tableName: "city",
            key: "id"
          },
        },
        foreignKey: true,
        allowNull: false
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('touristSpot');
  }
};