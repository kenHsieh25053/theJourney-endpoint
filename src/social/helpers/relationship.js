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
  _updateLike
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
        'status': args.status
      }, {
        where: {
          id: relationship.id
        }
      });
      // update user/user_b's friend table
      const userUpdateList = [userId, args.user_b];
      userUpdateList.forEach( async (id) => {
        const friendExist = await models.friend.findOne({
          where: {
            userId: id
          }
        });
        // if user/user_b's firend row doesn't exist
        if (!friendExist) {
          switch(id) {
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
          switch(id) {
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
        'status': args.status
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
        'status': args.status
      }, {
        where: {
          id: relationship.id
        }
      });
      // update user/user_b's row in friend table 
      const userUpdateList = [userId, args.user_b];
      userUpdateList.forEach(async (id) => {
        switch(id) {
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
  switch (args.type) {
    case 'POSTLIKE': {
      // get user's infomation
      const user = await models.user.findByPk(userId, {
        attributes: ['username', 'headshot']
      });

      let likeList = {
        id: userId,
        username: user.username,
        headshot: user.headshot,
        href: null
      };

      // check the post has been liked by user or not
      const postLikeExisted = await models.postLike.findOne({
        where: {
          postId: args.id
        },
        attributes: ['likeList']
      });

      // if postLike doesn't exist
      if (!postLikeExisted) {
        const newPostLike = {
          likeList: JSON.stringify([likeList]),
          postId: args.id
        };
        await models.postLike.create(newPostLike);
        await models.post.update({
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
        const originalLikeList = JSON.parse(postLikeExisted.likeList);
        const userExist = originalLikeList.filter(item => {
          return item.id === userId;
        });
        switch (userExist.length) {
          // user dosen't exist
          case 0: {
            originalLikeList.push(likeList);
            const likes = Object.keys(originalLikeList).length;
            await models.postLike.update({
              likeList: JSON.stringify(originalLikeList)
            }, {
              where: {
                postId: args.id
              }
            });
            await models.post.update({
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
            const likeList = JSON.parse(postLikeExisted.likeList);
            let updatedList = likeList.filter(item => {
              return item.id != userId;
            });
            const likes = Object.keys(updatedList).length;
            await models.postLike.update({
              likeList: JSON.stringify(updatedList)
            }, {
              where: {
                postId: args.id
              }
            });
            await models.post.update({
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
      break;
    }

    case 'TRVELLISTLIKE': {
      // get user's infomation
      const user = await models.user.findByPk(userId, {
        attributes: ['username', 'headshot']
      });

      let likeList = {
        id: userId,
        username: user.username,
        headshot: user.headshot,
        href: null
      };

      // check the travelList has been liked by user or not
      const travelListLikeExisted = await models.travelListLike.findOne({
        where: {
          travelListId: args.id
        },
        attributes: ['likeList']
      });

      // if travelListLike doesn't exist
      if (!travelListLikeExisted) {
        const newTravelListLike = {
          likeList: JSON.stringify([likeList]),
          travelListId: args.id
        };
        await models.travelListLike.create(newTravelListLike);
        await models.travelList.update({
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
        const originalLikeList = JSON.parse(travelListLikeExisted.likeList);
        const userExist = originalLikeList.filter(item => {
          return item.id === userId;
        });
        switch (userExist.length) {
          // user dosen't exist
          case 0: {
            originalLikeList.push(likeList);
            const likes = Object.keys(originalLikeList).length;
            await models.travelListLike.update({
              likeList: JSON.stringify(originalLikeList)
            }, {
              where: {
                travelListId: args.id
              }
            });
            await models.travelList.update({
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
            const likeList = JSON.parse(travelListLikeExisted.likeList);
            let updatedList = likeList.filter(item => {
              return item.id != userId;
            });
            const likes = Object.keys(updatedList).length;
            await models.travelListLike.update({
              likeList: JSON.stringify(updatedList)
            }, {
              where: {
                travelListId: args.id
              }
            });
            await models.travelList.update({
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
      break;
    }

    case 'POSTCOMMENTLIKE': {
      // get user's infomation
      const user = await models.user.findByPk(userId, {
        attributes: ['username', 'headshot']
      });

      let likeList = {
        id: userId,
        username: user.username,
        headshot: user.headshot,
        href: null
      };

      // check the postComment has been liked by user or not
      const postCommentLikeExisted = await models.postCommentLike.findOne({
        where: {
          postCommentId: args.id
        },
        attributes: ['likeList']
      });

      // if postCommentLike doesn't exist
      if (!postCommentLikeExisted) {
        const newPostCommentLikeExisted = {
          likeList: JSON.stringify([likeList]),
          postCommentId: args.id
        };
        await models.postCommentLike.create(newPostCommentLikeExisted);
        await models.postComment.update({
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
        const originalLikeList = JSON.parse(postCommentLikeExisted.likeList);
        const userExist = originalLikeList.filter(item => {
          return item.id === userId;
        });
        switch (userExist.length) {
          // user dosen't exist
          case 0: {
            originalLikeList.push(likeList);
            const likes = Object.keys(originalLikeList).length;
            await models.postCommentLike.update({
              likeList: JSON.stringify(originalLikeList)
            }, {
              where: {
                postCommentId: args.id
              }
            });
            await models.postComment.update({
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
            const likeList = JSON.parse(postCommentLikeExisted.likeList);
            let updatedList = likeList.filter(item => {
              return item.id != userId;
            });
            const likes = Object.keys(updatedList).length;
            await models.postCommentLike.update({
              likeList: JSON.stringify(updatedList)
            }, {
              where: {
                postCommentId: args.id
              }
            });
            await models.postComment.update({
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
      break;
    }
  }
}