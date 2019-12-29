import models from '../../models';
import uuidv4 from 'uuid/v4';
const {
  Sequelize
} = require('sequelize');
const Op = Sequelize.Op;

module.exports = {
  _friendActions,
  _friendPendingList,
  _friendList,
  _likeLists,
  _updateLike,
  _notifications
};

// user can send, accept or canceling friend invitation, disconnect with friend,
// depends on type: 'PENDING', 'CONFIRMED', 'CANCELED' and 'UNFRIEND'
async function _friendActions(args, userId) {
  switch (args.status) {
    // actionUser sends invitation to user_b
    case 'PENDING': {
      args['actionUserId'] = userId;
      await models.relationship.create(args);
      // todo: notification
      return 'Invitation sent';
    }
    // user_b accepts invitation from actionUser
    case 'CONFIRMED': {
      const relationship = await models.relationship.findOne({
        where: {
          user_b: userId,
          status: 'PENDING',
          actionUserId: args.user_b
        }
      });
      await models.relationship.update({
        status: args.status
      }, {
        where: {
          id: relationship.id
        }
      });
      // update user/user_b's friend table
      const userUpdateList = [userId, args.user_b];
      userUpdateList.forEach(async id => {
        const friendExist = await models.friend.findOne({
          where: {
            userId: id
          }
        });
        // if user/user_b's firend row doesn't exist
        if (!friendExist) {
          switch (id) {
            // find user_b's info then create the friend row
            case userId: {
              const userBInfo = await models.user.findByPk(args.user_b, {
                attributes: ['id', 'username', 'headshot']
              });
              const userFriend = {
                id: uuidv4(),
                friends: 1,
                friendList: JSON.stringify([{
                  id: userBInfo.id,
                  username: userBInfo.username,
                  headshot: userBInfo.headshot
                }]),
                userId
              };
              await models.friend.create(userFriend);

              break;
            }
            // find user's info then create the friend row
            case args.user_b: {
              const userInfo = await models.user.findByPk(userId, {
                attributes: ['id', 'username', 'headshot']
              });
              const userBfriend = {
                id: uuidv4(),
                friends: 1,
                friendList: JSON.stringify([{
                  id: userInfo.id,
                  username: userInfo.username,
                  headshot: userInfo.headshot
                }]),
                userId: args.user_b
              };
              await models.friend.create(userBfriend);

              break;
            }
          }
          // if user's firend row exist
        } else {
          // find user_b's info then update the friend table
          switch (id) {
            case userId: {
              const userBInfo = await models.user.findByPk(args.user_b, {
                attributes: ['id', 'username', 'headshot']
              });

              let userfriends = await models.friend.findOne({
                where: {
                  userId
                },
                attributes: ['friendList']
              });
              let friendListArray = JSON.parse(userfriends.friendList);
              friendListArray.push(userBInfo);
              const updatedFriend = {
                friends: friendListArray.length,
                friendList: JSON.stringify(friendListArray),
                userId
              };
              await models.friend.update(updatedFriend, {
                where: {
                  userId
                }
              });

              break;
            }
            // find user's info then update the friend table
            case args.user_b: {
              const userInfo = await models.user.findByPk(userId, {
                attributes: ['id', 'username', 'headshot']
              });
              let userBfriends = await models.friend.findOne({
                where: {
                  userId: args.user_b
                },
                attributes: ['friendList']
              });
              let friendListArray = JSON.parse(userBfriends.friendList);
              friendListArray.push(userInfo);
              const updatedFriend = {
                friends: friendListArray.length,
                friendList: JSON.stringify(friendListArray),
                userId: args.user_b
              };

              await models.friend.update(updatedFriend, {
                where: {
                  userId: args.user_b
                }
              });

              break;
            }
          }
        }
      });
      return 'Invitation confirmed!';
    }
    // actionUser cancels the invitation
    case 'CANCELED': {
      const relationship = await models.relationship.findOne({
        where: {
          user_b: args.user_b,
          status: 'PENDING',
          actionUserId: userId
        }
      });
      if (!relationship) {
        return {
          status: 404,
          message: 'Invitation doesn\'t exist'
        };
      }
      await models.relationship.update({
        status: args.status
      }, {
        where: {
          id: relationship.id
        }
      });
      return 'Invitation canceled!';
    }
    // actionUser unfriend user_b
    case 'UNFRIEND': {
      const relationship = await models.relationship.findOne({
        where: {
          status: 'CONFIRMED',
          [Op.or]: [
            // actionUser invite user_b case
            {
              user_b: args.user_b,
              actionUserId: userId
            },
            // actionUser was invited by user_b
            {
              user_b: userId,
              actionUserId: args.user_b
            }
          ]
        }
      });
      if (!relationship) {
        return {
          status: 404,
          message: 'Invitation doesn\'t exist'
        };
      }
      await models.relationship.update({
        status: args.status
      }, {
        where: {
          id: relationship.id
        }
      });
      // update user/user_b's row in friend table
      const userUpdateList = [userId, args.user_b];
      userUpdateList.forEach(async id => {
        switch (id) {
          // find user's info then update the friend table
          case userId: {
            const originalfriendList = await models.friend.findOne({
              where: {
                userId: args.user_b
              },
              attributes: ['friendList']
            });
            const friendListArray = JSON.parse(originalfriendList.friendList);
            // delete user_b's info
            let updatedFriendListArray = friendListArray.filter(item => {
              return item.id != userId;
            });
            // count friends' number
            const friends = updatedFriendListArray.length;
            await models.friend.update({
              friends,
              friendList: JSON.stringify(updatedFriendListArray)
            }, {
              where: {
                userId
              }
            });
            break;
          }
          // find user_b's info then update the friend table
          case args.user_b: {
            const originalfriendList = await models.friend.findOne({
              where: {
                userId
              },
              attributes: ['friendList']
            });
            const friendListArray = JSON.parse(originalfriendList.friendList);
            // delete user's info
            let updatedFriendListArray = friendListArray.filter(item => {
              return item.id != args.user_b;
            });
            // count friends' number
            const friends = updatedFriendListArray.length;
            await models.friend.update({
              friends,
              friendList: JSON.stringify(updatedFriendListArray)
            }, {
              where: {
                userId: args.user_b
              }
            });
            break;
          }
        }
      });

      return 'Unfriended';
    }
  }
}

