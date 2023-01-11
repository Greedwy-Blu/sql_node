const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { app_secret } = require('../../utils/configSecret');
const { Posts } = require('../../main/infra/models');
const { AuthenticationError } = require('apollo-server-express');

module.exports = {
	Query: {
		async getPost(root, args, { user = null }) {
			return await Posts.findByPk({ user_id: user.id });
		},
		async getPosts(root, args, context) {
			return await Posts.findAll();
		},
	},

	Mutation: {
		async createPost(root, args, context, { user = null }) {
			if (!user) {
				throw new AuthenticationError('You must login to create a post');
			}
			return await Posts.create({
				content: args.content,
				title: args.title,
				user_id: user.id,
			});
		},
	},
};
