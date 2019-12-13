'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('friends', [{
      id: 'ea72f884-b88b-4ba1-8aee-93890f538c73',
      friends: 1,
      friendList: ['8be1fec5-27e6-4cfa-8e67-3281607a7048'],
      createdAt: '2019-12-10',
      updatedAt: '2019-12-15',
      userId: '24e40ba8-5a21-4ba8-a293-445741a2b08f'
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('friends', null, {});
  }
};