const { AuthenticationError } = require('apollo-server-express');
const { User, Post } = require('../main/infra/models');

module.exports = {
	Query: {
		async getUsers(root, args, context) {
			return await User.findAll();
		},
		async getUser(root, args, context, { userId }) {
			return await User.findByPk(userId);
		},
		async getPost(_, context, { PostId }) {
			return await Post.findByPk(PostId);
		},
		async getPosts(root, args, context) {
			return await Post.findByPk();
		},
	},
	Mutation: {
		async createUser(root, args, context, { name, email, senha }) {
			return await User.create({ name, email, senha });
		},
		async createPost(root, args, context, { content, title }, { user = null }) {
			if (!user) {
				throw new AuthenticationError('You must login to create a post');
			}
			return await Post.create({ content, title, userId: user.id });
		},
	},
};
