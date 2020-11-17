const usuario = require('../controllers/usuario');
const database = require('../utils/database');

const criarTabelaUsuarioDB = async () => {
	const query = `CREATE TABLE IF NOT EXISTS usuarios
	(
		id serial,
		nome varchar(255),
		email varchar(255),
		senha varchar(255)
	)`;

	return database.query(query);
};

const adicionarUsuarioAoBD = async (usuario) => {
	const { nome, email, senha } = usuario;

	const query = {
		text: `INSERT INTO usuarios
		(nome, email, senha)
		values
		($1, $2, $3) RETURNING *;`,
		values: [nome, email, senha]
	}

	const result = await database.query(query);

	return result.rows.shift();
};

const obterUsuarioPorEmail = async (email) => {

	if (!email) {
		return null
	}

	const query = `SELECT * FROM usuarios WHERE email = $1`;

	const result = await database.query({
		text: query,
		values: [email],
	});

	return result.rows.shift();
}

const apagarTabela = async (tableName) => {
	if (tableName) {
		await database.query(`DROP TABLE ${tableName}`);
	}
};

module.exports = { criarTabelaUsuarioDB, adicionarUsuarioAoBD, obterUsuarioPorEmail, apagarTabela }
