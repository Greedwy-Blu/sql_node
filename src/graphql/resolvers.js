module.exports = {
	Query: {
		async getUsers(root, args, { models }) {
			return await models.User.findAll();
		},
		async getUser(root, args, ctx, { userId }, { models }) {
			return await models.User.findByPk(userId);
		},
	},
	Mutation: {
		async createUser(root, { nombre, apellido, active }, { models }) {
			return await models.User.create({ nombre, apellido, active });
		},
	},
};
