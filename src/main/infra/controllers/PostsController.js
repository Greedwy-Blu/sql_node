const Posts = require('../models/Posts');
const User = require('../models/User');

module.exports = {
	async store(req, res) {
		const { user_id } = req.params;
		const { content, title } = req.body;
		const user = await User.findByPk(user_id);

		if (!user) {
			return res.status(400).json({ error: 'User not found' });
		}

		const Posts = await Posts.create({ content, title, user_id });

		return res.json(Posts);
	},
};
