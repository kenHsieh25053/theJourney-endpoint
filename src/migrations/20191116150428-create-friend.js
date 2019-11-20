'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('friends', {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
      },
      friends: {
        type: Sequelize.INTEGER
      },
      friendList: {
        type: Sequelize.UUID,
        get() {
          return this.getDataValue('friendList').split(',')
        },
        set(val) {
          this.setDataValue('friendList', val.join(','));
        },
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
            tableName: "users",
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
    return queryInterface.dropTable('friends');
  }
};