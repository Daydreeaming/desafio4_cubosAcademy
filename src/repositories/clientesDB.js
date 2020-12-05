const database = require('../utils/database');

const criarTabelaClientesDB = async () => {
	const query = `CREATE TABLE IF NOT EXISTS clientes
	(
		id SERIAL PRIMARY KEY,
		usuarioID INTEGER NOT NULL,
		nome TEXT NOT NULL,
		email TEXT NOT NULL,
		cpf TEXT NOT NULL,
		telefone TEXT NOT NULL,
		cobrancasFeitas INT DEFAULT 0,
		cobrancasRecebidas INT DEFAULT 0,
		estaInadimplente boolean
	)`;

	return database.query(query);
};

// Cliente

const adicionarClienteAoBD = async (cliente) => {
	const { usuarioID, nome, email, cpf, telefone, inadimplente } = cliente;

	const query = {
		text: `INSERT INTO clientes
		(usuarioID, nome, email, cpf, telefone, estaInadimplente)
		values
		($1, $2, $3, $4, $5, $6) RETURNING *;`,
		values: [usuarioID, nome, email, cpf, telefone, inadimplente],
	};

	const result = await database.query(query);

	return result.rows.shift();
};

const verificarCliente = async (email = null, cpf = null) => {
	if (!email || !cpf) {
		return null;
	}

	const cpfTratado = cpf.replace('.', '').replace('.', '').replace('-', '');

	const query = `SELECT * FROM clientes WHERE email = $1 or cpf = $2`;

	const result = await database.query({
		text: query,
		values: [email, cpfTratado],
	});

	return result.rows.shift();
};

const atualizarCliente = async (cliente) => {
	const { idCliente, nome, email, cpf } = cliente;

	const query = {
		text: `UPDATE clientes
		set nome = $1,
		email = $2, cpf = $3 where id = $4`,
		values: [nome, email, cpf, idCliente],
	};

	await database.query(query);

	const query2 = {
		text: `SELECT * FROM clientes where id = $1`,
		values: [idCliente],
	};

	const result = await database.query(query2);

	return result.rows.shift();
};

const obterClientePorID = async (id) => {
	if (!id) {
		return null;
	}

	const query = `SELECT * FROM clientes WHERE id = $1`;

	const result = await database.query({
		text: query,
		values: [id],
	});

	return result.rows.shift();
};

const buscarCliente = async (ctx) => {
	const { busca = null, clientesPorPagina = null, offset = 1 } = ctx.query;

	if (!busca) {
		return null;
	}

	if (!clientesPorPagina) {
		return null;
	}

	if (!offset) {
		return null;
	}

	const reEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	if (reEmail.test(String(busca).toLowerCase())) {
		const query = {
			text: `
			SELECT usuarios.id, clientes.usuarioID, clientes.nome, clientes.email, clientes.cobrancasFeitas, clientes.cobrancasRecebidas, clientes.estaInadimplente
				FROM usuarios
			INNER JOIN clientes ON usuarios.id = clientes.usuarioID
				where clientes.email = $1
			LIMIT $2
			OFFSET($3 - 1) * 10
		`,
			values: [busca, clientesPorPagina, offset],
		};

		try {
			const result = await database.query(query);
			return result.rows.shift();
		} catch (e) {
			console.log(e);
		}
	}

	const reCpf = /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/;

	if (reCpf.test(String(busca).toLowerCase())) {
		const query = {
			text: `
			SELECT usuarios.id, clientes.usuarioID, clientes.nome, clientes.email, clientes.cpf, clientes.cobrancasFeitas, clientes.cobrancasRecebidas, clientes.estaInadimplente
				FROM usuarios
			INNER JOIN clientes ON usuarios.id = clientes.usuarioID
				where clientes.cpf = $1
			LIMIT $2
			OFFSET($3 - 1) * 10
		`,
			values: [busca, clientesPorPagina, offset],
		};

		try {
			const result = await database.query(query);
			return result.rows.shift();
		} catch (e) {
			console.log(e);
		}
	}

	const buscaTratada = busca.replace(/[20%]/, ' ');
	if (buscaTratada) {
		const query = {
			text: `
				SELECT usuarios.id, clientes.usuarioID, clientes.nome, clientes.email, clientes.cobrancasFeitas, clientes.cobrancasRecebidas, clientes.estaInadimplente
					FROM usuarios
				INNER JOIN clientes ON usuarios.id = clientes.usuarioID
					where clientes.nome = $1
				LIMIT $2
				OFFSET($3 - 1) * 10
			`,
			values: [buscaTratada, clientesPorPagina, offset],
		};

		try {
			const result = await database.query(query);
			return result.rows;
		} catch (e) {
			console.log(e);
		}
	}
};

// Obter do banco de dados

const obterBancoDeDadosClientes = async () => {
	const query = {
		text: `
			SELECT usuarios.id, clientes.usuarioID, clientes.nome, clientes.email, clientes.cobrancasFeitas, clientes.cobrancasRecebidas, clientes.estaInadimplente
				FROM usuarios
			INNER JOIN clientes ON usuarios.id = clientes.usuarioID
		`,
	};

	const result = await database.query(query);

	return result.rows;
};

const mostrarClientes = async (ctx) => {
	const { clientesPorPagina = null, offset = null } = ctx.query;

	const query = {
		text: `
			SELECT usuarios.id, clientes.usuarioID, clientes.nome, clientes.email, clientes.cobrancasFeitas, clientes.cobrancasRecebidas, clientes.estaInadimplente
				FROM usuarios
			INNER JOIN clientes ON usuarios.id = clientes.usuarioID
			LIMIT $1
			OFFSET ($2 - 1) * 10
		`,
		values: [clientesPorPagina, offset],
	};

	// OFFSET $2 é o valor mandado pelo front

	const result = await database.query(query);

	return {
		dados: result.rows,
		paginaAtual: Math.floor(offset / clientesPorPagina) + 1,
		totalDePaginas: Math.ceil(result.rows.length / clientesPorPagina),
	};
};

const atualizarCobrancasFeitasDoCliente = async (id) => {
	const query = {
		text: `UPDATE clientes
		set cobrancasFeitas = cobrancasFeitas + 1
		where id = $1`,
		values: [id],
	};

	await database.query(query);
};

const atualizarCobrancasRecebidasDoCliente = async (id) => {
	const query = {
		text: `UPDATE clientes
		set cobrancasRecebidas = cobrancasRecebidas + 1
		where id = $1`,
		values: [id],
	};

	await database.query(query);
};

module.exports = {
	criarTabelaClientesDB,
	adicionarClienteAoBD,
	verificarCliente,
	atualizarCliente,
	obterClientePorID,
	buscarCliente,
	obterBancoDeDadosClientes,
	mostrarClientes,
	atualizarCobrancasFeitasDoCliente,
	atualizarCobrancasRecebidasDoCliente,
};
