const secret = require('../../main/config/configSecret');
const User = require('../../main/infra/models/User').User;
const jwt = require('jsonwebtoken');
const { AuthenticationError } = require('apollo-server-express');

const verifyToken = async (token) => {
	try {
		if (!token) return null;
		const { id } = await jwt.verify(token, secret);
		const user = await User.findByPk(id);
		return user;
	} catch (error) {
		throw new AuthenticationError(error.message);
	}
};

module.exports = async ({ req }) => {
	const token = (req.headers && req.headers.authorization) || '';
	const user = await verifyToken(token);
	return { user };
};