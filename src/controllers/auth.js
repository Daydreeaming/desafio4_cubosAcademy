const jwt = require('jsonwebtoken');
const response = require('../utils/response.js');
const auth = require('../repositories/usuarioDB');
const Password = require('../utils/password.js');

require('dotenv').config();

const autenticar = async (ctx) => {
	const { email = null, senha = null } = ctx.request.body;

	if (!email || !senha) {
		return response(ctx, 400, { mensagem: 'Pedido mal formatado' });
	}

	const user = await auth.obterUsuarioPorEmail(email);

	if (user) {
		const comparison = await Password.check(senha, user.hash);
		if (comparison) {
			const token = jwt.sign(
				{ id: user.id, email: user.email },
				process.env.JWT_SECRET || 'Desafio4',
				{
					expiresIn: '1d',
				}
			);
			return response(ctx, 200, { mensagem: 'Usuário logado com sucesso!', token });
		}
	}
	return response(ctx, 403, { mensagem: 'Email ou senha incorretos' });
};

module.exports = { autenticar };
