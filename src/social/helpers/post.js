import models from '../../models';
import uuidv4 from 'uuid/v4';

module.exports = {
  _posts,
  _postAddorUpdate,
  _postDelete
};

// user can see all of the posts
async function _posts(args) {
  switch (args.type) {
    case 'POSTS': {
      const posts = await models.post.findAll({
        where: {
          travelListId: args.id
        },
        order: [
          ['createdAt', 'DESC']
        ]
      });
      return posts;
    }

    case 'POSTCOMMENTS': {
      const postComments = await models.postComment.findAll({
        where: {
          postId: args.id
        },
        order: [
          ['createdAt', 'DESC']
        ]
      });
      return postComments;
    }
  }
}

// user can create or updating the post
async function _postAddorUpdate(args, userId) {
  switch (args.type) {
    case 'POST': {
      // Insert id, userId for new post row
      let data = Object.assign({}, args, {
        id: uuidv4(),
        userId
      });
      const post = await models.post.findOrCreate({
        where: {
          id: args.id
        },
        defaults: data
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

    case 'POSTCOMMENT': {
      // Insert id, userId for new postComment row
      let data = Object.assign({}, args, {
        id: uuidv4(),
        postId: args.id,
        userId
      });
      const postComment = await models.postComment.findOrCreate({
        where: {
          id: args.id
        },
        defaults: data
      });
      if (!postComment[1]) {
        await models.postComment.update(args, {
          where: {
            id: postComment[0].id
          }
        });
        const updatedResult = await models.postComment.findByPk(postComment[0].id);
        return updatedResult;
      } else {
        return postComment[0];
      }
    }
  }
}

// user can delete the post
async function _postDelete(args) {
  switch (args.type) {
    case 'POST': {
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

    case 'POSTCOMMENT': {
      const post = await models.postComment.destroy({
        where: {
          id: args.id
        }
      });

      if (post) {
        return 'PostComment deleted!';
      } else {
        return 'Can\'t find the postComment';
      }
    }
  }
}