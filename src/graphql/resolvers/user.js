const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { app_secret } = require('../../utils/configSecret');
const { User, db } = require('../../main/infra/models/');
const { AuthenticationError } = require('apollo-server-express');

module.exports = {
	Query: {
		getUsers: async (root, args, context) => {
			const getusers = User.findAll();
			return getusers;
		},
		async getUser(root, args, { user = null }) {
			if (!user) {
				throw new AuthenticationError('You must login to create a post');
			}
			return await User.findByPk({ id: user.id });
		},
	},

	Mutation: {
		async signup(root, args, context) {
			const bcryptPassword = await bcrypt.hash(args.senha, 10);
			const user = await User.create({
				name: args.name,
				email: args.email,
				senha: bcryptPassword,
			});
			console.log(user);
			const token = jwt.sign({ user_id: user.id }, app_secret);
			return {
				token,
				user,
			};
		},

		async login(root, args, context) {
			const user = await User.findOne({
				where: { email: args.email },
			});
			if (!user) {
				throw new Error('No such user found');
			}
			const valid = await bcrypt.compare(args.senha, user.senha);
			if (!valid) {
				throw new Error('Invalid password');
			}
			const token = jwt.sign({ user_id: user.id }, app_secret);
			return {
				token,
				user,
			};
		},
	},
};
