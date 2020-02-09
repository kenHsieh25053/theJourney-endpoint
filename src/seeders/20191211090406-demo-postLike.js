'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'postLikes',
      [
        {
          id: '5ac4549a-0c99-417d-b517-381bf19f0360',
          likeList:
            '[{"id":"aef8ab8d-0d33-46f3-a23e-fe0ef12190cd","username":"Ken","headshot":null,"href":null},{"id":"8be1fec5-27e6-4cfa-8e67-3281607a7048","username":"Jacky","headshot":null,"href":null}]',
          createdAt: '2019-12-12',
          updatedAt: '2019-12-12',
          postId: 'a12f26e6-dd9e-40b6-9b1d-433723a19cfa',
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('postLikes', null, {});
  },
};
