const response = require('../utils/response');
const helpers = require('../utils/helpers');
const usuarios = require('../repositories/usuarioDB');
const clientes = require('../repositories/clientesDB');
const cobrancas = require('../repositories/cobrancasDB');

const criarUsuario = async (ctx) => {
	const { nome = null, email = null } = ctx.request.body;
	const hash = ctx.state.hash;

	if (!nome || !email || !hash) {
		return response(ctx, 400, { mensagem: 'Pedido mal-formatado' });
	}

	const existenciaUsuario = await usuarios.obterUsuarioPorEmail(email);

	if (existenciaUsuario) {
		return response(ctx, 400, { mensagem: 'Usuário já existente' });
	}

	try {
		helpers.validarEmail(email);
	} catch (error) {
		return response(ctx, 400, { mensagem: error.message });
	}

	const usuario = {
		nome,
		email,
		hash,
	};

	const result = await usuarios.adicionarUsuarioAoBD(usuario);
	return response(ctx, 201, {
		mensagem: `Usuário de ID ${result.id} criado com sucesso!`,
	});
};

const listarClientesDoUsuario = async (ctx) => {
	const logadoID = ctx.state.userId;

	const result = await clientes.mostrarClientes(ctx);

	const filteredResult = result.dados.filter((item) => {
		return item.usuarioid === logadoID;
	});

	const respPages = { 
		clientes: filteredResult,
		paginasTotal: result.totalDePaginas,
		paginaAtual: result.paginaAtual,
	}
	

	return response(ctx, 201, respPages);
};

const buscarUmClienteDoUsuario = async (ctx) => {
	const logadoID = ctx.state.userId;
	const listaCliente = [];

	const result = await clientes.buscarCliente(ctx);

	if (result === undefined) {
		return response(ctx, 404, {
			mensagem: `Você não tem este cliente cadastrado`,
		});
	}

	for (const cliente of result) {
		if (cliente.usuarioid === logadoID) {
			listaCliente.push(cliente)
		}
	}
	
	if (listaCliente.length > 0) {
		return response(ctx, 201, listaCliente);
	}

	return response(ctx, 200, {
		mensagem: `Não existe este cliente na sua lista`,
	});
};

const relatorioDoUsuario = async (ctx) => {
	const logadoID = ctx.state.userId;

	const resultClientes = await clientes.obterBancoDeDadosClientes();
	const resultCobrancas = await cobrancas.obterBancoDeDadosCobrancas();

	const filteredResultClientes = resultClientes.filter((item) => {
		return item.usuarioid === logadoID;
	});

	let qtdClientesAdimplentes = 0;
	let qtdClientesInadimplentes = 0;
	let qtdCobrancasPrevistas = 0;
	let qtdCobrancasPagas = 0;
	let qtdCobrancasVencidas = 0;
	let saldoEmConta = 0;

	for (const cliente of filteredResultClientes) {
		if (cliente.estainadimplente === false) {
			qtdClientesAdimplentes++;
		}

		if (cliente.estainadimplente === true) {
			qtdClientesInadimplentes++;
		}

		resultCobrancas.filter((item) => {
			if (item.clienteid === cliente.id) {
				if (item.status === 'AGUARDANDO') {
					qtdCobrancasPrevistas++;
				}

				if (item.status === 'PAGO') {
					qtdCobrancasPagas++;
					saldoEmConta+=item.valor
				}

				const dateNow = new Date();
				const dateNowTimeStamp = +dateNow;
				const validadeTimeStamp = +item.vencimento;

				if (dateNowTimeStamp > validadeTimeStamp) {
					qtdCobrancasVencidas++;
				}
			}
		});
	}


	const relatorio = {
		qtdClientesAdimplentes,
		qtdClientesInadimplentes,
		qtdCobrancasPrevistas,
		qtdCobrancasPagas,
		qtdCobrancasVencidas,
		saldoEmConta,
	};
	return response(ctx, 201, relatorio);
};

module.exports = {
	criarUsuario,
	listarClientesDoUsuario,
	buscarUmClienteDoUsuario,
	relatorioDoUsuario,
};
