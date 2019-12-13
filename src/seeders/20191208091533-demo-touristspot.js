'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('touristSpots', [{
      id: '1706da4a-58a0-4d1c-a6f6-c455b8740ef5',
      name: 'history museum',
      type: 'public',
      longtitude: null,
      latitude: null,
      days: null,
      costs: 500,
      rates: 4,
      transportation: 'foot',
      review: 'so good',
      photo_url: null,
      createdAt: '2019-10-10',
      updatedAt: '2019-10-10',
      cityId: 'fec3131e-683d-410a-ac2b-ae5d60e64c93'
    },
    {
      id: '4decc762-4361-481b-8bff-1c5943273c09',
      name: 'sea museum',
      type: 'public',
      longtitude: null,
      latitude: null,
      days: null,
      costs: 500,
      rates: 4,
      transportation: 'foot',
      review: 'so good',
      photo_url: null,
      createdAt: '2019-10-10',
      updatedAt: '2019-10-10',
      cityId: 'fec3131e-683d-410a-ac2b-ae5d60e64c93'
    },
    {
      id: '72b1e6c9-1f84-45ee-b48e-782a9998bff3',
      name: 'red district',
      type: 'public',
      longtitude: null,
      latitude: null,
      days: null,
      costs: 500,
      rates: 5,
      transportation: 'car',
      review: 'so good',
      photo_url: null,
      createdAt: '2019-10-10',
      updatedAt: '2019-10-10',
      cityId: 'fec3131e-683d-410a-ac2b-ae5d60e64c93'
    },
    {
      id: '79a2ea64-6959-4694-8052-944bfda34fd0',
      name: 'art museum',
      type: 'public',
      longtitude: null,
      latitude: null,
      days: null,
      costs: 500,
      rates: 3,
      transportation: 'car',
      review: 'so good',
      photo_url: null,
      createdAt: '2019-10-10',
      updatedAt: '2019-10-10',
      cityId: '00aa2996-4fe6-4aa3-a265-e5648339b075'
    }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('touristSpots', null, {});
  }
};