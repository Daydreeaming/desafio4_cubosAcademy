const client = require('../utils/database');
const database = require('../utils/database');
const response = require('../utils/response');

const criarTabelaCobrancasDB = async () => {
	const query = `CREATE TABLE IF NOT EXISTS cobrancas
	(
		id SERIAL PRIMARY KEY,
		valor INTEGER NOT NULL,
		vencimento DATE NOT NULL,
		clienteID INTEGER NOT NULL,
		descricao TEXT NOT NULL,
		linkDoBoleto TEXT NOT NULL,
		codigoDeBarras TEXT NOT NULL,
		dataDePagamento DATE,
		status TEXT NOT NULL
	)`;
	return database.query(query);
};

const adicionarCobrancasAoBD = async (cobrancas) => {
	const { clienteID, valor, vencimento, descricao, linkDoBoleto, codigoDeBarras, dataDePagamento, status} = cobrancas

	const query = {
		text: `INSERT INTO cobrancas
		(clienteID, valor, vencimento, descricao, linkDoBoleto, codigoDeBarras, dataDePagamento, status)
		values
		($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *;`,
		values: [clienteID, valor, vencimento, descricao, linkDoBoleto, codigoDeBarras, dataDePagamento, status],
	};

	const result = await database.query(query);

	return result.rows.shift();
};

const mostrarCobranca = async (ctx) => {
	const { cobrancasPorPagina = null, offset = null } = ctx.query;

	const id = ctx.state.userId

	const query = {
		text: `
			SELECT clientes.id, cobrancas.clienteID, clientes.nome, cobrancas.id, cobrancas.descricao, cobrancas.valor, cobrancas.vencimento, cobrancas.linkDoBoleto
				FROM clientes
			INNER JOIN cobrancas ON clientes.id = cobrancas.clienteID
			WHERE cobrancas.id = $1
			LIMIT $2
			OFFSET($3 - 1) * 10
		`,
		values: [id, cobrancasPorPagina, offset],
	};

	const result = await database.query(query);

	return {
		dados: result.rows,
		paginaAtual: Math.floor(offset / cobrancasPorPagina) + 1,
		totalDePaginas: Math.ceil(result.rows.length / cobrancasPorPagina)
	}
};

const obterBancoDeDadosCobrancas = async () => {
	
	const query ={
		text: `
			SELECT clientes.id, cobrancas.clienteID, cobrancas.id, cobrancas.descricao, cobrancas.valor, cobrancas.vencimento, cobrancas.linkDoBoleto, cobrancas.status
				FROM clientes
			INNER JOIN cobrancas ON clientes.id = cobrancas.clienteID
		`
	}

	const result = await database.query(query);

	return result.rows
};

const atualizarCobranca = async (id) => {
	
	const query = {
		text: `UPDATE cobrancas
		set status = 'PAGO'
		where id = $1`,
		values: [id]
	}

	await database.query(query)
}

module.exports = { criarTabelaCobrancasDB, adicionarCobrancasAoBD, mostrarCobranca, obterBancoDeDadosCobrancas, atualizarCobranca}
