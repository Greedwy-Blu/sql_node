const User = require('../models/User');

module.exports = {
	async index(req, res) {
		const users = await User.findAll();
	},
	async store(req, res) {
		const { name, email, senha } = req.body;
		const user = await User.create({ name, email, senha });

		return res.json(user);
	},
};
