const tabelaUsuarioDB = require('../repositories/usuarioDB');
const tabelaClientesDB = require('../repositories/clientesDB');

const arg = process.argv.slice(2);

if (arg[0] === 'usuarios') {
	console.log('Criando tabela...');
	tabelaUsuarioDB.criarTabelaUsuarioDB();
	console.log(`Tabela 'Usuários' criada!`);
} else if (arg[0] === 'clientes') {
	console.log('Criando tabela...');
	tabelaClientesDB.criarTabelaClientesDB();
	console.log(`Tabela 'Clientes' criada!`);
}
