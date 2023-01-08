const { app_secret } = require('../../utils/configSecret');
const jwt = require('jsonwebtoken');

function getTokenPayload(token) {
	return jwt.verify(token, app_secret);
}

function getUserId(req, authToken) {
	if (req) {
		const authHeader = req.headers.authorization;
		if (authHeader) {
			const token = authHeader.replace('Bearer ', '');
			if (!token) {
				throw new Error('No token found');
			}
			const { userId } = getTokenPayload(token);
			return userId;
		}
	} else if (authToken) {
		const { userId } = getTokenPayload(authToken);
		return userId;
	}

	throw new Error('Not authenticated');
}

const getUser = (token) => {
	try {
		if (token) {
			return jwt.verify(token, app_secret);
		}
		return null;
	} catch (error) {
		return null;
	}
};

module.exports = {
	app_secret,
	getUserId,
	getUser,
};
