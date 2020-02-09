'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'friends',
      [
        {
          id: '2d5c2adf-85aa-40cf-b75a-5feb5842f9ac',
          friends: 2,
          friendList:
            '[{"id":"8be1fec5-27e6-4cfa-8e67-3281607a7048","username":"Jacky","headshot":null}]',
          createdAt: '2019-12-31',
          updatedAt: '2019-12-31',
          userId: 'aef8ab8d-0d33-46f3-a23e-fe0ef12190cd',
        },
        {
          id: '6fa6a133-637d-4f0c-91f2-db6fde023a00',
          friends: 1,
          friendList:
            '[{"id":"aef8ab8d-0d33-46f3-a23e-fe0ef12190cd","username":"Ken","headshot":null}]',
          createdAt: '2019-12-31',
          updatedAt: '2019-12-31',
          userId: '8be1fec5-27e6-4cfa-8e67-3281607a7048',
        },
        {
          id: 'a45ff96d-cf38-4d35-97a8-b3d0bdc24ab7',
          friends: 1,
          friendList:
            '[{"id":"aef8ab8d-0d33-46f3-a23e-fe0ef12190cd","username":"Ken","headshot":null}]',
          createdAt: '2019-12-31',
          updatedAt: '2019-12-31',
          userId: '24e40ba8-5a21-4ba8-a293-445741a2b08f',
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('friends', null, {});
  },
};
