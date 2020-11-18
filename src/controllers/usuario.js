const response = require('../utils/response');
const helpers = require('../utils/helpers');
const usuarios = require('../repositories/usuarioDB');

const criarUsuario = async (ctx) => {
	const { nome = null, email = null } = ctx.request.body;
	const hash = ctx.state.hash

	if (!nome || !email || !hash) {
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
		hash,
	};

	const result = await usuarios.adicionarUsuarioAoBD(usuario);
	return response(ctx, 201, { message: `Usuário de ID ${result.id} criado com sucesso!`});
}

module.exports = { criarUsuario };
