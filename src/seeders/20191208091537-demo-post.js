'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('posts', [{
      id: 'f924766a-5785-4174-acf8-654cfcc6dbe4',
      text: 'Holland',
      like: 1,
      createdAt: '2019-10-10',
      updatedAt: '2019-10-15',
      travelListId: 'f924766a-5785-4174-acf8-654cfcc6dbe9',
      userId: 'aef8ab8d-0d33-46f3-a23e-fe0ef12190cd'
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('posts', null, {});
  }
};