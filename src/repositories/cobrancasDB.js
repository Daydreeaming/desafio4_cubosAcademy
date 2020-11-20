const client = require('../utils/database');
const database = require('../utils/database');
const response = require('../utils/response');

const criarTabelaCobrancasDB = async () => {
	const query = `CREATE TABLE IF NOT EXISTS cobrancas
	(
		id SERIAL PRIMARY KEY,
		valor INTEGER NOT NULL,
		vencimento DATE NOT NULL,
		clienteId INTEGER NOT NULL,
		descricao TEXT NOT NULL,
		linkDoBoleto TEXT NOT NULL,
		codigoDeBarras TEXT NOT NULL,
		dataDePagamento DATE
	)`;

	return database.query(query);
};

const adicionarCobrancasAoBD = async (cobrancas) => {
	const { clienteId, valor, vencimento, descricao, linkDoBoleto, codigoDeBarras, dataDePagamento} = cobrancas

	const query = {
		text: `INSERT INTO cobrancas
		(clienteId, valor, vencimento, descricao, linkDoBoleto, codigoDeBarras, dataDePagamento)
		values
		($1, $2, $3, $4, $5, $6, $7) RETURNING *;`,
		values: [clienteId, valor, vencimento, descricao, linkDoBoleto, codigoDeBarras, dataDePagamento],
	};

	const result = await database.query(query);

	return result.rows.shift();
}

const obterBancoDeDadosCobrancas = async (ctx) => {
	const query = `SELECT * FROM cobrancas`;

	const result = await database.query({
		text: query,
	});

	return response(ctx, 200, result.rows);
};

module.exports = { criarTabelaCobrancasDB, adicionarCobrancasAoBD, obterBancoDeDadosCobrancas }
