const response = require('../utils/response');
const helpers = require('../utils/helpers');
const clientes = require('../repositories/clientesDB.js');
const usuario = require('../repositories/usuarioDB');

const criarClientes = async (ctx) => {
	let = {
		nome = null,
		email = null,
		cpf = null,
		telefone = null,
	} = ctx.request.body;

	const usuarioID = ctx.state.userId;
	const existenciaUsuario = await usuario.verificarUsuarioPorId(usuarioID);

	if (!existenciaUsuario) {
		return response(ctx, 400, { mensagem: 'Usuário não existente' });
	}

	if (!nome || !email || !cpf || !telefone) {
		return response(ctx, 400, { mensagem: 'Pedido mal-formatado' });
	}

	const existenciaCliente = await clientes.verificarCliente(email, cpf);

	if (existenciaCliente) {
		return response(ctx, 400, { mensagem: 'Cliente já existente' });
	}

	try {
		helpers.validarEmail(email);
		cpf = helpers.validarCPF(cpf);
	} catch (error) {
		return response(ctx, 400, { mensagem: error.mensagem });
	}

	const cliente = {
		usuarioID,
		nome,
		email,
		cpf,
		telefone,
		inadimplente: false,
	};

	const result = await clientes.adicionarClienteAoBD(cliente);
	return response(ctx, 201, {
		mensagem: `Cliente de ID ${result.id} criado com sucesso!`,
	});
};

const editarClientes = async (ctx) => {

	const logadoID = ctx.state.userId

	const idCliente = ctx.request.body.id;

	let = { nome = null, email = null, cpf = null } = ctx.request.body;

	if (!nome || !email || !cpf) {
		return response(ctx, 400, { mensagem: 'Pedido mal-formatado' });
	}

	try {
		helpers.validarEmail(email);
		cpf = helpers.validarCPF(cpf);
	} catch (error) {
		return response(ctx, 400, { mensagem: error.mensagem });
	}

	const clienteAtualizado = {
		idCliente,
		nome,
		email,
		cpf,
	};

	const result = await clientes.atualizarCliente(clienteAtualizado);

	if (result === undefined) {
		return response(ctx, 404, {
			mensagem: `Não existe com cliente com este id cadastrado`,
		});
	}

	if (result.usuarioid != logadoID) {
		return response(ctx, 400, {
			mensagem: `Não existe é possível editar cliente que não é seu!`,
		});
	}

	return response(ctx, 200, {
		id: result.idCliente,
		nome: result.nome,
		email: result.email,
		cpf: result.cpf,
	});
};


module.exports = { criarClientes, editarClientes };
