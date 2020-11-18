const database = require('../utils/database');
const response = require('../utils/response');

const criarTabelaClientesDB = async () => {
	const query = `CREATE TABLE IF NOT EXISTS clientes
	(
		id serial,
		nome varchar(255),
		email varchar(255),
		cpf varchar(255),
		celular varchar(255)
	)`;

	return database.query(query);
};

const adicionarClienteAoBD = async (cliente) => {
	const { nome, email, cpf, celular } = cliente;

	const query = {
		text: `INSERT INTO clientes
		(nome, email, cpf, celular)
		values
		($1, $2, $3, $4) RETURNING *;`,
		values: [nome, email, cpf, celular],
	};

	const result = await database.query(query);

	return result.rows.shift();
};

const verificarCliente = async (email, cpf) => {

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

const obterBancoDeDadosClientes = async (ctx) => {
	const query = `SELECT * FROM clientes`;

	const result = await database.query({
		text: query,
	});

	return response(ctx, 200, result.rows);
};

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

module.exports = { criarTabelaClientesDB, adicionarClienteAoBD, verificarCliente, obterBancoDeDadosClientes, obterCliente };
