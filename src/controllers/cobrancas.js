const response = require('../utils/response');
const helpers = require('../utils/helpers');
const Clientes = require('../repositories/clientesDB');
const cobrancas = require('../repositories/cobrancasDB');
const pagarme = require('../utils/pagarme');

const criarCobrancas = async (ctx) => {

	const { idDoCliente = null, descricao = null, valor = null, vencimento = null } = ctx.request.body

	if (!idDoCliente || !descricao || !valor || !vencimento) {
		return response(ctx, 400, { message: 'Pedido mal-formatado' })
	}
	
	const existenciaCliente = await Clientes.obterClientePorID(idDoCliente);

	if(!existenciaCliente) {
		return response(ctx, 404, { message: 'Cliente não existe' });
	}

	try {
		helpers.validarData(vencimento);
	} catch (error) {
		return response(ctx, 400, { message: error.message });
	}

	const boleto = await pagarme.geracaoBoleto(existenciaCliente.nome, existenciaCliente.cpf, valor)	

	const cobranca = {
		valor,
		vencimento: boleto.boleto_expiration_date,
		clienteId: idDoCliente,
		descricao,
		linkDoBoleto: boleto.boleto_url,
		codigoDeBarras: boleto.boleto_barcode,
	} 

	console.log(cobranca)

	const result = await cobrancas.adicionarCobrancasAoBD(cobranca)

	return response(ctx, 201, result);
}

module.exports = { criarCobrancas }