'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('relationships', [{
      id: '0dd6ccb3-6aee-4431-9b49-9c1592b3ffee',
      user_b: 'aef8ab8d-0d33-46f3-a23e-fe0ef12190cd',
      status: 'PENDING',
      createdAt: '2019-12-10',
      updatedAt: '2019-12-10',
      actionUserId: '8be1fec5-27e6-4cfa-8e67-3281607a7048'
    },
    {
      id: '36bf8af3-ef76-4275-9241-ace9c246027e',
      user_b: '8be1fec5-27e6-4cfa-8e67-3281607a7048',
      status: 'CONFIRMED',
      createdAt: '2019-12-10',
      updatedAt: '2019-12-15',
      actionUserId: '24e40ba8-5a21-4ba8-a293-445741a2b08f'
    },
    {
      id: '6912b57e-42c9-4f7e-b7e5-686476b3432f',
      user_b: 'aef8ab8d-0d33-46f3-a23e-fe0ef12190cd',
      status: 'CANCELED',
      createdAt: '2019-10-10',
      updatedAt: '2019-10-15',
      actionUserId: '24e40ba8-5a21-4ba8-a293-445741a2b08f'
    },
    {
      id: 'a613e846-97e2-46f0-9a1b-656481ed231f',
      user_b: '24e40ba8-5a21-4ba8-a293-445741a2b08f',
      status: 'CONFIRMED',
      createdAt: '2019-10-16',
      updatedAt: '2019-10-16',
      actionUserId: 'aef8ab8d-0d33-46f3-a23e-fe0ef12190cd'
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('relationships', null, {});
  }
};