const Password = require('../utils/password.js');
const response = require('../utils/response.js');

const encrypt = async (ctx, next) => {
	const { senha = null } = ctx.request.body;

	if (!senha) {
		return response(ctx, 400, { mensagem: 'Pedido mal formatado' });
	}
	
	const hash = await Password.encrypt(senha);

	ctx.state.hash = hash;

	return next();
};

module.exports = { encrypt };
