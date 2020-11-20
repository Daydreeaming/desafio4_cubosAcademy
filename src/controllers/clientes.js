const response = require('../utils/response');
const helpers = require('../utils/helpers');
const Clientes = require('../repositories/clientesDB.js');
const usuario = require('../repositories/usuarioDB');

const criarClientes = async (ctx) => {
	let = {
		nome = null,
		email = null,
		cpf = null,
		telefone = null,
	} = ctx.request.body;

	const usuarioID = ctx.state.userId;
	const existenciaUsuario = await usuario.verificarUsuarioPorId(usuarioID)

	if(!existenciaUsuario) {
		return response(ctx, 400, { message: 'Usuário não existente' }) 
	}

	if (!nome || !email || !cpf || !telefone) {
		return response(ctx, 400, { message: 'Pedido mal-formatado' });
	}

	const existenciaCliente = await Clientes.verificarCliente(email, cpf);

	if (existenciaCliente) {
		return response(ctx, 400, { message: 'Cliente já existente' });
	}

	try {
		helpers.validarEmail(email);
		cpf = helpers.validarCPF(cpf);
	} catch (error) {
		return response(ctx, 400, { message: error.message });
	}

	const cliente = {
		usuarioID,
		nome,
		email,
		cpf,
		telefone,
	};

	const result = await Clientes.adicionarClienteAoBD(cliente);
	return response(ctx, 201, {
		message: `Cliente de ID ${result.id} criado com sucesso!`,
	});
};

const buscarClientes = async (ctx) => {
	const { nome = null, email = null } = ctx.request.query;

	if (!nome || !email) {
		return response(ctx, 400, { message: 'Pedido mal-formatado' });
	}

	const bancoDeDados = await Clientes.obterBancoDeDadosClientes();

	return response(ctx, 400, bancoDeDados);
};

module.exports = { criarClientes };
