const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { app_secret } = require('../../utils/configSecret');

module.exports = {
	Query: {
		async getUsers(root, args, context) {
			return await context.sequelize.User.findAll();
		},
		async getUser(root, args, context) {
			return await context.sequelize.User.findByPk(args.id);
		},
	},

	Mutation: {
		async signup(root, args, context) {
			const senha = await bcrypt.hash(args.password, 10);
			const user = await context.sequelize.User.create({ ...args, senha });
			const token = jwt.sign({ userId: user.id }, app_secret);
			return {
				token,
				user,
			};
		},

		async login(root, args, context) {
			const user = await context.sequelize.User.findOne({
				where: { email: args.email },
			});
			if (!user) {
				throw new Error('No such user found');
			}
			const valid = await bcrypt.compare(args.senha, user.senha);
			if (!valid) {
				throw new Error('Invalid password');
			}
			const token = jwt.sign({ userId: user.id }, app_secret);
			return {
				token,
				user,
			};
		},

		async createPost(root, args, context, { content, title }) {
			return await context.sequelize.Post.create({
				content,
				title,
				userId: args.id,
			});
		},
	},
};
