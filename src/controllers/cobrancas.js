const response = require('../utils/response');
const helpers = require('../utils/helpers');
const Clientes = require('../repositories/clientesDB');
const cobrancas = require('../repositories/cobrancasDB');
const pagarme = require('../utils/pagarme');
const enviarEmail = require('../utils/email');
const clientes = require('./clientes');

const criarCobrancas = async (ctx) => {
	const {
		idDoCliente = null,
		descricao = null,
		valor = null,
		vencimento = null,
	} = ctx.request.body;

	const usuarioEmail = ctx.state.email;
	const logadoID = ctx.state.userId;

	if (!idDoCliente || !descricao || !valor || !vencimento) {
		return response(ctx, 400, { message: 'Pedido mal-formatado' });
	}

	const existenciaCliente = await Clientes.obterClientePorID(idDoCliente);

	if (!existenciaCliente) {
		return response(ctx, 404, { message: 'Cliente não existe' });
	}

	if (existenciaCliente.usuarioid != logadoID) {
		return response(ctx, 400, {
			message: `Não existe é possível criar cobrança de um cliente que não é seu!`,
		});
	}

	try {
		helpers.validarData(vencimento);
	} catch (error) {
		return response(ctx, 400, { message: error.message });
	}

	const boleto = await pagarme.geracaoBoleto(
		existenciaCliente.nome,
		existenciaCliente.cpf,
		valor
	);

	const cobranca = {
		valor,
		vencimento: boleto.boleto_expiration_date,
		clienteID: idDoCliente,
		descricao,
		linkDoBoleto: boleto.boleto_url,
		codigoDeBarras: boleto.boleto_barcode,
		status: 'AGUARDANDO',
	};

	const result = await cobrancas.adicionarCobrancasAoBD(cobranca);
	await Clientes.atualizarCobrancasFeitasDoCliente(existenciaCliente.id);
	await enviarEmail.enviarEmail(
		usuarioEmail,
		existenciaCliente.email,
		descricao,
		boleto.boleto_url
	);

	return response(ctx, 201, {
		cobranca: {
			idDoCliente: idDoCliente,
			descricao: result.descricao,
			valor: result.valor,
			vencimento: result.vencimento,
			linkDoBoleto: `${result.linkdoboleto}`,
			status: result.status,
		},
	});
};

const listarCobrancaDoCliente = async (ctx) => {

	const result = await cobrancas.mostrarCobranca(ctx);
	return response(ctx, 201, result);
};

const pagarCobranca = async (ctx) => {

	const idCobranca = ctx.request.body.id

	await Clientes.atualizarCobrancasRecebidasDoCliente(idCobranca)
	await cobrancas.atualizarCobranca(idCobranca)

	return response(ctx, 200, {  mensagem: "Cobrança paga com sucesso"} )

}

module.exports = { criarCobrancas, listarCobrancaDoCliente, pagarCobranca };
