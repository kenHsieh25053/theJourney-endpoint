'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('countries', [{
      id: '6912b57e-42c9-4f7e-b7e5-686476b3432f',
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