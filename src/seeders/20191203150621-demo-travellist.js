'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('travelLists', [{
      id: 'f924766a-5785-4174-acf8-654cfcc6dbe9',
      name: 'Holland',
      tags: [
        'cheese,',
        'red district'
      ],
      stayFrom: '2019-10-07',
      stayTo: '2019-10-11',
      transportation: 'air',
      review: 'boring',
      createdAt: 1575096228000,
      updatedAt: 1575096228000,
      userId: 'aef8ab8d-0d33-46f3-a23e-fe0ef12190cd'
    }], {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('travelLists', null, {});
  }
};