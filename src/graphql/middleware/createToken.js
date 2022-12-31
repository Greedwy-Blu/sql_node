import jwt from 'jsonwebtoken';
const secret = require('../../main/config/configSecret');

module.exports = (user) => {
	const payload = {
		id: user._id,
		emial: user.emial,
		fullname: user.fullname,
	};
	let token = jwt.sign(payload, secret);
	console.log(token);
	return token;
};
