'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [{
      id: 'aef8ab8d-0d33-46f3-a23e-fe0ef12190cd',
      username: 'ken',
      password: '$2b$10$UHuYtt1IQOnPJRVvFl4euuotxLr/RN5AUOm4/05.sMvTEThNewr.2',
      email: 'kkw25053@gmail.com',
      profile: 'Hello, Im Ken',
      createdAt: '2019-10-10',
      updatedAt: '2019-10-15',
      position: null,
      headshot: null
    }], {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};