// user can see who is in the friend pending list
async function _friendPendingList(userId) {
  const relationship = await models.user.findAll({
    include: [{
      model: models.relationship,
      where: {
        status: 'PENDING',
        user_b: userId
      }
    }],
    attributes: ['id', 'username', 'headshot']
  });
  return relationship;
}

// user can see who is in the friend list
async function _friendList(userId) {
  const friend = await models.friend.findOne({
    where: {
      userId
    },
    attributes: ['friendList']
  });
  const friendList = JSON.parse(friend.friendList);
  return friendList;
}

// user can see who likes post and travelList
// depends on type: 'POSTLIKE' or 'TRVELLISTLIKE'
async function _likeLists(args) {
  switch (args.type) {
    case 'POSTLIKE': {
      let userList = await models.postLike.findOne({
        where: {
          postId: args.id
        },
        attributes: ['likeList']
      });
      const userListArray = JSON.parse(userList.likeList);
      return userListArray;
    }

    case 'TRVELLISTLIKE': {
      let userList = await models.travelListLike.findOne({
        where: {
          travelListId: args.id
        },
        attributes: ['likeList']
      });
      const userListArray = JSON.parse(userList.likeList);
      return userListArray;
    }
  }
}

// user can like/dislike post and travelList
// depends on type: 'POSTLIKE', 'POSTCOMMENTLIKE' or 'TRVELLISTLIKE'
async function _updateLike(args, userId) {
  // get user's infomation
  const user = await models.user.findByPk(userId, {
    attributes: ['id', 'username', 'headshot']
  });
  switch (args.type) {
    case 'POSTLIKE': {
      // check the post has been liked by user or not
      const postLikeExisted = await models.postLike.findOne({
        where: {
          postId: args.id
        },
        attributes: ['likeList']
      });

      // save model tables' operator as variables
      const postLike = models.postLike;
      const post = models.post;
      const postId = {
        postId: args.id
      };

      // update postLike status and return like status
      return await likeActions(
        user,
        postLikeExisted,
        args,
        postLike,
        post,
        postId
      );
    }

    case 'POSTCOMMENTLIKE': {
      // check the postComment has been liked by user or not
      const postCommentLikeExisted = await models.postCommentLike.findOne({
        where: {
          postCommentId: args.id
        },
        attributes: ['likeList']
      });

      // save model tables' operator as variables
      const postCommentLike = models.postCommentLike;
      const postComment = models.postComment;
      const postCommentId = {
        postCommentId: args.id
      };

      // update postCommentLike status and return like status
      return await likeActions(
        user,
        postCommentLikeExisted,
        args,
        postCommentLike,
        postComment,
        postCommentId
      );
    }

    case 'TRVELLISTLIKE': {
      // check the travelList has been liked by user or not
      const travelListLikeExisted = await models.travelListLike.findOne({
        where: {
          travelListId: args.id
        },
        attributes: ['likeList']
      });

      // save model tables' operator as variables
      const travelListLike = models.travelListLike;
      const travelList = models.travelList;
      const travelListId = {
        travelListId: args.id
      };

      // update travelListLike status and return like status
      return await likeActions(
        user,
        travelListLikeExisted,
        args,
        travelListLike,
        travelList,
        travelListId
      );
    }
  }
}

