'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addIndex('friend', ['id']);
    return queryInterface.createTable('friend', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        autoIncrement: false,
        defaultValue: Sequelize.UUIDV4
      },
      friend_count: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      friend_list: {
        type: Sequelize.UUID
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
    return queryInterface.dropTable('friend');
  }
};