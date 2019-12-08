'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('friends', [{
      id: '3',
      friends: 2,
      friendList: ['1'],
      createdAt: '2019-10-10',
      updatedAt: '2019-10-15',
      userId: 'aef8ab8d-0d33-46f3-a23e-fe0ef12190cd'
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('friends', null, {});
  }
};