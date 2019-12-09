'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('relationships', [{
      id: '1',
      user_b: 'aef8ab8d-0d33-46f3-a23e-fe0ef12190de',
      status: 'PENDING',
      createdAt: '2019-10-10',
      updatedAt: '2019-10-15',
      actionUserId: 'aef8ab8d-0d33-46f3-a23e-fe0ef12190cd'
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('relationships', null, {});
  }
};