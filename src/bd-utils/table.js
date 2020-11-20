const tabelaUsuarioDB = require('../repositories/usuarioDB');
const tabelaClientesDB = require('../repositories/clientesDB');
const tabelaCobrancasDB = require('../repositories/cobrancasDB');

const arg = process.argv.slice(2);

if (arg[0] === 'usuarios') {
	console.log('Criando tabela...');
	tabelaUsuarioDB.criarTabelaUsuarioDB();
	console.log(`Tabela 'Usuários' criada!`);
} else if (arg[0] === 'clientes') {
	console.log('Criando tabela...');
	tabelaClientesDB.criarTabelaClientesDB();
	console.log(`Tabela 'Clientes' criada!`);
} else if (arg[0] === 'cobrancas') {
	console.log('Criando tabela');
	tabelaCobrancasDB.criarTabelaCobrancasDB();
	console.log(`Tabela 'cobranças' criada!`)
} else if (arg[0] === 'all') {
	console.log('Criando todas as tabelas');
	tabelaUsuarioDB.criarTabelaUsuarioDB();
	tabelaClientesDB.criarTabelaClientesDB();
	tabelaCobrancasDB.criarTabelaCobrancasDB();
	console.log('Todas as tabelas criadas')
}
