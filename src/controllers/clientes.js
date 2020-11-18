const response = require('../utils/response');
const helpers = require('../utils/helpers');
const clientes = require('../repositories/clientesDB.js');

const criarClientes = async (ctx) => {
	const { nome = null, email = null, cpf = null, celular = null } = ctx.request.body

	if (!nome || !email || !cpf || !celular ) {
		return response(ctx, 400, { message: 'Pedido mal-formatado' });
	}

	const existenciaCliente = await clientes.verificarCliente(email, cpf);

	if (existenciaCliente) {
		return response(ctx, 400, { message: 'Cliente já existente'});
	} 

	try {
		helpers.validarEmail(email);
		helpers.validarCPF(cpf)
	} catch (error) {
		return response(ctx, 400, { message: error.message });
	}

	const cliente = {
		nome,
		email,
		cpf,
		celular,
	}

	const result = await clientes.adicionarClienteAoBD(cliente)
	return response(ctx, 201, { message: `Cliente de ID ${result.id} criado com sucesso!`});
}

module.exports = { criarClientes }