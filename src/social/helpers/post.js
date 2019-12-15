import models from '../../models';
import uuidv4 from 'uuid/v4';

module.exports = {
  _getPosts,
  _addorUpdatePost,
  _deletePost
};

async function _getPosts(args) {
  const posts = await models.post.findAll({
    where: {
      travelListId: args.travelListId
    },
    order: [
      ['createdAt', 'DESC']
    ]
  });
  return posts;
}

async function _addorUpdatePost(args, userId) {
  const id = uuidv4();
  // Insert id for new post row
  args['id'] = id;
  args['userId'] = userId;
  const post = await models.post.findOrCreate({
    where: {
      id
    },
    defaults: args
  });

  if (!post[1]) {
    await models.post.update(args, {
      where: {
        id: post[0].id
      }
    });
    const updatedResult = await models.post.findByPk(post[0].id);
    return updatedResult;
  } else {
    return post[0];
  }
}

async function _deletePost(args) {
  const post = await models.post.destroy({
    where: {
      id: args.id
    }
  });

  if (post) {
    return 'Post deleted!';
  } else {
    return 'Can\'t find the post';
  }
}