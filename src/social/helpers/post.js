import models from '../../models';
import uuidv4 from 'uuid/v4';

module.exports = {
  _getPosts,
  _addorUpdatePost,
  _deletePost
};

// todo
// getPosts

async function _getPosts(args) {
  const result = await models.post.findAll({
    where: {
      travelListId: args.travelListId
    },
    order: [
      ['createdAt', 'DESC']
    ]
  });
  return result;
}

async function _addorUpdatePost(args, userId) {
  const id = uuidv4();
  // Insert id for new post row
  args['id'] = id;
  args['userId'] = userId;
  const result = await models.post.findOrCreate({
    where: {
      id
    },
    defaults: args
  });

  if (!result[1]) {
    await models.post.update(args, {
      where: {
        id: result[0].id
      }
    });
    const updatedResult = await models.post.findByPk(result[0].id);
    return updatedResult;
  } else {
    return result[0];
  }
}

async function _deletePost(args) {
  const result = await models.post.destroy({
    where: {
      id: args.id
    }
  });

  if (result) {
    return 'Post deleted!';
  } else {
    return 'Can\'t find the post';
  }
}