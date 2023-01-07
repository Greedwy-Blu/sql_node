const { AuthenticationError } = require('apollo-server-express');
const { User, Post } = require('../main/infra/models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const secret = require('../utils/configSecret');

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
			const user = await User.create({ name, email, senha });

			return {
				token: jwt.sign({ userId: user.id }, secret, { expiresIn: '1m' }),
				user,
			};
		},
		async createPost(root, args, context, { content, title }, { user = null }) {
			if (!user) {
				throw new AuthenticationError('You must login to create a post');
			}
			return await Post.create({ content, title, userId: user.id });
		},
		async login(root, { input }, context) {
			const { email, password } = input;

			const user = await User.findOne({ where: { email } });

			if (user && bcrypt.compareSync(password, user.password)) {
				const token = jwt.sign({ id: user.id }, secret);
				return { ...user.toJSON(), token };
			}

			throw new AuthenticationError('Invalid credentials');
		},
	},
};
