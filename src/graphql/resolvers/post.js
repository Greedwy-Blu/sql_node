const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { app_secret } = require('../../utils/configSecret');

module.exports = {
	Query: {
		async getPost(root, args, context) {
			return await context.sequelize.Post.findByPk(args.id);
		},
		async getPosts(root, args, context) {
			return await context.sequelize.Post.findByPk();
		},
	},

	Mutation: {
		async createPost(root, args, context, { content, title }) {
			return await context.sequelize.Post.create({
				content,
				title,
				userId: args.id,
			});
		},
	},
};
