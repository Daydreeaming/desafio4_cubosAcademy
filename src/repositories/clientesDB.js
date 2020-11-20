const database = require('../utils/database');
const response = require('../utils/response');

const criarTabelaClientesDB = async () => {
	const query = `CREATE TABLE IF NOT EXISTS clientes
	(
		id SERIAL PRIMARY KEY,
		usuarioID INTEGER NOT NULL,
		nome TEXT NOT NULL,
		email TEXT NOT NULL,
		cpf TEXT NOT NULL,
		telefone TEXT NOT NULL,
		cobrancasRecebidas INT DEFAULT 0
	)`;

	return database.query(query);
};

const adicionarClienteAoBD = async (cliente) => {
	const { usuarioID, nome, email, cpf, telefone } = cliente;

	const query = {
		text: `INSERT INTO clientes
		(usuarioID, nome, email, cpf, telefone)
		values
		($1, $2, $3, $4, $5) RETURNING *;`,
		values: [usuarioID, nome, email, cpf, telefone],
	};

	const result = await database.query(query);

	return result.rows.shift();
};

const verificarCliente = async (email = null, cpf = null) => {

	if (!email || !cpf) {
		return null
	}

	const query = `SELECT * FROM clientes WHERE email = $1 or cpf = $2`

	const result = await database.query({
		text: query,
		values: [email, cpf]
	})

	return result.rows.shift();
}

const obterClientePorID = async (id) => {
	
	if (!id) {
		return null
	}

	const query = `SELECT * FROM clientes WHERE id = $1`
	
	const result = await database.query({
		text: query,
		values: [id]

	})
	
	return result.rows.shift();
}

const obterBancoDeDadosClientes = async (ctx) => {
	const query = `SELECT * FROM clientes`;

	const result = await database.query({
		text: query,
	});

	return response(ctx, 200, result.rows);
};

const paginacaoDeClientes = async (pagina) => {

	const query = `SELECT * FROM clientes
	LIMIT 10
	OFFSET($1 - 1) * 10`;

	const result = await database.query({
		text: query,
		values: [pagina]
	});

	return response(ctx, 200, result.rows);
}

const obterCliente = async (busca) => {
	if (!busca) {
		return null;
	}

	const reEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	if (!reEmail.test(String(busca).toLowerCase())) {
		const query = `SELECT * FROM clientes WHERE email = $1`;

		const result = await database.query({
			text: query,
			value: [busca],
		});

		return result.rows.shift();
	}

	const reCpf = /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/;

	if (!reCpf.test(String(busca).toLowerCase())) {
		const query = `SELECT * FROM clientes WHERE cpf = $1`;

		const result = await database.query({
			text: query,
			value: [busca],
		});

		return result.rows.shift();
	}

	const query = `SELECT * FROM clientes WHERE nome = $1`;

	const result = await database.query({
		text: query,
		values: [busca],
	});

	return result.rows.shift();
};

module.exports = { criarTabelaClientesDB, adicionarClienteAoBD, verificarCliente, obterClientePorID, obterBancoDeDadosClientes, obterCliente };
