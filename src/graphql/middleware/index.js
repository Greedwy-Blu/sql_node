const { AuthenticationError } = require('apollo-server-express');
const User = require('../../main/infra/models');
const { app_secret } = require('../../utils/configSecret');
const jwt = require('jsonwebtoken');

const verifyToken = async (token) => {
	try {
		if (!token) return null;
		const { id } = await jwt.verify(token, app_secret);
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
