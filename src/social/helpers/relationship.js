import models from '../../models';
const { Sequelize } = require('sequelize');
const Op = Sequelize.Op;

module.exports = {
  _friendActions,
  _friendPendingList,
  _likeLists,
  _updateLike
};

async function _friendActions(args, userId) {
  switch(args.status) {
    // actionUser sends invitation to user_b
    case 'PENDING': {
      args['actionUserId'] = userId;
      await models.relationship.create(args);
      // todo: notification
      return 'Invitation sent';
    }
    // user_b accepts invitation from actionUser
    case 'CONFIRMED': {
      const result = await models.relationship.findOne({
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
          id: result.id
        }
      });
      return 'Invitation confirm!';
    }
    // actionUser cancels the invitation 
    case 'CANCELED': {
      const result = await models.relationship.findOne({
        where: {
          user_b: args.user_b,
          status: 'PENDING',
          actionUserId: userId
        }
      });
      if (!result) {
        return {
          status: 404,
          message: 'Invitation doesn\'t exist'
        };
      }
      await models.relationship.update({
        'status': args.status
      }, {
        where: {
          id: result.id
        }
      });
      return 'Invitation canceled!';
    }
    // actionUser unfriend user_b
    case 'UNFRIEND': {
      const result = await models.relationship.findOne({ 
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
      if (!result) {
        return {
          status: 404,
          message: 'Invitation doesn\'t exist'
        };
      }
      await models.relationship.update({
        'status': args.status
      }, {
        where: {
          id: result.id
        }
      });
      return 'Unfriended';
    }  
  }
}

async function _friendPendingList(userId) {
  const result = await models.user.findAll({
    include: [{
      model: models.relationship,
      where: {
        status: 'PENDING',
        user_b: userId
      }
    }],
    attributes: ['id', 'username', 'headshot']
  });
  return result;
}

async function _likeLists(args) {
  switch(args.type) {
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
  }
}

// user can like/dislike post and travelList
// depends on type: 'POSTLIKE' or 'TRVELLISTLIKE'
async function _updateLike(args, userId) {
  switch(args.type) {
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
        switch(userExist.length) {
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
        // const originalLikeList = travelListLikeExisted.likeList;
        const userExist = originalLikeList.filter(item => { 
          return item.id === userId;
        });
        switch(userExist.length) {
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
            // const likeList = travelListLikeExisted.likeList;
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
    }
  }
}