'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'users',
      [
        {
          id: 'aef8ab8d-0d33-46f3-a23e-fe0ef12190cd',
          username: 'Ken',
          password:
            '$2b$10$UHuYtt1IQOnPJRVvFl4euuotxLr/RN5AUOm4/05.sMvTEThNewr.2',
          email: 'kkw25053@gmail.com',
          birthday: '1990-10-10',
          gender: 'male',
          position: null,
          countries: 1,
          cities: 2,
          touristSpots: 4,
          headshot: null,
          profile: 'Hello, Im Ken',
          createdAt: '2019-10-10',
          updatedAt: '2019-10-15',
        },
        {
          id: '24e40ba8-5a21-4ba8-a293-445741a2b08f',
          username: 'Polly',
          password:
            '$2b$10$KO4DSjQRIKB9AxFk5QljGeKpmz5d5/aaLT5GcTBniIB8MmgdhTphu',
          email: 'polly@livemail.tw',
          gender: 'female',
          birthday: '1990-9-10',
          position: null,
          countries: 0,
          cities: 0,
          touristSpots: 0,
          headshot: null,
          profile: 'Im Polly!',
          createdAt: '2019-12-11',
          updatedAt: '2019-12-11',
        },
        {
          id: '8be1fec5-27e6-4cfa-8e67-3281607a7048',
          username: 'Jacky',
          password:
            '$2b$10$HBk8S0ZPQPTVxktziDRCwe2dAyglOPgqs.A.Kic3FF2ERwel0MARy',
          email: 'jacky@livemail.tw',
          gender: 'male',
          birthday: '1990-04-10',
          position: null,
          countries: 0,
          cities: 0,
          touristSpots: 0,
          headshot: null,
          profile: 'Jacky Jacky',
          createdAt: '2019-12-11',
          updatedAt: '2019-12-11',
        },
      ],
      {}
    );
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  },
};
