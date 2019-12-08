'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('countries', [{
      id: '1',
      name: 'Japan',
      longtitude: null,
      latitude: null,
      days: 8,
      costs: 1200,
      rates: 5.0,
      createdAt: '2019-10-10',
      updatedAt: '2019-10-15',
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('countries', null, {});
  }
};