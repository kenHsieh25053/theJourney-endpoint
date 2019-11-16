'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addIndex('city', ['id']);
    return queryInterface.createTable('city', {
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
      countryId: {
        type: Sequelize.UUID,
        references: {
          model: {
            tableName: "country",
            key: "id"
          },
        },
        foreignKey: true,
        allowNull: false
      },
      travelListId: {
        type: Sequelize.UUID,
        references: {
          model: {
            tableName: "travelList",
            key: "id"
          },
        },
        foreignKey: true,
        allowNull: false
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('city');
  }
};