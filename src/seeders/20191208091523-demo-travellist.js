'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('travelLists', [{
      id: 'f924766a-5785-4174-acf8-654cfcc6dbe9',
      name: 'Holland',
      tags: [
        'cheese'
      ],
      type: 'family trip',
      stayFrom: '2019-10-07',
      stayTo: '2019-10-11',
      days: null,
      costs: null,
      rates: null,
      transportation: 'air',
      review: 'boring',
      createdAt: '2019-10-10',
      updatedAt: '2019-10-15',
      userId: 'aef8ab8d-0d33-46f3-a23e-fe0ef12190cd'
    }], {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('travelLists', null, {});
  }
};