const response = require('../utils/response');
const helpers = require('../utils/helpers');
const usuarios = require('../repositories/usuarioDB')

const criarUsuario = async (ctx) => {
	const { nome = null, email = null, senha = null } = ctx.request.body;

	if (!nome || !email || !senha) {
		return response(ctx, 400, { message: 'Pedido mal-formatado' });
	}

	const existenciaUsuario = await usuarios.obterUsuarioPorEmail(email);
		
	if (existenciaUsuario) {
		return response(ctx, 400, { message: 'Usuário já existente'});
	} 

	try {
		helpers.validarEmail(email);
	} catch (error) {
		return response(ctx, 400, { message: error.message });
	}

	const usuario = {
		nome,
		email,
		senha,
	};

	const result = await usuarios.adicionarUsuarioAoBD(usuario)

	return response(ctx, 201, result);
};

module.exports = { criarUsuario };
