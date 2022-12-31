const { User } = require('../main/infra/models');

module.exports = {
	Query: {
		async getUsers(root, args) {
			return await User.findAll();
		},
		async getUser(root, args, ctx, { userId }, { models }) {
			return await User.findByPk(userId);
		},
	},
	Mutation: {
		async createUser(root, { name, email, senha }, { models }) {
			return await User.create({ name, email, senha });
		},
	},
};
