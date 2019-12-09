import models from '../../models';
const { Sequelize } = require('sequelize');
const Op = Sequelize.Op;

module.exports = {
  // _addFriend,
  // _addedFriend,
  // _cancelFriendAdd
  _friendActions
};

// async function _addFriend(args, actionUserId) {
//   args['status'] = 'PENDING';
//   args['actionUserId'] = actionUserId;

//   await models.relationship.create(args);
//   // todo: notification
//   return 'Invitation sent';
// }

// async function _addedFriend(userId) {
//   const result = await models.relationship.findOne({
//     where: {
//       user_b: userId
//     }
//   });

//   result['status'] = 'CONFIRMED';

//   await models.relationship.update({
//     'status': result.status
//   }, {
//     where: {
//       user_b: result.user_b
//     }
//   });

//   return 'Invitation confirm!';
// }

// async function _cancelFriendAdd(args, userId) {
//   const result = await models.relationship.findOne({
//     where: {
//       user_b: args.user_b,
//       status: 'PENDING',
//       actionUserId: userId
//     }
//   });

//   if (!result) {
//     return 'Invitation doesn\'t exist';
//   }

//   result['status'] = 'CANCELED';

//   await models.relationship.update({
//     'status': result.status
//   }, {
//     where: {
//       user_b: result.user_b
//     }
//   });

//   return 'Invitation canceled!';
// }

async function _friendActions(args, userId) {
  if (args.status === 'PENDING') { // actionUser sends invitation to user_b
    args['actionUserId'] = userId;
    await models.relationship.create(args);
    // todo: notification
    return 'Invitation sent';
  } else if (args.status === 'CONFIRMED') { // user_b accepts invitation from actionUser
    const result = await models.relationship.findOne({
      where: {
        user_b: userId,
        status: 'PENDING',
        actionUserId: args.actionUserId
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
  } else if (args.status === 'CANCELED') { // actionUser cancels the invitation 
    const result = await models.relationship.findOne({
      where: {
        user_b: args.user_b,
        status: 'PENDING',
        actionUserId: userId
      }
    });
  
    if (!result) {
      return 'Invitation doesn\'t exist';
    }

    await models.relationship.update({
      'status': args.status
    }, {
      where: {
        id: result.id
      }
    });
  
    return 'Invitation canceled!';
  } else {
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
      return 'Invitation doesn\'t exist';
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