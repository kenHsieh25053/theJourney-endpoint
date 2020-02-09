'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'posts',
      [
        {
          id: 'f924766a-5785-4174-acf8-654cfcc6dbe4',
          text: 'Holland',
          likes: 0,
          createdAt: '2019-10-10',
          updatedAt: '2019-10-15',
          travelListId: 'f924766a-5785-4174-acf8-654cfcc6dbe9',
          userId: 'aef8ab8d-0d33-46f3-a23e-fe0ef12190cd',
        },
        {
          id: 'a12f26e6-dd9e-40b6-9b1d-433723a19cfa',
          text: 'I like Irish wishky',
          likes: 2,
          createdAt: '2019-12-10',
          updatedAt: '2019-12-15',
          travelListId: '00a69bb5-5430-4e1b-beee-820d964689a9',
          userId: '24e40ba8-5a21-4ba8-a293-445741a2b08f',
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('posts', null, {});
  },
};
