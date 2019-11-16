'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addIndex('post', ['id']);
    return queryInterface.createTable('post', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        autoIncrement: false,
        defaultValue: Sequelize.UUIDV4
      },
      text: {
        type: Sequelize.TEXT
      },
      like: {
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
    return queryInterface.dropTable('post');
  }
};