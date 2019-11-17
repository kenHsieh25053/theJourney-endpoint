'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('cities', {
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
      longtitude: {
        type: Sequelize.FLOAT
      },
      latitude: {
        type: Sequelize.FLOAT
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
        type: Sequelize.STRING
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
      countryId: {
        type: Sequelize.UUID,
        references: {
          model: {
            tableName: "countries",
            key: "id"
          },
        },
        foreignKey: true,
        allowNull: false,
        onDelete: 'cascade',
        onUpdate: 'cascade'
      },
      travelListId: {
        type: Sequelize.UUID,
        references: {
          model: {
            tableName: "travelLists",
            key: "id"
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
    return queryInterface.dropTable('cities');
  }
};