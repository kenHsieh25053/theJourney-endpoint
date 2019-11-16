'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addIndex('relationship', ['id', 'user_a', 'user_b']);
    return queryInterface.createTable('relationship', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        autoIncrement: false,
        defaultValue: Sequelize.UUIDV4
      },
      user_a: {
        type: Sequelize.UUID,
        references: {
          model: {
            tableName: "user",
            key: "id"
          },
        },
        foreignKey: true,
        allowNull: false
      },
      user_b: {
        type: Sequelize.UUID,
        references: {
          model: {
            tableName: "user",
            key: "id"
          },
        },
        foreignKey: true,
        allowNull: false
      },
      status: {
        type: Sequelize.STRING
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
    return queryInterface.dropTable('relationship');
  }
};