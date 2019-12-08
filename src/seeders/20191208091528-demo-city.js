'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('cities', [{
        id: '00aa2996-4fe6-4aa3-a265-e5648339b075',
        name: 'Leiden',
        stayFrom: '2019-10-10',
        stayTo: '2019-10-12',
        costs: null,
        rates: null,
        transportation: 'train',
        review: 'so good',
        photo_url: null,
        createdAt: '2019-10-10',
        updatedAt: '2019-10-10',
        travelListId: 'f924766a-5785-4174-acf8-654cfcc6dbe9'
      },
      {
        id: 'fec3131e-683d-410a-ac2b-ae5d60e64c93',
        name: 'Amsterdam',
        stayFrom: '2019-10-07',
        stayTo: '2019-10-10',
        costs: 2000,
        rates: 4,
        transportation: 'air',
        review: 'not bad',
        photo_url: null,
        createdAt: '2019-10-10',
        updatedAt: '2019-10-10',
        travelListId: 'f924766a-5785-4174-acf8-654cfcc6dbe9'
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('cities', null, {});
  }
};