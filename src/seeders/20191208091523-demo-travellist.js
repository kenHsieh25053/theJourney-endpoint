'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('travelLists', [{
        id: 'f924766a-5785-4174-acf8-654cfcc6dbe9',
        name: 'Europe',
        tags: null,
        type: 'family trip',
        stayFrom: '2019-10-10',
        stayTo: '2019-10-18',
        days: 8,
        costs: 2000,
        rates: 3.7,
        likes: 0,
        comments: 1,
        permissions: 'PUBLIC',
        transportation: 'air',
        review: 'boring',
        createdAt: '2019-10-10',
        updatedAt: '2019-10-15',
        userId: 'aef8ab8d-0d33-46f3-a23e-fe0ef12190cd'
      },
      {
        id: '00a69bb5-5430-4e1b-beee-820d964689a9',
        name: 'Ireland',
        tags: null,
        type: 'backpack',
        stayFrom: '2019-11-07',
        stayTo: '2019-12-11',
        days: 0,
        costs: 0,
        rates: 0.0,
        likes: 0,
        comments: 1,
        permissions: 'PUBLIC',
        transportation: 'air',
        review: 'boring',
        createdAt: '2019-12-10',
        updatedAt: '2019-12-15',
        userId: '24e40ba8-5a21-4ba8-a293-445741a2b08f'
      }
    ], {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('travelLists', null, {});
  }
};