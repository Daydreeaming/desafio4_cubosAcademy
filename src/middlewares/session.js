const jwt = require('jsonwebtoken');
const response = require('../utils/response.js');

require('dotenv').config();

const verify = async (ctx, next) => {
	// eslint-disable-next-line no-unused-vars

	if (!ctx.headers.authorization) {
		return response(ctx, 403, 'Ação proibida');
	}

	const [bearer, token] = ctx.headers.authorization.split(' ');

	try {
		const verification = await jwt.verify(token, process.env.JWT_SECRET);

		ctx.state.userId = verification.id;
		ctx.state.email = verification.email;
	} catch (err) {
		return response(ctx, 403, 'Ação proibida');
	}
	return next();
};

module.exports = { verify };