// user can see all of the notifications
async function _notifications(userId) {
  const notification = models.notification.findAll({
    where: {
      userId,
      message: {
        [Op.ne]: null
      }
    },
    order: [
      ['createdAt', 'DESC']
    ]
  });
  return notification;
}

// helper function
async function likeActions(
  user,
  isLikeExisted,
  args,
  model1,
  model2,
  model1Id
) {
  let likeList = {
    id: user.userId,
    username: user.username,
    headshot: user.headshot,
    href: null
  };

  const key = Object.keys(model1Id);
  const value = model1Id[key];

  // if isLikeExisted doesn't exist
  if (!isLikeExisted) {
    const newLikeExisted = {
      likeList: JSON.stringify([likeList]),
      [key]: value
    };
    await model1.create(newLikeExisted);
    await model2.update({
      likes: 1
    }, {
      where: {
        id: args.id
      }
    });
    return {
      id: args.id,
      liked: true
    };
  } else {
    // check the user exist or not
    const originalLikeList = JSON.parse(isLikeExisted.likeList);
    const userExist = originalLikeList.filter(item => {
      return item.id === user.userId;
    });
    switch (userExist.length) {
      // user dosen't exist
      case 0: {
        originalLikeList.push(likeList);
        const likes = Object.keys(originalLikeList).length;
        await model1.update({
          likeList: JSON.stringify(originalLikeList)
        }, {
          where: {
            [key]: value
          }
        });
        await model2.update({
          likes
        }, {
          where: {
            id: args.id
          }
        });
        return {
          id: args.id,
          liked: true
        };
      }
      // user exist
      case 1: {
        // find the userId then delete it
        const likeList = JSON.parse(isLikeExisted.likeList);
        let updatedList = likeList.filter(item => {
          return item.id != user.userId;
        });
        const likes = Object.keys(updatedList).length;
        await model1.update({
          likeList: JSON.stringify(updatedList)
        }, {
          where: {
            [key]: value
          }
        });
        await model2.update({
          likes
        }, {
          where: {
            id: args.id
          }
        });
        return {
          id: args.id,
          liked: false
        };
      }
    }
  }
}