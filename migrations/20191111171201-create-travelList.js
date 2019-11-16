'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addIndex('travelList', ['id']);
    return queryInterface.createTable('travelList', {
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
            tableName: "user",
            key: "id"
          },
        },
        foreignKey: true,
        allowNull: false
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('travelList');
  }
};